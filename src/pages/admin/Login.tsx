/**
 * /admin — Login page + admin settings
 * Clean, minimal. No branding clash with the public site.
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCMS } from "@/contexts/CMSContext";
import { ADMIN_PASS } from "@/cms/content";

export default function AdminLogin() {
  const { isAdmin, login, logout, save, reset, exportJSON, importJSON, isDirty, content } = useCMS();
  const navigate  = useNavigate();
  const [pass, setPass]       = useState("");
  const [error, setError]     = useState("");
  const [newPass, setNewPass] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [importMsg, setImportMsg] = useState("");

  // If already admin, show dashboard; otherwise show login form
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(pass);
    if (ok) { setPass(""); setError(""); }
    else { setError("Incorrect password. Try again."); }
  };

  const handleChangePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) { setPassMsg("Password must be at least 6 characters."); return; }
    // Store in localStorage (simple local-only password change)
    localStorage.setItem("alhamra_admin_pass", newPass);
    setPassMsg("Password updated. Note: resets on next deployment.");
    setNewPass("");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      importJSON(ev.target?.result as string);
      setImportMsg("Content imported. Click Save to apply.");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const S: Record<string, React.CSSProperties> = {
    page:    { minHeight: "100vh", background: "#F7F6F3", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", padding: "2rem" },
    card:    { background: "#fff", border: "1px solid #E5E2DC", padding: "clamp(2rem,5vw,3.5rem)", width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 20 },
    label:   { fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#999", display: "block", marginBottom: 6 },
    input:   { width: "100%", padding: "12px 14px", border: "1px solid #E5E2DC", background: "#fff", fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300, color: "#1A1A1A", outline: "none", borderRadius: 0 },
    btn:     { padding: "12px 24px", background: "#1A1A1A", color: "#fff", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase" as const },
    btnGhost:{ padding: "11px 24px", background: "transparent", color: "#1A1A1A", border: "1px solid #E5E2DC", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase" as const },
    error:   { fontSize: "12px", color: "#EF4444", marginTop: -12 },
    success: { fontSize: "12px", color: "#22C55E", marginTop: -12 },
    h1:      { fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#1A1A1A", margin: 0 },
    section: { borderTop: "1px solid #E5E2DC", paddingTop: 20, display: "flex", flexDirection: "column" as const, gap: 12 },
    secTitle:{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#555" },
    row:     { display: "flex", gap: 10, flexWrap: "wrap" as const },
  };

  if (!isAdmin) {
    return (
      <div style={S.page}>
        <form style={S.card} onSubmit={handleLogin}>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Al Hamra CMS</p>
            <h1 style={S.h1}>Admin Login</h1>
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input
              type="password"
              autoFocus
              style={S.input}
              value={pass}
              onChange={e => { setPass(e.target.value); setError(""); }}
              placeholder="Enter admin password"
            />
          </div>
          {error && <p style={S.error}>{error}</p>}
          <button type="submit" style={S.btn}>Sign In →</button>
          <p style={{ fontSize: "11px", color: "#aaa" }}>
            Default password: <code style={{ background: "#f4f4f4", padding: "2px 6px", borderRadius: 3 }}>alhamra2025</code>
          </p>
        </form>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div style={S.page}>
      <div style={{ ...S.card, maxWidth: 560 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>Al Hamra CMS</p>
            <h1 style={S.h1}>Admin Settings</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: "10px", color: "#666", letterSpacing: "0.1em" }}>Logged in</span>
          </div>
        </div>

        {/* Quick actions */}
        <div style={S.section}>
          <p style={S.secTitle}>Content Editor</p>
          <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>
            Close this page and use the floating toolbar on any page to enter edit mode. 
            Click any text on the page to edit it directly.
          </p>
          <div style={S.row}>
            <button style={S.btn} onClick={() => navigate("/")}>← Go to Homepage</button>
            {isDirty && (
              <button style={{ ...S.btn, background: "#22C55E" }} onClick={() => { save(); }}>
                💾 Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Content: export / import / reset */}
        <div style={S.section}>
          <p style={S.secTitle}>Content Backup</p>
          <div style={S.row}>
            <button style={S.btnGhost} onClick={exportJSON}>↓ Export JSON</button>
            <label style={{ ...S.btnGhost, cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
              ↑ Import JSON
              <input type="file" accept=".json" style={{ display: "none" }} onChange={handleImportFile} />
            </label>
          </div>
          {importMsg && <p style={S.success}>{importMsg}</p>}
          <button
            style={{ ...S.btnGhost, color: "#EF4444", borderColor: "#FCA5A5", alignSelf: "flex-start" }}
            onClick={reset}
          >
            ↺ Reset to Defaults
          </button>
        </div>

        {/* Content stats */}
        <div style={S.section}>
          <p style={S.secTitle}>Content Overview</p>
          <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>
            <strong style={{ color: "#555" }}>{Object.keys(content).length}</strong> editable content fields across the site.
            {isDirty && <span style={{ color: "#F59E0B" }}> · Unsaved changes exist.</span>}
          </p>
        </div>

        {/* Change password */}
        <form style={S.section} onSubmit={handleChangePass}>
          <p style={S.secTitle}>Change Password</p>
          <div>
            <label style={S.label}>New Password</label>
            <input
              type="password"
              style={S.input}
              value={newPass}
              onChange={e => { setNewPass(e.target.value); setPassMsg(""); }}
              placeholder="Minimum 6 characters"
            />
          </div>
          {passMsg && <p style={passMsg.includes("updated") ? S.success : S.error}>{passMsg}</p>}
          <button type="submit" style={{ ...S.btnGhost, alignSelf: "flex-start" }}>Update Password</button>
        </form>

        {/* Sign out */}
        <div style={{ ...S.section, borderTop: "1px solid #E5E2DC", paddingTop: 16 }}>
          <button style={{ ...S.btnGhost, alignSelf: "flex-start" }} onClick={() => { logout(); navigate("/"); }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
