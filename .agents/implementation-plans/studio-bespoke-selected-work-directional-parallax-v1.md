# Studio Bespoke — Selected Work / Directional Parallax v1

**Status:** Implementation-ready plan

**Homepage chapter:** 04 — Selected Work / Range

**Journey job:** Expertise → Range

**Visitor belief:** Studio Bespoke's point of view holds across residential, workplace, hospitality, and intimate spatial scales.

## Visual thesis

**A moving portfolio corridor with an architectural frame.**

The reference infinite-parallax mechanic is adapted into a finite, four-project procession. The frame stays almost full-screen with deliberate side margins for typography. Projects enter from different architectural directions, but the sequence is authored rather than random. The visitor experiences breadth, then exits naturally into one deep featured case.

## Important divergence from the reference

Do **not** initialize a second infinite Lenis wrapper and do **not** duplicate the first panel at the end. A literal infinite loop would trap the homepage before Featured Mira, create nested scrolling, and conflict with the existing page-level smooth-scroll system.

Borrow only these principles from `cinematic-motion/reference/infinite-parallax-gallery-loop.md`:

- media moves at a different rate from its clipping frame;
- each project receives one viewport-scale reading beat;
- the gallery feels continuous because incoming and outgoing frames share geometry;
- copy stays outside the moving media plane.

## Project shortlist and order

Use four projects and exclude Mira because it owns the next chapter. Avoid Damac Hills because the current hero already uses it.

| Beat | Project | Type / proof job | Initial image candidate from `portfolio_gallery.md` | Entry direction |
| ---: | --- | --- | --- | --- |
| 1 | Murooj Al Furjan 2 | Residential / whole-home breadth | `Ground-floor_07.jpg` | bottom → top |
| 2 | Cornelias Innovation Hub | Commercial / workplace range | `Cornelias_03.jpg` | right → left |
| 3 | The Strand Cafe | Hospitality / social atmosphere | `1R9A7502-scaled.jpg` | left → right |
| 4 | Zulal The Lakes 2 | Residential / intimate material resolution | `Lakes_16-scaled.jpg` | top → bottom |

Before implementation, inspect all four source images at desktop and mobile crops. Replace a candidate only if its depth, focal point, or text-safe zone fails. Preserve the project order unless a replacement changes the visual rhythm.

## Composition

### Desktop stage

- Outer section: approximately `360–420svh`, calculated from four beats and tuned in the browser.
- Sticky stage: `100svh`, dark neutral field, `overflow: clip`.
- Use an asymmetric editorial frame rather than equal side gutters:
  - left text rail: approximately `18–21vw`;
  - media aperture: approximately `72–76vw × 76–80svh`;
  - right progress rail: approximately `4–6vw`.
- The aperture remains almost full-screen but is offset slightly right so short project writing has real breathing room.
- Left text rail:
  - eyebrow `Selected Work`;
  - active project name;
  - type (`Residential`, `Workplace`, `Hospitality`) only when verified;
  - one concise project thought, limited to roughly 8–16 words or two short lines.
- Right progress rail:
  - calm progress `1 / 4`;
  - a quiet directional cue or `View project` link when a valid destination exists.
- Rails remain outside the media aperture and do not move with project panels.
- Project names and their single design thought transfer together through a vertical text mask; no generic fade-up stack.
- Do not overlay routine project copy on the photographs. An image overlay is reserved only for a future image whose composition has an intentional text-safe architectural surface and passes contrast testing without a broad dark veil.

### Project microcopy

The text is not a generic description and does not repeat the room type. It names one visible design quality or decision. Keep the following as provisional editorial direction until checked against official project copy and imagery:

| Project | Provisional short thought |
| --- | --- |
| Murooj Al Furjan 2 | `Softened thresholds bring the ground floor into one calm rhythm.` |
| Cornelias Innovation Hub | `Planting, circulation and collaboration share the same spatial language.` |
| The Strand Cafe | `Material warmth turns an everyday visit into a composed atmosphere.` |
| Zulal The Lakes 2 | `Quiet joinery and tonal restraint make intimate spaces feel complete.` |

Do not invent client outcomes, structural alterations, locations, dates, or measurements. If official project evidence cannot support a line, replace it with a strictly visual observation.

### Panel structure

Each project panel has:

```text
article[data-project-panel]
  div[data-project-clip]
    picture[data-project-media]
  semantic project heading and link in the fixed rails
```

- Panels are absolutely stacked inside the aperture.
- Only the active and adjacent panel may be rendered with `will-change`.
- Inactive panels use `visibility: hidden` and `pointer-events: none`.
- The image plane overscans its clip by 8–12% to prevent exposed edges during counter-motion.

## Directional parallax choreography

Direction varies by project, but every transition obeys one physical rule: **the clipping frame arrives first; the room follows with resistance.**

For each incoming panel:

1. Clip frame begins one full aperture length outside the stage on its assigned axis.
2. Inner image starts 10–16% farther in the opposite direction.
3. Clip frame travels to zero with linear scrub.
4. Inner image counter-translates toward zero more slowly, creating depth.
5. Previous panel moves only 8–12% opposite the incoming direction and darkens slightly; it does not fly away at equal speed.
6. Active panel holds long enough for project name and type to be read.

### Timeline map

| Section progress | State |
| ---: | --- |
| 0.00–0.12 | Transition from Services stabilizes the first aperture. |
| 0.12–0.28 | Murooj holds with restrained vertical media drift. |
| 0.28–0.42 | Cornelias enters right → left, then holds. |
| 0.42–0.58 | Strand enters left → right, then holds. |
| 0.58–0.74 | Zulal enters top → bottom, then holds. |
| 0.74–0.86 | Zulal settles; gallery stops moving so breadth can register. |
| 0.86–1.00 | Range → Featured Mira handoff. |

- Use one GSAP timeline and one pinned/sticky owner. Do not create one competing ScrollTrigger per panel.
- Use `scrub: 0.45–0.65`; no bounce or velocity-driven distortion.
- Timeline must reverse cleanly and restore z-index, visibility, rail copy, and links.
- The directional order is deterministic. “Unpredictable” is achieved perceptually through alternating axes, not random runtime values.

## Transition from Services

Selected Work owns the incoming handoff. If Services exposes `data-services-exit-media`, use `Flip` only if it can transfer geometry without duplicating the image or breaking reverse scroll. Otherwise reproduce the same source image in the first Selected Work panel and use a matched crossfade while the aperture expands to its stable dimensions.

No dark blank spacer may appear between chapters.

## Transition to Featured Mira

At the final beat, the four-project progress rail resolves from `4 / 4` to the words `One project, in depth.` The Zulal frame stops. Its media darkens while the frame expands from `86vw × 78svh` to full viewport. Inside the same stable frame, the first frame of the Mira blueprint film crossfades in. Only after the crossfade completes does the Mira section take ownership and begin its scrubbed sequence.

Selected Work must not animate Mira's video current time. It only delivers a stable poster/first frame and handoff progress.

## Mobile

- No pin and no horizontal/vertical scroll hijack.
- Four ordinary project figures in a deliberate alternating crop rhythm.
- Each figure includes project name, verified type, one short project thought, and link directly beneath it.
- Optional image reveal uses one consistent vertical clip; do not reproduce four directions on a narrow viewport.
- Keep the Mira handoff as an ordinary full-width poster following the fourth project.

## Reduced motion

- Same finite stacked project list as mobile.
- No transformed media, parallax, pin, or crossfade dependency.
- Preserve all four projects and their links.

## Accessibility

- Semantic `section`, ordered project articles, headings, and links remain in DOM order.
- Moving image wrappers are decorative; meaningful alt text belongs to each `Image`.
- Fixed visual rails must not create a duplicate reading order. Use one semantic heading per project.
- Links become focusable only for the active visual panel on enhanced desktop; all links remain reachable in static/mobile flow.
- Provide sufficient contrast on every image state without broad text shadows.

## Performance

- Use optimized local WebP/AVIF files for the final implementation; remote official URLs are prototype evidence only.
- Preload only the first Selected Work image shortly before entry.
- Lazy-load the remaining three, but ensure the next panel decodes before its reveal range.
- No WebGL is required. DOM, `clip-path`/transforms, GSAP, and `next/image` are sufficient.
- Do not apply `will-change` to all four full-resolution panels for the entire page lifetime.
- Pause/kill timeline work outside the section and clean up through `gsap.matchMedia()`.

## Implementation ownership

- Add:
  - `studio-bespoke-next/app/concepts/living-threshold/selected-work-section.js`
  - `studio-bespoke-next/app/concepts/living-threshold/selected-work-section.module.css`
- Mount immediately after `ServicesSection` in `page.js`.
- Reuse `@/lib/motion`; do not instantiate another Lenis instance.
- Keep project data in a small explicit array near the component unless three or more sections need the same content.

## Verification matrix

- Desktop: 1440×900, 1280×800, 1024×768.
- Mobile: 390×844 and 360×800.
- Input: wheel, trackpad, Page Down, reverse scroll, rapid oscillation.
- States: normal motion, reduced motion, image decode delay, failed image, direct refresh mid-section.
- Assertions:
  - one dominant project at a time;
  - no exposed aperture edge;
  - no duplicate or skipped project name;
  - no nested scrollbar;
  - no horizontal overflow;
  - clean reverse order;
  - Featured Mira is reachable.

## Acceptance criteria

- The viewer can identify at least three distinct project types without reading a card grid.
- Direction changes feel like openings from different architectural thresholds, not random slides.
- Every panel receives a readable hold.
- The gallery has a clear entrance and exit; it never loops forever.
- Mira remains absent until the featured-project handoff.
- Mobile and reduced motion contain the complete portfolio shortlist.
- Lint, production build, browser console, performance sampling, and the full verification matrix pass.
