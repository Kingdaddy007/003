# Studio Bespoke — Services Rescue v2

**Status:** Recommended correction plan; implementation deferred

**Homepage chapter:** 03 — Expertise / Services

**Journey job:** Person → Expertise

**Visitor belief:** Studio Bespoke offers two distinct ways to engage, both governed by one authored design point of view.

## Why the current build is rejected

The present desktop composition is not shippable. `FULL TURNKEY`, `WORLDWIDE`, and `INTERIOR DESIGN` occupy competing spatial layers, overlap during scrub, and allow the following section to intrude before the service thought resolves. The motion changes position without transferring meaning. The opening headline is the only element worth preserving provisionally.

## Recommended rescue thesis

**Two thresholds. One point of view.**

Keep `One studio. Two ways to work.` as the opening proposition. Replace the floating three-line typographic chorus with two calm, full-width service states inside one contained stage. Each state pairs one clear service name, one sentence, and one low-contrast project surface. The imagery is atmospheric evidence, not a third focal point.

## Preserve

- `One studio. Two ways to work.`
- Verified service names:
  - `Full Turnkey Interior Design`
  - `Worldwide Interior Design`
- Dark graphite field and warm ivory type, subject to contrast verification.
- Existing page-level Lenis instance and GSAP/ScrollTrigger infrastructure.

## Remove

- The separate giant `INTERIOR DESIGN` phrase.
- Absolute-positioned service names that can collide.
- Letter-spacing animation and lateral word fly-in.
- The horizontal rule crossing through the type.
- Any service numbering, slash metadata, location labels, or invented scope claims.
- Any dependency on reaching document maximum scroll to complete the state.

## Composition

### Desktop

- One section, approximately `125–140svh`; one sticky stage at `100svh`.
- Opening proposition sits in the upper-left third, not centered like a title card.
- Service state occupies the lower two-thirds as a clean two-column editorial spread:
  - left: service name and concise sentence;
  - right: restrained image plane occupying roughly 42–48% of the stage.
- Only one service state is visually dominant at a time.
- The inactive state remains accessible in the DOM but is hidden from the visual layer with `visibility` and `opacity`, never by unmounting.
- No content from Selected Work may appear until the service stage has released.

### Image logic

- Use one verified Studio Bespoke image per service, chosen from `studio-bespoke-inception/portfolio_gallery.md`.
- Full Turnkey candidate: a completed residential whole-room view that communicates integrated responsibility, preferably `Murooj Al Furjan 2 / Ground-floor_07.jpg`.
- Worldwide candidate: a project with a distinct geographic or typological identity; do not claim an overseas location unless evidence confirms it. Until then, use a different Studio Bespoke project as evidence of a transferable point of view, not as proof of geography.
- Images sit behind a localized graphite veil and remain visually quieter than the service name.
- Do not reduce opacity so far that the image becomes muddy decoration. Use full image contrast under a controlled solid/gradient veil.

## Copy hierarchy

### Opening

- Eyebrow: `Services`
- Heading: `One studio. Two ways to work.`
- Support: `One point of view, carried through every project and every detail.`

### State A

- Heading: `Full Turnkey Interior Design`
- Support: `From first idea to final detail, one studio carries the whole.`

### State B

- Heading: `Worldwide Interior Design`
- Support: `A Studio Bespoke point of view, shaped for homes beyond Dubai.`
- Evidence gate: use `beyond Dubai` only if the official service page supports it. Otherwise retain the current safer line: `A Studio Bespoke point of view, wherever home is.`

## Motion contract

### Communication job

Transfer the viewer from one engagement model to the other while preserving the same studio authorship.

### Desktop playhead

| Progress | Responsibility |
| ---: | --- |
| 0.00–0.16 | Opening proposition settles; first service is already legible. |
| 0.16–0.42 | Full Turnkey holds. Image drifts no more than 4–6% on the Y axis. |
| 0.42–0.54 | First image darkens; copy exits through a short vertical mask. No overlap with the next name. |
| 0.54–0.68 | Worldwide image crossfades in; its copy reveals through the same mask. |
| 0.68–0.88 | Worldwide holds completely readable. |
| 0.88–1.00 | Service stage releases into the Selected Work aperture transition. |

- Use one reversible GSAP timeline with `scrub: 0.4–0.55`.
- Never animate both service headings at full opacity simultaneously.
- Crossfade duration must be shorter than each reading hold.
- Inner media drift follows the same vertical physical law in both states; variety belongs in the Selected Work chapter.

## Transition to Selected Work

The Worldwide image becomes the source surface for the next chapter. During the final 12% of the service playhead, its image frame moves from the right column toward the center and expands to the Selected Work gallery aperture, approximately `86vw × 78svh`. The service copy withdraws before expansion begins. Selected Work typography appears only after the frame geometry is stable.

This transition is owned by the Selected Work component. Services exposes only a stable handoff element such as `data-services-exit-media`; it must not animate the next section directly.

## Mobile and reduced motion

- No sticky stage and no overlapping states.
- Ordinary flow: opening proposition → Full Turnkey figure/copy → Worldwide figure/copy.
- Images use responsive intrinsic dimensions and project-specific crops.
- Reduced motion may use a short opacity transition only if initiated by normal viewport entry; all copy remains visible without it.

## Implementation ownership

- Replace the current structure in:
  - `studio-bespoke-next/app/concepts/living-threshold/services-section.js`
  - `studio-bespoke-next/app/concepts/living-threshold/services-section.module.css`
- Add service content to a local data module only if Selected Work and Mira will also consume it; avoid a one-use abstraction.
- Keep imports through `@/lib/motion`.
- Use `gsap.matchMedia()` and revert all timelines on unmount.

## Acceptance criteria

- At every sampled scroll position, exactly one service state is dominant.
- No text collision, clipping, or next-section leakage at 1440×900, 1280×800, and 1024×768.
- Both service names remain available to screen readers in logical order.
- The section communicates without animation on mobile and reduced motion.
- The transition hands off one stable image frame to Selected Work without a flash or layout shift.
- Reverse scrolling restores each state in exact reverse order.
- Lint, production build, browser console, horizontal overflow, slow/fast wheel, trackpad, mobile, and reduced-motion checks pass.
