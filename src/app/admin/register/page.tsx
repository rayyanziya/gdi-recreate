"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inp: React.CSSProperties = {
  width: "100%", padding: "8px 10px", border: "1px solid #ccc",
  fontSize: 14, boxSizing: "border-box", fontFamily: "inherit",
};

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, username, password }),
    });
    const data = await res.json();
    if (data.ok) {
      router.push("/admin/articles");
    } else {
      setError(data.error || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: 320, padding: 28, background: "white", border: "1px solid #ddd" }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Create Account</h1>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "#666" }}>GDI Admin access</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Full Name</label>
            <input style={inp} value={fullName} onChange={(e) => setFullName(e.target.value)} required autoFocus />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Username</label>
            <input style={inp} value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Password</label>
            <input type="password" style={inp} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Minimum 6 characters</p>
          </div>
          {error && <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "9px", background: "#111", color: "white", border: "none", fontSize: 14, cursor: "pointer" }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: 13, textAlign: "center", color: "#666" }}>
          Already have an account?{" "}
          <a href="/admin/login" style={{ color: "#0066cc" }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}
