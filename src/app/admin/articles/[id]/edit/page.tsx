"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArticleForm, ArticleFormData } from "@/components/admin/ArticleForm";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Partial<ArticleFormData> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/articles/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.article) {
          const a = data.article;
          try {
            const arr = JSON.parse(a.tags || "[]");
            a.tags = Array.isArray(arr) ? arr.join(", ") : a.tags;
          } catch {}
          setInitial(a);
        }
      });
  }, [id]);

  async function handleSubmit(data: ArticleFormData) {
    const tags = data.tags
      ? JSON.stringify(data.tags.split(",").map((t) => t.trim()).filter(Boolean))
      : "[]";
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, tags }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update article");
    router.push("/admin/articles");
  }

  if (!initial) return <div style={{ padding: 32, color: "#666" }}>Loading...</div>;

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <p style={{ marginBottom: 20 }}>
        <a href="/admin/articles" style={{ fontSize: 14, color: "#0066cc" }}>← Back to articles</a>
      </p>
      <h1 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700 }}>Edit Article</h1>
      <ArticleForm initial={initial} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}
