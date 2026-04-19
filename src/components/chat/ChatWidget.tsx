"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "@/types/chat";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm GDI Assistant. I can answer questions about GDI's services, share examples of our past projects, or help you book a call with the team.\n\nAre you an organization looking to modernize operations, or a founder looking for a long-term technical partner?",
};

const BOOKING_PHRASES = [
  "i've noted all of this for the gdi team",
  "i've noted this for the gdi team",
  "noted all of this for the gdi team",
];
const ESCALATION_PHRASES = [
  "a gdi team member will be in touch",
  "gdi team member will be in touch",
  "a gdi team member will reach out",
  "team member will reach out to you",
  "team member will contact you",
  "will be in touch at",
  "will reach out to you at that address",
];

function extractEmail(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

function matchesPhrases(text: string, phrases: string[]): boolean {
  const lower = text.toLowerCase();
  return phrases.some((p) => lower.includes(p));
}

type ChatMode = "ai" | "human";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("ai");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [collectedEmail, setCollectedEmail] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const crispListenerRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // Scan conversation for an email address
  useEffect(() => {
    if (collectedEmail) return;
    for (const msg of messages) {
      const email = extractEmail(msg.content);
      if (email) { setCollectedEmail(email); break; }
    }
  }, [messages, collectedEmail]);

  // Switch to live human mode via Crisp
  const switchToHuman = useCallback((allMessages: ChatMessage[]) => {
    setMode("human");

    if (crispListenerRef.current || typeof window === "undefined" || !window.$crisp) return;
    crispListenerRef.current = true;

    // Send full transcript to agent so they have context
    const transcript = allMessages
      .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`)
      .join("\n\n");

    window.$crisp.push([
      "do",
      "message:send",
      ["text", `[AI Chat Transcript — visitor is requesting human support]\n\n${transcript}`],
    ]);

    // Listen for agent replies and show them in our widget
    window.$crisp.push([
      "on",
      "message:received",
      (msg: { type: string; content: string }) => {
        if (msg.type === "text" && msg.content) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: msg.content },
          ]);
        }
      },
    ]);
  }, []);

  const sendBookingEmail = useCallback(
    async (finalMsg: string, allMessages: ChatMessage[]) => {
      if (emailSent || !matchesPhrases(finalMsg, BOOKING_PHRASES)) return;
      setEmailSent(true);
      const email = collectedEmail ?? extractEmail(finalMsg) ?? "";
      try {
        await fetch("/api/escalate?type=booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages, name: "", email, description: "" }),
        });
      } catch { /* silently fail */ }
    },
    [collectedEmail, emailSent]
  );

  const sendEscalationEmail = useCallback(
    async (finalMsg: string, allMessages: ChatMessage[]) => {
      if (emailSent || !matchesPhrases(finalMsg, ESCALATION_PHRASES)) return;
      setEmailSent(true);
      const email = collectedEmail ?? extractEmail(finalMsg) ?? "";
      if (!email) return;
      try {
        await fetch("/api/escalate?type=escalate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages, userEmail: email }),
        });
      } catch { /* silently fail */ }
    },
    [collectedEmail, emailSent]
  );

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setInput("");

    // ── Human mode: route to Crisp, no AI stream ─────────────────────────
    if (mode === "human") {
      setMessages(nextMessages);
      if (typeof window !== "undefined" && window.$crisp) {
        window.$crisp.push(["do", "message:send", ["text", trimmed]]);
      }
      return;
    }

    // ── AI mode: stream from GPT-4.1 ─────────────────────────────────────
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value, { stream: true }).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              full += parsed.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full };
                return updated;
              });
            }
          } catch { /* malformed chunk */ }
        }
      }

      const finalMessages: ChatMessage[] = [
        ...nextMessages,
        { role: "assistant", content: full },
      ];

      await sendBookingEmail(full, finalMessages);

      if (matchesPhrases(full, ESCALATION_PHRASES)) {
        await sendEscalationEmail(full, finalMessages);
        switchToHuman(finalMessages);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I ran into a connection issue. Please try again, or reach out directly at contact@dataverseindonesia.com.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, mode, sendBookingEmail, sendEscalationEmail, switchToHuman]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const lastMsg = messages[messages.length - 1];
  const showTypingDots = isLoading && lastMsg?.role === "assistant" && lastMsg.content === "";
  const showStreamCursor = isLoading && lastMsg?.role === "assistant" && lastMsg.content !== "";
  const isHuman = mode === "human";

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-32px)] sm:w-[400px] flex flex-col"
            style={{ maxHeight: "calc(100dvh - 120px)", height: "560px" }}
          >
            <div className="flex flex-col h-full bg-navy border border-navy-border shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-navy-border bg-navy-surface shrink-0">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${isHuman ? "bg-emerald-400" : "bg-accent"}`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isHuman ? "bg-emerald-400" : "bg-accent"}`} />
                  </span>
                  <div>
                    <p className="text-navy-text text-sm font-semibold leading-none">
                      {isHuman ? "GDI Team" : "GDI Assistant"}
                    </p>
                    <p className="text-navy-muted text-xs mt-0.5">
                      {isHuman ? "Live support" : "PT Global Dataverse Indonesia"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="text-navy-muted hover:text-navy-text transition-colors p-1 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.293 3.293a1 1 0 011.414 0L8 6.586l3.293-3.293a1 1 0 111.414 1.414L9.414 8l3.293 3.293a1 1 0 01-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 8 3.293 4.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>

              {/* Human mode banner */}
              {isHuman && (
                <div className="shrink-0 px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-900/40 text-xs text-emerald-400 text-center">
                  You&apos;re now connected to the GDI team
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-accent text-white"
                          : "bg-navy-surface text-navy-text border border-navy-border"
                      }`}
                    >
                      {msg.content}
                      {showStreamCursor && i === messages.length - 1 && (
                        <span className="inline-block w-0.5 h-3.5 bg-accent ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                ))}

                {showTypingDots && (
                  <div className="flex justify-start">
                    <div className="bg-navy-surface border border-navy-border px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full bg-navy-muted animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="shrink-0 border-t border-navy-border bg-navy-surface px-3 py-3">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isHuman ? "Message GDI team..." : "Ask about GDI..."}
                    disabled={isLoading}
                    className="flex-1 bg-navy border border-navy-border text-navy-text text-sm placeholder:text-navy-muted/50 px-3 py-2.5 outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                    className="shrink-0 bg-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-white px-4 py-2.5 transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M15.707 8l-7-7a1 1 0 00-1.414 1.414L12.586 7H1a1 1 0 000 2h11.586l-5.293 5.293a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414z" />
                    </svg>
                  </button>
                </div>
                <p className="text-center text-navy-muted text-[10px] mt-2 tracking-wide">
                  GDI · contact@dataverseindonesia.com
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open GDI Assistant"}
        className="fixed bottom-5 right-4 sm:right-6 z-[60] w-14 h-14 bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-2 10H6v-2h12v2zm0-4H6V6h12v2z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
