import type { Metadata } from "next";

export const metadata: Metadata = { title: "GDI Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f5f5f5", color: "#111" }}>
        {children}
      </body>
    </html>
  );
}
