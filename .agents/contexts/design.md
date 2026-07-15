# Studio Bespoke Design — Visual Token Contracts

This document establishes the UI styling parameters, component states, and typographic scales for the Studio Bespoke Design website. 

---

## 1. Typography System

The typographic styling avoids fragile, over-stretched serifs and focuses on a clean, structured, editorial look using rare, high-fashion typography.

| Layer | Typeface | Size (Desktop) | Size (Mobile) | Line Height | Tracking | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| **Display** | *Melodrama* (Serif) | `4.5rem` / `72px` | `2.5rem` / `40px` | `1.05` | `-0.02em` | Main titles, flagship headers |
| **Sub-Display** | *Melodrama* (Serif) | `2.25rem` / `36px` | `1.5rem` / `24px` | `1.1` | `-0.01em` | Chapter headers |
| **Body** | *Satoshi* (Sans-Serif) | `1rem` / `16px` | `0.95rem` / `15.2px` | `1.6` | `normal` | Narrative body text, copy |
| **Annotations** | *Satoshi* (Mono/Sans) | `0.8rem` / `12.8px` | `0.75rem` / `12px` | `1.4` | `0.05em` | Spatial notes, process details |

---

## 2. Active Color Palette

**Theme: Travertine & Ironwood**
*A high-contrast editorial look with a very deep accent reflecting structural oak joinery and oxidized iron frames. Ultra-premium, stark contrast.*

* **Neutral (Primary BG):** `#F9F8F6` (Raw Silk / Soft Alabaster)
* **Communicator (Text):** `#1C1C1A` (Cast Iron Charcoal)
* **Anchor (Captions/Rules):** `#948E85` (Warm Muted Concrete)
* **Support (Containers):** `#F1EFEA` (Light Travertine Stone)
* **Action (CTA/Accent):** `#4E3F35` (Oxidized Bronze / Smoked Oak)

---

## 3. Layout Grid & Spacing

To align layout elements cleanly across viewports, the site uses a strict responsive container margin.

* **Desktop Max-Width:** `1200px` (Center aligned)
* **Desktop Grid:** 12 columns with `24px` gutters
* **Mobile Margins:** `20px` left and right
* **Vertical Spacing Scale:**
  * `xs`: `12px` (Annotations to labels)
  * `sm`: `24px` (Captions to headers)
  * `md`: `48px` (Paragraphs to next text blocks)
  * `lg`: `96px` (Sections and major chapter cuts)
  * `xl`: `144px` (FLAGSHIP room-to-room transitions)

---

## 4. Interaction & Motion Rules

* **Hover Transitions:** `300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` (Weighted ease-out)
* **Focus Indicator:** Custom 2px solid active action accent color with `4px` offset
* **Threshold transition:** On desktop, the completed Mira room holds still while the inherited-plan chapter rises over it as a curtain. Do not use Z-axis zooms, crossfades, or decorative parallax for this handoff. On mobile and for reduced motion, use ordinary sequential scroll.
