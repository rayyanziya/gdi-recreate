"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function load() {
    const res = await fetch("/api/admin/articles");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setArticles(data.articles || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleToggle(article: Article) {
    await fetch(`/api/admin/articles/${article.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !article.published }),
    });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    load();
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const btn: React.CSSProperties = {
    padding: "4px 10px", fontSize: 13, border: "1px solid #ddd",
    background: "white", cursor: "pointer", marginLeft: 6,
  };

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Articles</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#666" }}>GDI Insights admin</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => router.push("/admin/articles/new")}
            style={{ padding: "8px 16px", background: "#111", color: "white", border: "none", fontSize: 14, cursor: "pointer" }}
          >
            + New Article
          </button>
          <button
            onClick={handleLogout}
            style={{ padding: "8px 14px", background: "white", border: "1px solid #ddd", fontSize: 14, cursor: "pointer" }}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#666" }}>Loading...</p>
      ) : articles.length === 0 ? (
        <p style={{ color: "#666" }}>No articles yet. Create your first one.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", background: "#fafafa" }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 600 }}>Title</th>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 600 }}>Category</th>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 600 }}>Author</th>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "10px 12px" }} />
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 12px", maxWidth: 300 }}>
                  <span style={{ fontWeight: 500 }}>{a.title}</span>
                  <br />
                  <span style={{ fontSize: 12, color: "#888" }}>{a.slug}</span>
                </td>
                <td style={{ padding: "10px 12px", color: "#555" }}>{a.category}</td>
                <td style={{ padding: "10px 12px", color: "#555" }}>{a.author}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{
                    padding: "2px 8px", fontSize: 12,
                    background: a.published ? "#d1fae5" : "#f3f4f6",
                    color: a.published ? "#065f46" : "#6b7280",
                  }}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td style={{ padding: "10px 12px", textAlign: "right", whiteSpace: "nowrap" }}>
                  <button onClick={() => handleToggle(a)} style={btn}>
                    {a.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => router.push(`/admin/articles/${a.id}/edit`)} style={btn}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(a.id)} style={{ ...btn, color: "#dc2626" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
