/**
 * CMSContext — the heart of the in-place editor
 *
 * Provides:
 *   useContent(key)        → current value for a content key
 *   useUpdateContent()     → function to update a key
 *   useAdminState()        → { isAdmin, isEditing, login, logout, toggleEdit }
 *   useSaveContent()       → { save, reset, isDirty, exportJSON, importJSON }
 */
import {
  createContext, useContext, useState, useCallback,
  useEffect, useRef, type ReactNode,
} from "react";
import { DEFAULT_CONTENT, STORAGE_KEY, ADMIN_PASS, type CMSContent } from "@/cms/content";

/* ── Load saved content from localStorage, merge with defaults ── */
function loadContent(): CMSContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_CONTENT };
}

/* ── Context shape ── */
interface CMSCtx {
  content:       CMSContent;
  isAdmin:       boolean;
  isEditing:     boolean;
  isDirty:       boolean;
  login:         (pass: string) => boolean;
  logout:        () => void;
  toggleEdit:    () => void;
  updateContent: (key: string, value: string) => void;
  save:          () => void;
  reset:         () => void;
  exportJSON:    () => void;
  importJSON:    (json: string) => void;
}

const CMSContext = createContext<CMSCtx>({} as CMSCtx);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content,   setContent]   = useState<CMSContent>(loadContent);
  const [isAdmin,   setIsAdmin]   = useState(() => sessionStorage.getItem("alhamra_admin") === "1");
  const [isEditing, setIsEditing] = useState(false);
  const [isDirty,   setIsDirty]   = useState(false);
  const savedRef = useRef<CMSContent>(loadContent());

  /* Re-check session on mount */
  useEffect(() => {
    const ok = sessionStorage.getItem("alhamra_admin") === "1";
    setIsAdmin(ok);
    if (!ok) setIsEditing(false);
  }, []);

  const login = useCallback((pass: string): boolean => {
    if (pass === ADMIN_PASS) {
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

  const toggleEdit = useCallback(() => {
    setIsEditing(v => !v);
  }, []);

  const updateContent = useCallback((key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    savedRef.current = { ...content };
    setIsDirty(false);
  }, [content]);

  const reset = useCallback(() => {
    if (!confirm("Reset all content to defaults? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setContent({ ...DEFAULT_CONTENT });
    savedRef.current = { ...DEFAULT_CONTENT };
    setIsDirty(false);
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `alhamra-content-${Date.now()}.json`;
    a.click();
  }, [content]);

  const importJSON = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setContent(prev => ({ ...prev, ...parsed }));
      setIsDirty(true);
    } catch {
      alert("Invalid JSON file");
    }
  }, []);

  return (
    <CMSContext.Provider value={{
      content, isAdmin, isEditing, isDirty,
      login, logout, toggleEdit,
      updateContent, save, reset, exportJSON, importJSON,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

/* ── Hooks ── */
export const useCMS          = () => useContext(CMSContext);
export const useContent      = (key: string) => useContext(CMSContext).content[key] ?? "";
export const useUpdateContent= () => useContext(CMSContext).updateContent;
export const useAdminState   = () => {
  const { isAdmin, isEditing, isDirty, login, logout, toggleEdit } = useContext(CMSContext);
  return { isAdmin, isEditing, isDirty, login, logout, toggleEdit };
};
