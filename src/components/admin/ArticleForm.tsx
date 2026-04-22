"use client";

import { useState } from "react";

export interface ArticleFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  author: string;
  author_role: string;
  cover_image: string;
  published: boolean;
}

interface ArticleFormProps {
  initial?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  submitLabel: string;
}

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const inp: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  border: "1px solid #ccc",
  fontSize: 14,
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const lbl: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  marginBottom: 4,
};

const field: React.CSSProperties = { marginBottom: 14 };

export function ArticleForm({ initial, onSubmit, submitLabel }: ArticleFormProps) {
  const [form, setForm] = useState<ArticleFormData>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    category: initial?.category ?? "",
    tags: initial?.tags ?? "",
    author: initial?.author ?? "",
    author_role: initial?.author_role ?? "",
    cover_image: initial?.cover_image ?? "",
    published: initial?.published ?? false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key: keyof ArticleFormData, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleTitle(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: !f.slug || f.slug === toSlug(f.title) ? toSlug(title) : f.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 820 }}>
      <div style={field}>
        <label style={lbl}>Title *</label>
        <input style={inp} value={form.title} onChange={(e) => handleTitle(e.target.value)} required />
      </div>

      <div style={field}>
        <label style={lbl}>Slug *</label>
        <input style={inp} value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
      </div>

      <div style={field}>
        <label style={lbl}>Excerpt *</label>
        <textarea
          style={{ ...inp, height: 72, resize: "vertical" }}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          required
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={lbl}>Category *</label>
          <input style={inp} value={form.category} onChange={(e) => set("category", e.target.value)} required />
        </div>
        <div>
          <label style={lbl}>Tags (comma separated)</label>
          <input style={inp} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="AI, Research, Business" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={lbl}>Author *</label>
          <input style={inp} value={form.author} onChange={(e) => set("author", e.target.value)} required />
        </div>
        <div>
          <label style={lbl}>Author Role</label>
          <input style={inp} value={form.author_role} onChange={(e) => set("author_role", e.target.value)} placeholder="e.g. CEO" />
        </div>
      </div>

      <div style={field}>
        <label style={lbl}>Cover Image URL (optional)</label>
        <input style={inp} value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://..." />
      </div>

      <div style={field}>
        <label style={lbl}>Content (Markdown) *</label>
        <textarea
          style={{ ...inp, height: 420, resize: "vertical", fontFamily: "monospace", fontSize: 13 }}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          Publish immediately
        </label>
      </div>

      {error && <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{ padding: "9px 22px", background: "#111", color: "white", border: "none", fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
