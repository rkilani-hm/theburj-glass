/**
 * AdminToolbar — floating toolbar visible when admin is logged in.
 *
 * States:
 *   View mode:  shows "Enter Edit Mode" button
 *   Edit mode:  shows Save / Discard / Reset / Export / Import / Exit
 *
 * Draggable so it doesn't block content.
 */
import { useState, useRef, useCallback } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { Link } from "react-router-dom";

const BTN: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "7px 14px",
  border: "none",
  cursor: "pointer",
  borderRadius: 4,
  whiteSpace: "nowrap",
  transition: "opacity 0.15s",
};

export default function AdminToolbar() {
  const { isAdmin, isEditing, isDirty, toggleEdit, logout, save, reset, exportJSON, importJSON } = useCMS();
  const fileRef    = useRef<HTMLInputElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);

  // Drag state
  const drag = useRef({ on: false, sx: 0, sy: 0, ex: 0, ey: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    drag.current = { on: true, sx: e.clientX - pos.x, sy: e.clientY - pos.y, ex: pos.x, ey: pos.y };
    const move = (ev: MouseEvent) => {
      if (!drag.current.on) return;
      setPos({ x: ev.clientX - drag.current.sx, y: ev.clientY - drag.current.sy });
    };
    const up = () => { drag.current.on = false; window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, [pos]);

  const handleImport = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => importJSON(ev.target?.result as string);
    reader.readAsText(file);
    e.target.value = "";
  };

  if (!isAdmin) return null;

  return (
    <>
      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={onFile} />

      <div
        ref={barRef}
        onMouseDown={onMouseDown}
        style={{
          position: "fixed",
          top: 80 + pos.y,
          right: pos.x === 0 ? 20 : "auto",
          left: pos.x !== 0 ? pos.x : "auto",
          zIndex: 9999,
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 10,
          boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.30)",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          userSelect: "none",
          cursor: "grab",
          minWidth: 200,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: isEditing ? "#22C55E" : "#F59E0B" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              {isEditing ? "Editing" : "Admin"}
            </span>
          </div>
          {isDirty && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B" }}>
              Unsaved changes
            </span>
          )}
        </div>

        {/* Edit toggle */}
        {!isEditing ? (
          <button style={{ ...BTN, background: "#3B82F6", color: "#fff" }}
            onClick={e => { e.stopPropagation(); toggleEdit(); }}>
            ✏️ &nbsp;Enter Edit Mode
          </button>
        ) : (
          <>
            <button style={{ ...BTN, background: "#22C55E", color: "#fff", opacity: isDirty ? 1 : 0.45 }}
              disabled={!isDirty}
              onClick={e => { e.stopPropagation(); save(); }}>
              💾 &nbsp;Save Changes
            </button>
            <button style={{ ...BTN, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
              onClick={e => { e.stopPropagation(); toggleEdit(); }}>
              👁 &nbsp;Preview
            </button>
            <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ ...BTN, flex: 1, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", fontSize: "9px" }}
                onClick={e => { e.stopPropagation(); exportJSON(); }}>
                ↓ Export
              </button>
              <button style={{ ...BTN, flex: 1, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", fontSize: "9px" }}
                onClick={e => { e.stopPropagation(); handleImport(); }}>
                ↑ Import
              </button>
            </div>
            <button style={{ ...BTN, background: "rgba(239,68,68,0.12)", color: "#EF4444", fontSize: "9px" }}
              onClick={e => { e.stopPropagation(); reset(); }}>
              ↺ &nbsp;Reset to Defaults
            </button>
          </>
        )}

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <Link to="/admin" onClick={e => e.stopPropagation()} style={{
            fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textDecoration: "none",
          }}>Settings</Link>
          <button onClick={e => { e.stopPropagation(); logout(); }} style={{
            ...BTN, background: "none", color: "rgba(255,255,255,0.35)", padding: "4px 8px", fontSize: "9px",
          }}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
