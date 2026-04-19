import type { ChatMessage } from "@/types/chat";

function formatTranscript(messages: ChatMessage[]): string {
  return messages
    .map((m) => {
      const label = m.role === "user" ? "VISITOR" : "GDI ASSISTANT";
      const color = m.role === "user" ? "#0099bb" : "#64748b";
      return `<tr>
        <td style="padding:8px 12px;vertical-align:top;white-space:nowrap;color:${color};font-weight:700;font-size:11px;font-family:monospace;width:120px;">${label}</td>
        <td style="padding:8px 12px;font-size:13px;color:#0f172a;line-height:1.6;border-left:1px solid #e2e8f0;">${m.content.replace(/\n/g, "<br/>")}</td>
      </tr>`;
    })
    .join("");
}

const header = (title: string) => `
  <tr>
    <td style="background:#0d1f35;padding:28px 32px;">
      <p style="margin:0;color:#0099bb;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">PT GLOBAL DATAVERSE INDONESIA</p>
      <h1 style="margin:8px 0 0;color:#f0f4f8;font-size:22px;font-weight:800;">${title}</h1>
    </td>
  </tr>`;

const footer = () => `
  <tr>
    <td style="padding:16px 32px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">Sent automatically by GDI Website Chat · ${new Date().toUTCString()}</p>
    </td>
  </tr>`;

const transcriptSection = (messages: ChatMessage[]) => `
  <tr>
    <td style="padding:0 32px 32px;">
      <p style="margin:0 0 10px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#0099bb;font-weight:700;">FULL CONVERSATION TRANSCRIPT</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;background:#f8fafc;">
        ${formatTranscript(messages)}
      </table>
    </td>
  </tr>`;

export function bookingEmailHtml(params: {
  name: string;
  email: string;
  company?: string;
  description: string;
  messages: ChatMessage[];
}): string {
  const rows = [
    ["Name", params.name],
    ["Email", `<a href="mailto:${params.email}" style="color:#0099bb;">${params.email}</a>`],
    ...(params.company ? [["Company / Role", params.company]] : []),
    ["Topic", params.description],
  ]
    .map(
      ([label, value]) => `
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:10px 16px;font-size:12px;color:#64748b;font-weight:600;width:120px;white-space:nowrap;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#0f172a;">${value}</td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;">
        ${header("New Meeting Request")}
        <tr>
          <td style="padding:28px 32px;">
            <div style="background:#f0fdf4;border:1px solid #86efac;padding:14px 16px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#166534;font-weight:600;">A visitor has requested a call with the GDI team.</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;">
              <tr><td style="padding:10px 16px;background:#f8fafc;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#0099bb;font-weight:700;">CONTACT DETAILS</td></tr>
              ${rows}
            </table>
          </td>
        </tr>
        ${transcriptSection(params.messages)}
        ${footer()}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function escalationEmailHtml(params: {
  userEmail: string;
  userName?: string;
  topic?: string;
  messages: ChatMessage[];
}): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;">
        ${header("Human Escalation Request")}
        <tr>
          <td style="padding:28px 32px;">
            <div style="background:#fffbeb;border:1px solid #fcd34d;padding:14px 16px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#92400e;font-weight:600;">A visitor needs to speak with a GDI team member — the AI assistant could not fully resolve their concern.</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;">
              <tr><td style="padding:10px 16px;background:#f8fafc;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#0099bb;font-weight:700;">VISITOR INFO</td></tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;color:#64748b;font-weight:600;width:120px;">Email</td>
                <td style="padding:12px 16px;font-size:15px;font-weight:700;"><a href="mailto:${params.userEmail}" style="color:#0099bb;">${params.userEmail}</a></td>
              </tr>
              ${params.userName ? `<tr style="border-top:1px solid #e2e8f0;"><td style="padding:12px 16px;font-size:12px;color:#64748b;font-weight:600;">Name</td><td style="padding:12px 16px;font-size:14px;color:#0f172a;">${params.userName}</td></tr>` : ""}
              ${params.topic ? `<tr style="border-top:1px solid #e2e8f0;"><td style="padding:12px 16px;font-size:12px;color:#64748b;font-weight:600;">Topic</td><td style="padding:12px 16px;font-size:14px;color:#0f172a;">${params.topic}</td></tr>` : ""}
            </table>
          </td>
        </tr>
        ${transcriptSection(params.messages)}
        ${footer()}
      </table>
    </td></tr>
  </table>
</body></html>`;
}
