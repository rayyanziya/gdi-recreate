# GDI Website — AI Chatbot Integration

This is an upgraded version of the previous PT Global Dataverse Indonesia website at [dataverse.co.id](https://www.dataverse.co.id/). The previous site had no real-time visitor interaction layer — this version adds a full conversational AI system directly embedded in the website UI.

---

## What's New: AI Chatbot

The chatbot serves as GDI's always-on front desk. It handles lead qualification, answers questions about GDI's services and past projects, collects booking requests, and escalates to a live human operator when needed — all within the same widget, without the visitor ever leaving the page.

### Core Features

**Streaming AI responses**
Powered by GPT-4.1 via the OpenAI API. Responses stream word-by-word in real time using Server-Sent Events (SSE), giving the conversation a natural, low-latency feel.

**Lead qualification & booking flow**
The assistant qualifies visitors naturally through conversation (organization vs. founder, use case, current situation), then guides them toward booking a call. Once name, email, and topic are collected, it confirms the request and sends an automated email to the GDI team with the full conversation transcript.

**"Talk to a person" button**
Visitors can bypass the AI at any point using the button in the chat footer. Clicking it shows an inline form asking for their email and topic. On submit, the GDI team receives an escalation email with the full transcript, and the widget switches to a live Crisp chat session — in the same UI, with no visible handoff to the visitor.

**Seamless AI → human handoff via Crisp**
When escalation is triggered (either via the button or detected from the AI's response), the widget switches to live operator mode. The Crisp default widget stays hidden — the visitor continues in the same chat panel. The GDI team member's replies appear directly in the widget in real time.

**Automated email notifications (Resend)**
Two types of emails are sent to the GDI team:
- **Booking email** — triggered when the AI confirms a call request; includes contact details and full transcript
- **Escalation email** — triggered when a visitor requests a human; includes their email, stated topic, and full transcript

**Off-topic guardrails**
The assistant is scoped strictly to GDI-related topics. Questions outside that scope (general knowledge, coding help, unrelated queries) are politely declined and redirected, preventing token abuse.

**GDI knowledge base**
The system prompt contains a full knowledge base covering: company overview, services for organizations (ERP, AI integration, custom software, digital infrastructure, consulting, ongoing support), services for founders (dedicated technical team, long-term partnership), and all past projects:
- Solana Bare Metal RPC Node
- IT Gorilla (AI telehealth platform, 100K users)
- Rispro IEMS (energy management + post-quantum cryptography)
- Vezpal (AI stock trading assistant)
- NeoTheorem (proprietary multi-account trading platform)
- Self-Order System (QR-based cafe & restaurant ordering)

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| AI | OpenAI GPT-4.1 via `openai` SDK |
| Streaming | Server-Sent Events (SSE), `ReadableStream` |
| Email | Resend |
| Live chat | Crisp (headless, custom UI) |
| Animation | Framer Motion |
| Language | TypeScript |

### Key Files

```
src/
├── app/api/chat/route.ts          # GPT-4.1 streaming endpoint
├── app/api/escalate/route.ts      # Booking + escalation email endpoint
├── components/chat/ChatWidget.tsx # Chat UI (floating widget)
├── lib/systemPrompt.ts            # GDI knowledge base + behavioral rules
├── lib/emailTemplates.ts          # HTML email templates (booking + escalation)
├── providers/CrispProvider.tsx    # Crisp SDK loader (headless)
└── types/chat.ts                  # Shared TypeScript interfaces
```

### Environment Variables

```env
OPENAI_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```
