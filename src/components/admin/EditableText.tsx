/**
 * EditableText — renders text editable in-place when admin is in edit mode.
 *
 * <EditableText cms="about.body" tag="p" className="..." style={...} />
 *
 * View mode: renders stored content as the given HTML tag
 * Edit mode: contentEditable with blue ring, saves on blur
 */
import { useRef, useEffect, type CSSProperties, type ElementType } from "react";
import { useCMS, useContent, useUpdateContent } from "@/contexts/CMSContext";

interface Props {
  cms:        string;
  tag?:       ElementType;
  className?: string;
  style?:     CSSProperties;
  children?:  React.ReactNode;
  multiline?: boolean;
  oneLine?:   boolean;
}

export default function EditableText({
  cms, tag: Tag = "span", className, style, children, multiline = false, oneLine = false,
}: Props) {
  const { isEditing } = useCMS();
  const value         = useContent(cms);
  const update        = useUpdateContent();
  const ref           = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value || "";
    }
  }, [value, isEditing]);

  const text = value || (typeof children === "string" ? children : "") || "";

  if (!isEditing) {
    if (multiline) {
      const lines = text.split("\n");
      return (
        <Tag className={className} style={style}>
          {lines.map((line, i) => (
            <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
          ))}
        </Tag>
      );
    }
    return <Tag className={className} style={style}>{text || children}</Tag>;
  }

  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      className={className}
      data-cms-key={cms}
      style={{
        ...style,
        outline: "none",
        cursor: "text",
        position: "relative" as const,
        boxShadow: "inset 0 0 0 1.5px rgba(59,130,246,0.6), 0 0 0 3px rgba(59,130,246,0.10)",
        borderRadius: 2,
        minHeight: "1em",
        transition: "box-shadow 0.15s",
      }}
      onFocus={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "inset 0 0 0 2px #3B82F6, 0 0 0 6px rgba(59,130,246,0.16)";
      }}
      onBlur={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow =
          "inset 0 0 0 1.5px rgba(59,130,246,0.6), 0 0 0 3px rgba(59,130,246,0.10)";
        update(cms, el.textContent || "");
      }}
      onKeyDown={e => {
        if (oneLine && e.key === "Enter") { e.preventDefault(); (e.currentTarget as HTMLElement).blur(); }
      }}
    >
      {text || children}
    </Tag>
  );
}
