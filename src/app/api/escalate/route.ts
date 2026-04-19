import { Resend } from "resend";
import { bookingEmailHtml, escalationEmailHtml } from "@/lib/emailTemplates";
import type { BookingRequestBody, EscalateRequestBody } from "@/types/chat";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "rayyanziya@dataverseindonesia.com";
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@dataverseindonesia.com";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    if (type === "booking") {
      const body: BookingRequestBody = await req.json();

      const { data, error } = await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `[GDI Chat] Meeting Request from ${body.name}`,
        html: bookingEmailHtml(body),
      });

      if (error) return new Response(JSON.stringify({ error }), { status: 500 });
      return new Response(JSON.stringify({ success: true, id: data?.id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (type === "escalate") {
      const body: EscalateRequestBody = await req.json();

      const { data, error } = await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `[GDI Chat] Human Escalation — ${body.userEmail}`,
        html: escalationEmailHtml(body),
      });

      if (error) return new Response(JSON.stringify({ error }), { status: 500 });
      return new Response(JSON.stringify({ success: true, id: data?.id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Invalid type parameter", { status: 400 });
  } catch {
    return new Response("Internal server error", { status: 500 });
  }
}
