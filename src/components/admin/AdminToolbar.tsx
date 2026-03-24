/**
 * AdminToolbar — floating panel with two tabs:
 *   Content tab: edit mode toggle, save, export/import, reset
 *   Style tab:   font family, font size, color pickers for all tokens
 *
 * Draggable anywhere on screen.
 * Only visible when isAdmin === true.
 */
import { useState, useRef, useCallback, type ChangeEvent } from "react";
import { useCMS, DEFAULT_DESIGN, type DesignTokens } from "@/contexts/CMSContext";
import { Link } from "react-router-dom";

// ── Shared style helpers ──────────────────────────────────────
const S = {
  btn: (bg: string, color: string, disabled = false): React.CSSProperties => ({
    fontFamily: "system-ui, sans-serif",
    fontSize: "10px", fontWeight: 500,
    letterSpacing: "0.06em", textTransform: "uppercase" as const,
    padding: "7px 12px", border: "none", cursor: disabled ? "default" : "pointer",
    borderRadius: 4, whiteSpace: "nowrap" as const,
    background: bg, color,
    opacity: disabled ? 0.4 : 1,
    transition: "opacity 0.15s",
    width: "100%",
    textAlign: "center" as const,
  }),
  label: (): React.CSSProperties => ({
    fontFamily: "system-ui, sans-serif",
    fontSize: "9px", letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.40)", marginBottom: 4, display: "block",
  }),
  row: (): React.CSSProperties => ({
    display: "flex", gap: 6,
  }),
  divider: (): React.CSSProperties => ({
    height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0",
  }),
};

const DISPLAY_FONTS = [
  "Cormorant Garamond",
  "Playfair Display",
  "EB Garamond",
  "Libre Baskerville",
  "Lora",
  "Merriweather",
  "Georgia",
];

const SANS_FONTS = [
  "DM Sans",
  "Inter",
  "Nunito Sans",
  "Jost",
  "Outfit",
  "Plus Jakarta Sans",
  "Work Sans",
  "Raleway",
  "system-ui",
];

const COLOR_TOKENS: { key: keyof DesignTokens; label: string }[] = [
  { key: "colorInk",      label: "Headline / Body"   },
  { key: "colorInkMid",   label: "Secondary Text"    },
  { key: "colorInkLight", label: "Muted / Labels"    },
  { key: "colorSurface",  label: "Section Background"},
  { key: "colorBorder",   label: "Borders / Dividers"},
  { key: "colorAccent",   label: "Accent / Buttons"  },
];

// ── Google Fonts loader ──────────────────────────────────────
function loadGoogleFont(family: string) {
  if (["Georgia","system-ui"].includes(family)) return;
  const encoded = encodeURIComponent(family);
  const id = `gf-${encoded}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id   = id;
  link.rel  = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap`;
  document.head.appendChild(link);
}

// ── Content Tab ──────────────────────────────────────────────
function ContentTab() {
  const { isEditing, isDirty, toggleEdit, save, reset, exportJSON, importJSON } = useCMS();
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => importJSON(ev.target?.result as string);
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={onFile} />

      {!isEditing ? (
        <button style={S.btn("#3B82F6","#fff")}
          onClick={e => { e.stopPropagation(); toggleEdit(); }}>
          ✏️ &nbsp;Enter Edit Mode
        </button>
      ) : (
        <>
          <button style={S.btn("#22C55E","#fff", !isDirty)}
            disabled={!isDirty}
            onClick={e => { e.stopPropagation(); save(); }}>
            💾 &nbsp;{isDirty ? "Save Changes" : "Saved"}
          </button>
          <button style={S.btn("rgba(255,255,255,0.08)","rgba(255,255,255,0.75)")}
            onClick={e => { e.stopPropagation(); toggleEdit(); }}>
            👁 &nbsp;Exit Edit Mode
          </button>
        </>
      )}

      <div style={S.divider()} />

      <div style={S.row()}>
        <button style={{ ...S.btn("rgba(255,255,255,0.07)","rgba(255,255,255,0.6)"), flex: 1 }}
          onClick={e => { e.stopPropagation(); exportJSON(); }}>
          ↓ Export
        </button>
        <button style={{ ...S.btn("rgba(255,255,255,0.07)","rgba(255,255,255,0.6)"), flex: 1 }}
          onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}>
          ↑ Import
        </button>
      </div>

      <button style={S.btn("rgba(239,68,68,0.12)","#EF4444")}
        onClick={e => { e.stopPropagation(); reset(); }}>
        ↺ &nbsp;Reset Text to Defaults
      </button>
    </div>
  );
}

// ── Style Tab ────────────────────────────────────────────────
function StyleTab() {
  const { design, updateDesign, saveDesign, resetDesign, isDesignDirty } = useCMS();

  const sel: React.CSSProperties = {
    width: "100%", padding: "5px 8px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 4,
    fontFamily: "system-ui", fontSize: "11px",
    color: "rgba(255,255,255,0.80)",
    outline: "none", cursor: "pointer",
  };

  const numInput: React.CSSProperties = {
    ...sel, width: 72,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Headline font */}
      <div>
        <label style={S.label()}>Headline Font</label>
        <select style={sel} value={design.fontDisplay}
          onChange={e => { loadGoogleFont(e.target.value); updateDesign("fontDisplay", e.target.value); }}>
          {DISPLAY_FONTS.map(f => <option key={f} value={f} style={{ background: "#1A1A1A" }}>{f}</option>)}
        </select>
      </div>

      {/* Body font */}
      <div>
        <label style={S.label()}>Body Font</label>
        <select style={sel} value={design.fontSans}
          onChange={e => { loadGoogleFont(e.target.value); updateDesign("fontSans", e.target.value); }}>
          {SANS_FONTS.map(f => <option key={f} value={f} style={{ background: "#1A1A1A" }}>{f}</option>)}
        </select>
      </div>

      {/* Base font size */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={S.label()}>Base Font Size</label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input type="range" min="13" max="20" value={design.fontSizeBase}
              style={{ flex: 1, accentColor: "#3B82F6", cursor: "pointer" }}
              onChange={e => updateDesign("fontSizeBase", e.target.value)}
            />
            <span style={{ fontFamily: "system-ui", fontSize: "10px", color: "rgba(255,255,255,0.5)", minWidth: 30 }}>
              {design.fontSizeBase}px
            </span>
          </div>
        </div>
      </div>

      <div style={S.divider()} />

      {/* Color tokens */}
      <label style={{ ...S.label(), marginBottom: 2 }}>Colours</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {COLOR_TOKENS.map(({ key, label }) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Color swatch + picker */}
            <label style={{ position: "relative", flexShrink: 0, cursor: "pointer" }}>
              <div style={{
                width: 26, height: 26, borderRadius: 4,
                background: design[key],
                border: "2px solid rgba(255,255,255,0.15)",
                transition: "border-color 0.15s",
              }} />
              <input type="color" value={design[key]}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
                onChange={e => updateDesign(key, e.target.value)}
              />
            </label>
            {/* Hex input */}
            <input type="text" value={design[key]} maxLength={7}
              style={{
                ...sel, width: 80, padding: "4px 6px",
                fontFamily: "monospace", fontSize: "11px",
              }}
              onChange={e => {
                const v = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateDesign(key, v);
              }}
            />
            <span style={{ fontFamily: "system-ui", fontSize: "10px", color: "rgba(255,255,255,0.38)", flex: 1 }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div style={S.divider()} />

      <div style={S.row()}>
        <button style={{ ...S.btn("#22C55E","#fff", !isDesignDirty), flex: 2 }}
          disabled={!isDesignDirty}
          onClick={e => { e.stopPropagation(); saveDesign(); }}>
          💾 &nbsp;{isDesignDirty ? "Save Style" : "Saved"}
        </button>
        <button style={{ ...S.btn("rgba(239,68,68,0.12)","#EF4444"), flex: 1 }}
          onClick={e => { e.stopPropagation(); resetDesign(); }}>
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

// ── Main toolbar ─────────────────────────────────────────────
export default function AdminToolbar() {
  const { isAdmin, isEditing, isDirty, isDesignDirty, logout } = useCMS();
  const [tab, setTab]   = useState<"content"|"style">("content");
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const drag = useRef({ on: false, sx: 0, sy: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // Only drag on the header, not on controls
    if ((e.target as HTMLElement).closest("button,select,input,a")) return;
    drag.current = { on: true, sx: e.clientX - pos.x, sy: e.clientY - pos.y };
    const move = (ev: MouseEvent) => {
      if (!drag.current.on) return;
      setPos({ x: ev.clientX - drag.current.sx, y: ev.clientY - drag.current.sy });
    };
    const up = () => {
      drag.current.on = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, [pos]);

  if (!isAdmin) return null;

  const hasUnsaved = isDirty || isDesignDirty;

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: "fixed",
        top:  pos.y === 0 ? 84  : undefined,
        bottom: pos.y < 0 ? Math.abs(pos.y) : undefined,
        right: pos.x === 0 ? 16 : undefined,
        left:  pos.x > 0  ? pos.x : undefined,
        transform: pos.y !== 0 ? `translateY(${pos.y}px)` : undefined,
        zIndex: 9999,
        background: "rgba(18,18,18,0.97)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 12,
        boxShadow: "0 12px 48px rgba(0,0,0,0.55)",
        width: 240,
        userSelect: "none",
        cursor: "grab",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "10px 14px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: isEditing ? "#22C55E" : "#F59E0B", flexShrink: 0 }} />
          <span style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            {isEditing ? "Editing" : "Admin"}
          </span>
          {hasUnsaved && (
            <span style={{ fontSize: "8px", letterSpacing: "0.08em", color: "#F59E0B" }}>● unsaved</span>
          )}
        </div>
        <button onClick={e => { e.stopPropagation(); logout(); }}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontSize: "10px", cursor: "pointer", padding: "2px 4px", lineHeight: 1 }}
          title="Sign out">✕</button>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", padding: "8px 14px 0", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 0 }}>
        {(["content","style"] as const).map(t => (
          <button key={t} onClick={e => { e.stopPropagation(); setTab(t); }}
            style={{
              flex: 1, padding: "6px 0", border: "none", cursor: "pointer",
              fontFamily: "system-ui", fontSize: "9px", letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "none",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.35)",
              borderBottom: tab === t ? "2px solid #3B82F6" : "2px solid transparent",
              transition: "color 0.15s",
            }}>
            {t === "content" ? "✏️ Text" : "🎨 Style"}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div style={{ padding: "12px 14px" }}>
        {tab === "content" ? <ContentTab /> : <StyleTab />}
      </div>

      {/* ── Footer ── */}
      <div style={{ padding: "0 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/admin" onClick={e => e.stopPropagation()} style={{
          fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)", textDecoration: "none",
        }}>Settings</Link>
        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.15)" }}>Al Hamra CMS</span>
      </div>
    </div>
  );
}
