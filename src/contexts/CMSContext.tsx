/**
 * CMSContext — in-place editor + design token system
 *
 * Content: localStorage 'alhamra_cms_v1'
 * Design:  localStorage 'alhamra_cms_design_v1'
 * Auth:    sessionStorage 'alhamra_admin'
 */
import {
  createContext, useContext, useState, useCallback,
  useEffect, useRef, type ReactNode,
} from "react";
import {
  DEFAULT_CONTENT, TOWER_CONTENT, BUSINESS_CONTENT, LEASING_CONTENT,
  STORAGE_KEY, ADMIN_PASS, type CMSContent,
} from "@/cms/content";

// Merge all page content into one flat map
const ALL_DEFAULTS: CMSContent = {
  ...DEFAULT_CONTENT,
  ...TOWER_CONTENT,
  ...BUSINESS_CONTENT,
  ...LEASING_CONTENT,
};

// ── Design token defaults ────────────────────────────────────
export interface DesignTokens {
  fontDisplay:       string;
  fontSans:          string;
  fontSizeBase:      string;
  colorInk:          string;
  colorInkMid:       string;
  colorInkLight:     string;
  colorSurface:      string;
  colorBorder:       string;
  colorAccent:       string;
}

const DESIGN_KEY = "alhamra_cms_design_v1";

export const DEFAULT_DESIGN: DesignTokens = {
  fontDisplay:   "Cormorant Garamond",
  fontSans:      "DM Sans",
  fontSizeBase:  "16",
  colorInk:      "#0F0F0E",
  colorInkMid:   "#3A3937",
  colorInkLight: "#767470",
  colorSurface:  "#F7F5F1",
  colorBorder:   "#E5E2DC",
  colorAccent:   "#0F0F0E",
};

function loadDesign(): DesignTokens {
  try {
    const raw = localStorage.getItem(DESIGN_KEY);
    if (raw) return { ...DEFAULT_DESIGN, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_DESIGN };
}

function loadContent(): CMSContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...ALL_DEFAULTS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...ALL_DEFAULTS };
}

// Apply design tokens to :root CSS variables
function applyDesignTokens(d: DesignTokens) {
  const r = document.documentElement.style;
  r.setProperty("--font-display", `'${d.fontDisplay}', Georgia, serif`);
  r.setProperty("--font-sans",    `'${d.fontSans}', system-ui, sans-serif`);
  r.setProperty("font-size",      `${d.fontSizeBase}px`);
  r.setProperty("--ink",          d.colorInk);
  r.setProperty("--ink-mid",      d.colorInkMid);
  r.setProperty("--ink-light",    d.colorInkLight);
  r.setProperty("--surface",      d.colorSurface);
  r.setProperty("--border",       d.colorBorder);
  r.setProperty("--accent",       d.colorAccent);
}

// ── Context types ────────────────────────────────────────────
interface CMSCtx {
  content:       CMSContent;
  design:        DesignTokens;
  isAdmin:       boolean;
  isEditing:     boolean;
  isDirty:       boolean;
  isDesignDirty: boolean;
  login:         (pass: string) => boolean;
  logout:        () => void;
  toggleEdit:    () => void;
  updateContent: (key: string, value: string) => void;
  updateDesign:  (key: keyof DesignTokens, value: string) => void;
  save:          () => void;
  saveDesign:    () => void;
  reset:         () => void;
  resetDesign:   () => void;
  exportJSON:    () => void;
  importJSON:    (json: string) => void;
}

const CMSContext = createContext<CMSCtx>({} as CMSCtx);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content,       setContent]       = useState<CMSContent>(loadContent);
  const [design,        setDesign]        = useState<DesignTokens>(loadDesign);
  const [isAdmin,       setIsAdmin]       = useState(() => sessionStorage.getItem("alhamra_admin") === "1");
  const [isEditing,     setIsEditing]     = useState(false);
  const [isDirty,       setIsDirty]       = useState(false);
  const [isDesignDirty, setIsDesignDirty] = useState(false);

  // Apply design tokens on mount and whenever they change
  useEffect(() => { applyDesignTokens(design); }, [design]);

  const login = useCallback((pass: string): boolean => {
    const stored = localStorage.getItem("alhamra_admin_pass") || ADMIN_PASS;
    if (pass === stored) {
      sessionStorage.setItem("alhamra_admin", "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("alhamra_admin");
    setIsAdmin(false);
    setIsEditing(false);
  }, []);

  const toggleEdit = useCallback(() => setIsEditing(v => !v), []);

  const updateContent = useCallback((key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const updateDesign = useCallback((key: keyof DesignTokens, value: string) => {
    setDesign(prev => {
      const next = { ...prev, [key]: value };
      applyDesignTokens(next);
      return next;
    });
    setIsDesignDirty(true);
  }, []);

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setIsDirty(false);
  }, [content]);

  const saveDesign = useCallback(() => {
    localStorage.setItem(DESIGN_KEY, JSON.stringify(design));
    setIsDesignDirty(false);
  }, [design]);

  const reset = useCallback(() => {
    if (!confirm("Reset all text content to defaults?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setContent({ ...ALL_DEFAULTS });
    setIsDirty(false);
  }, []);

  const resetDesign = useCallback(() => {
    if (!confirm("Reset all design settings to defaults?")) return;
    localStorage.removeItem(DESIGN_KEY);
    setDesign({ ...DEFAULT_DESIGN });
    applyDesignTokens(DEFAULT_DESIGN);
    setIsDesignDirty(false);
  }, []);

  const exportJSON = useCallback(() => {
    const payload = { content, design };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `alhamra-cms-${Date.now()}.json`;
    a.click();
  }, [content, design]);

  const importJSON = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.content) { setContent(prev => ({ ...prev, ...parsed.content })); setIsDirty(true); }
      if (parsed.design)  { setDesign(prev => { const n = { ...prev, ...parsed.design }; applyDesignTokens(n); return n; }); setIsDesignDirty(true); }
    } catch { alert("Invalid JSON file"); }
  }, []);

  return (
    <CMSContext.Provider value={{
      content, design, isAdmin, isEditing, isDirty, isDesignDirty,
      login, logout, toggleEdit,
      updateContent, updateDesign,
      save, saveDesign, reset, resetDesign, exportJSON, importJSON,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export const useCMS           = () => useContext(CMSContext);
export const useContent       = (key: string) => useContext(CMSContext).content[key] ?? "";
export const useUpdateContent = () => useContext(CMSContext).updateContent;
export const useAdminState    = () => {
  const { isAdmin, isEditing, isDirty, login, logout, toggleEdit } = useContext(CMSContext);
  return { isAdmin, isEditing, isDirty, login, logout, toggleEdit };
};
