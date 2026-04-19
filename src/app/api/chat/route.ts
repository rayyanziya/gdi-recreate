import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import type { ChatRequestBody } from "@/types/chat";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            max_tokens: 1024,
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages,
            ],
          });

          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
