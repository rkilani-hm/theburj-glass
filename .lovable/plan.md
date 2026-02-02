

# Technical Building Dashboard - Full-Screen HUD Implementation

## Overview

Create a new **futuristic, full-screen Heads-Up Display (HUD)** page for Al Hamra Tower under "The Tower" menu. The design will use the uploaded Al Hamra Tower night image as the background and follow the reference dashboard UI for layout, glassmorphism styling, and neon accent colors.

---

## Visual Reference Analysis

Based on the provided images:

| Element | Reference Style |
|---------|-----------------|
| **Background** | Full-bleed tower image with dark overlay |
| **UI Containers** | Frosted glass (glassmorphism) with thin glowing borders |
| **Primary Accent** | Neon cyan/blue (#00D4FF) |
| **Secondary Accent** | Alert red for critical data |
| **Typography** | Digital/monospace for numbers, clean sans-serif for labels |
| **Data Points** | Floating labels with leader lines connecting to tower |
| **Gauges** | Circular progress rings with glow effects |

---

## Page Structure

```text
+-----------------------------------------------------------------------+
|                      [TRANSPARENT HEADER]                              |
+-----------------------------------------------------------------------+
|                                                                        |
|  +--SYSTEM VITALITY--+                                                 |
|  | [Dual Fiber Gauge]|          413M HEIGHT ─────────┐                |
|  | [Backup Power]    |          80 FLOORS ───────────┤                |
|  +-------------------+                               │                 |
|                                                [TOWER IMAGE]           |
|                              2,300 SQM ──────────────┤                |
|                              FLOORPLATE              │                 |
|                                                      │                 |
|  +--NETWORK STATUS---+       FIBER OPTIC ────────────┤                |
|  | [Line Graph]      |       BACKBONE                │                |
|  +-------------------+                               │                 |
|                              DUAL POWER ─────────────┘                |
|                              REDUNDANCY                                |
|                                                        +--STATUS--+    |
|                                                        | Network  |    |
|                                                        | Security |    |
|                                                        +----------+    |
+-----------------------------------------------------------------------+
|  [FACILITIES]   [SECURITY]   [IT SUPPORT]   [BACK]                    |
+-----------------------------------------------------------------------+
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/tower/Dashboard.tsx` | Main HUD page component |
| `src/components/alhamra/DashboardHotspot.tsx` | Floating data labels with SVG leader lines |
| `src/components/alhamra/GlowingGauge.tsx` | Circular progress with animated glow effect |
| `src/components/alhamra/SystemVitalityPanel.tsx` | Left sidebar with gauges and graph |
| `src/components/alhamra/NetworkStatusPanel.tsx` | Right sidebar with status indicators |
| `src/components/alhamra/DashboardFooter.tsx` | Horizontal navigation bar |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/alhamra/Header.tsx` | Add "Technical Dashboard" to `towerSubItems` array |
| `src/App.tsx` | Add route `/tower/dashboard` pointing to Dashboard component |

---

## Component Details

### 1. Dashboard.tsx (Main Page)

**Layout:**
- Full viewport (`h-screen`, `overflow-hidden`) - no scrolling
- Background: User-uploaded tower night image with `bg-black/70` overlay
- Grid layout positioning panels and hotspots

**Key Features:**
- Uploaded tower image as full-bleed background
- Dark semi-transparent overlay for contrast
- Fixed positioned panels (left and right)
- Absolutely positioned hotspots with leader lines
- Footer navigation bar

### 2. DashboardHotspot.tsx

**Props:**
```typescript
interface HotspotProps {
  position: { x: string; y: string };
  targetPoint: { x: string; y: string };
  title: { en: string; ar: string };
  subtitle?: { en: string; ar: string };
  side: "left" | "right";
}
```

**Styling:**
- Glassmorphism container: `bg-black/40 backdrop-blur-xl border border-cyan-500/30`
- Glowing effect: `shadow-[0_0_20px_rgba(0,212,255,0.3)]`
- SVG leader lines with animated stroke-dasharray
- Digital font for numbers: `font-mono`

**Data Points to Display:**
| Position | Content |
|----------|---------|
| Top-right | 413M HEIGHT / 80 FLOORS |
| Middle-left | 2,300 SQM FLOORPLATE |
| Middle-right | FIBER OPTIC BACKBONE |
| Bottom-right | DUAL POWER REDUNDANCY |

### 3. GlowingGauge.tsx

**Props:**
```typescript
interface GaugeProps {
  value: number;
  maxValue: number;
  label: { en: string; ar: string };
  status: { en: string; ar: string };
  glowColor: string;
}
```

**Animation:**
- SVG circle with `stroke-dashoffset` animation via Framer Motion
- Pulsing glow effect using CSS filter
- Animated value counter using `useCountUp` hook

### 4. SystemVitalityPanel.tsx (Left Panel)

**Contents:**
- Header: "SYSTEM VITALITY"
- Gauge 1: Dual Fiber Online (100% / Active)
- Gauge 2: Backup Power (12H / Ready)
- Divider line
- Mini line graph: "NETWORK TRAFFIC"

**Styling:**
- Glassmorphism: `bg-black/50 backdrop-blur-xl`
- Thin border: `border border-white/10`
- Corner accents (decorative frame lines)

### 5. NetworkStatusPanel.tsx (Right Panel)

**Contents:**
- Header: "NETWORK STATUS"
- Status rows with icons:
  - Network Status: 100%
  - Security Protocols: Active
  - System Health: Optimal

**Styling:**
- Same glassmorphism as left panel
- Status indicators with green/cyan glow for active states

### 6. DashboardFooter.tsx

**Buttons:**
| Button | Action |
|--------|--------|
| FACILITIES MANAGEMENT | Show facilities info modal |
| SECURITY PROTOCOLS | Show security info modal |
| IT SUPPORT SERVICES | Show IT support info modal |
| BACK TO TOWER | Navigate to `/tower` |

**Styling:**
- Fixed at bottom: `fixed bottom-0 left-0 right-0`
- Glassmorphism bar: `bg-black/60 backdrop-blur-md`
- Buttons with cyan border on hover

---

## Color Palette (Inline Styles)

Since this is a specialized dark-mode HUD, colors will be applied inline without modifying the global design system:

| Element | Tailwind Class |
|---------|----------------|
| Background overlay | `bg-black/70` |
| Glass containers | `bg-black/40` to `bg-black/60` |
| Primary accent | `text-cyan-400`, `border-cyan-500` |
| Glow effect | `shadow-[0_0_20px_rgba(0,212,255,0.4)]` |
| Secondary accent (alerts) | `text-red-500` |
| Text primary | `text-white` |
| Text secondary | `text-gray-400` |
| Status active | `text-green-400` |

---

## Animations

| Animation | Implementation |
|-----------|----------------|
| Gauge ring fill | Framer Motion `strokeDashoffset` animation |
| Pulse glow | CSS `animate-pulse` with filter blur |
| Leader line draw | SVG path with `pathLength` animation |
| Fade-in sequence | Staggered `initial`/`animate` with delays |
| Number counting | `useCountUp` hook for stat values |
| Status blink | Infinite opacity animation for "live" indicators |

---

## Bilingual Support

New translation keys for `LanguageContext.tsx`:

```typescript
// Dashboard translations
"dashboard.title": { en: "Technical Dashboard", ar: "لوحة التحكم الفنية" },
"dashboard.systemVitality": { en: "SYSTEM VITALITY", ar: "حيوية النظام" },
"dashboard.dualFiber": { en: "DUAL FIBER ONLINE", ar: "ألياف مزدوجة نشطة" },
"dashboard.backupPower": { en: "12H BACKUP POWER", ar: "طاقة احتياطية ١٢ ساعة" },
"dashboard.networkStatus": { en: "NETWORK STATUS", ar: "حالة الشبكة" },
"dashboard.height": { en: "413M HEIGHT", ar: "ارتفاع ٤١٣م" },
"dashboard.floors": { en: "80 FLOORS", ar: "٨٠ طابق" },
"dashboard.floorplate": { en: "2,300 SQM FLOORPLATE", ar: "مساحة طابق ٢,٣٠٠ م²" },
"dashboard.fiberOptic": { en: "FIBER OPTIC BACKBONE", ar: "العمود الفقري للألياف الضوئية" },
"dashboard.dualPower": { en: "DUAL POWER REDUNDANCY", ar: "تكرار الطاقة المزدوج" },
"dashboard.facilities": { en: "FACILITIES MANAGEMENT", ar: "إدارة المرافق" },
"dashboard.security": { en: "SECURITY PROTOCOLS", ar: "بروتوكولات الأمان" },
"dashboard.itSupport": { en: "IT SUPPORT SERVICES", ar: "خدمات الدعم الفني" },
"dashboard.backToTower": { en: "BACK TO TOWER", ar: "العودة للبرج" },
```

---

## Navigation Update

Add to `towerSubItems` in `Header.tsx`:

```typescript
{ 
  key: "nav.tower.dashboard", 
  href: "/tower/dashboard", 
  label: { en: "Technical Dashboard", ar: "لوحة التحكم الفنية" } 
}
```

---

## Responsive Behavior

| Viewport | Layout |
|----------|--------|
| Desktop (lg+) | Full HUD with side panels |
| Tablet (md) | Panels collapse to bottom drawer |
| Mobile (sm) | Simplified vertical layout with scrolling enabled |

---

## Implementation Sequence

1. **Copy uploaded tower image** to `src/assets/tower-night-hud.jpg`
2. **Create** `GlowingGauge.tsx` - Reusable circular gauge with glow
3. **Create** `DashboardHotspot.tsx` - Floating labels with leader lines
4. **Create** `SystemVitalityPanel.tsx` - Left panel with gauges
5. **Create** `NetworkStatusPanel.tsx` - Right panel with status
6. **Create** `DashboardFooter.tsx` - Bottom navigation bar
7. **Create** `Dashboard.tsx` - Main page composing all components
8. **Update** `Header.tsx` - Add navigation menu item
9. **Update** `App.tsx` - Add route configuration
10. **Update** `LanguageContext.tsx` - Add translation keys

---

## Technical Considerations

- **Performance**: Use `will-change` for animated elements, lazy load panels
- **Accessibility**: Ensure sufficient contrast, add ARIA labels to interactive elements
- **RTL Support**: Mirror panel positions and leader line directions for Arabic
- **Mobile**: Consider touch-friendly interactions for footer buttons

