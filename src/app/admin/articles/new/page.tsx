"use client";

import { useRouter } from "next/navigation";
import { ArticleForm, ArticleFormData } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  const router = useRouter();

  async function handleSubmit(data: ArticleFormData) {
    const tags = data.tags
      ? JSON.stringify(data.tags.split(",").map((t) => t.trim()).filter(Boolean))
      : "[]";
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, tags }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to create article");
    router.push("/admin/articles");
  }

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <p style={{ marginBottom: 20 }}>
        <a href="/admin/articles" style={{ fontSize: 14, color: "#0066cc" }}>← Back to articles</a>
      </p>
      <h1 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700 }}>New Article</h1>
      <ArticleForm onSubmit={handleSubmit} submitLabel="Create Article" />
    </div>
  );
}
