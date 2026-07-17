# Studio Bespoke — Founder Aperture Reveal v3

**Status:** Approved for delegation  
**Decision type:** Type 1.5 — cross-cutting visual, motion, accessibility, and layout refinement  
**Target route:** `http://127.0.0.1:3000/concepts/living-threshold`  
**Branch:** `codex/chatgptibeliveyou`  
**Supersedes:** The portrait, typography, founder-height, and timing portions of `studio-bespoke-founder-sticky-underlap-v2.md`  
**Implementation owner:** Delegated Anti-Gravity CLI agent  
**Review owner:** Codex and the user

## 1. Approved outcome

Replace the current three-slice portrait convergence with a scroll-scrubbed **portrait aperture reveal**:

- a fixed portrait frame begins as a shallow horizontal window;
- the window expands downward as the user scrolls;
- the portrait moves subtly inside the mask at a different rate;
- the founder's face is encountered before the complete portrait resolves;
- the motion reverses coherently when scrolling upward.

The typography must support the idea rather than compete with the image:

- the heading reveals from one consistent left-side reading origin;
- lines resolve in reading order: `Personal` → `begins with` → `listening.`;
- the body copy reveals in two natural clauses with a soft reading/ink exposure;
- no word-by-word kinetic typography is required;
- the signature remains the final authorship seal.

The founder panel must feel materially shorter:

- target approximately `520–550px` at 1440×900;
- target approximately `58–61svh` on standard desktop;
- target portrait height approximately `330–360px`;
- no internal scrollbar or nested scroll region.

The existing opaque paper-panel underlap remains the transition language, but its reduced-motion and end-state bugs must be fixed.

## 2. Source register and reference translation

The supplied screenshots are direct visual references, not source code or proof of a specific library.

| Source | Evidence | Confidence / limit |
| --- | --- | --- |
| `codex-clipboard-96e459ae-31aa-489a-bdd3-80abeb12a9f4.png` | Upper portion of a portrait is visible through a shallow rectangular window. | OBSERVED, high for geometry; trigger mechanism unknown. |
| `codex-clipboard-7d28565d-59e4-485d-a404-824fe1601f69.png` | The portrait window has expanded downward; face is legible and a text fragment is entering below. | OBSERVED, high for progression; scroll direction is reported by the user. |
| `codex-clipboard-a972ef51-90d3-4c43-972d-601f57afac67.png` | Full portrait is revealed within the same frame. | OBSERVED, high for final state; reverse behavior not shown. |

### Translation ledger

| Candidate | Decision | Brand-specific translation |
| --- | --- | --- |
| Portrait aperture / mask reveal | ADAPT | Use the founder's real colour portrait. The aperture means “the person behind the work comes into view,” not anonymous spectacle. |
| Internal image parallax | ADAPT | Keep movement small (`-6% → 0%`, scale near `1.04 → 1`) so the face remains credible and the effect feels photographic rather than 3D. |
| Three independent portrait slices | REJECT | Current convergence communicates assembly/design systems, not listening or founder authorship. |
| Black-and-white treatment | REJECT | The reference's tonal treatment is not part of Studio Bespoke's approved visual evidence. |
| Word-by-word paragraph animation | DEFER / REJECT for first pass | It risks reading like a demo and creates unnecessary DOM/accessibility complexity. Use two clause-level reveals. |
| Existing signature reveal | KEEP | The authentic signature is a meaningful authorship mark. |
| Opaque paper-panel underlap | KEEP / REPAIR | Retain the physical hero-under-paper relationship, but disable overlap in reduced motion and make the final reveal reachable. |

## 3. Authority and required context

Read these files completely before editing:

1. `AGENTS.md`
2. `.agents/workflows/studio-bespoke-hero-finalization.json`
3. `studio-bespoke-inception/brand-evolution-experience-blueprint.md`
4. `.agents/implementation-plans/studio-bespoke-founder-sticky-underlap-v2.md`
5. `studio-bespoke-next/app/concepts/living-threshold/page.js`
6. `studio-bespoke-next/app/concepts/living-threshold/living-threshold.module.css`
7. `studio-bespoke-next/app/concepts/living-threshold/founder-section.js`
8. `studio-bespoke-next/app/concepts/living-threshold/founder-section.module.css`
9. `studio-bespoke-next/app/concepts/living-threshold/threshold-scroll-media.js`
10. `studio-bespoke-next/app/concepts/living-threshold/threshold-smooth-scroll.js`
11. `studio-bespoke-next/hooks/useLenis.js`
12. `studio-bespoke-next/lib/motion.js`

Preserve unrelated modified and untracked files. Do not commit, push, deploy, install dependencies, or modify global configuration.

## 4. Current state and known defects

The current founder implementation already has:

- an opaque warm-paper panel with a desktop `-30svh` underlap;
- a desktop target of approximately 70svh;
- a reduced portrait cap of 320px wide;
- a `data-founder-content` ScrollTrigger marker;
- `gsap.matchMedia()` and static mobile/tablet fallbacks;
- a semantic `next/image` base portrait and decorative duplicate panel images;
- a working signature asset and About link.

The current audit found two defects that must be corrected in this pass:

1. The width-only desktop CSS query applies `-30svh` underlap to reduced-motion desktop users, covering the bottom 270px of the static hero at 1440×900.
2. At 1440×900, the shortened document ends before the `end: 'top 32%'` ScrollTrigger endpoint. The About link stops at approximately 81% opacity and remains translated.

The new portrait and typography direction must not reintroduce either defect.

## 5. Communication and motion thesis

### What the visitor should understand

“Studio Bespoke is personal because a real designer pays attention to how people live.”

### Motion ownership

- **Hero:** atmosphere, spatial threshold, and the existing three-copy room argument.
- **Paper underlap:** register change from room/world to founder/authorship.
- **Portrait aperture:** discovery of the person behind the work.
- **Heading:** listening unfolds in a deliberate reading order.
- **Body copy:** comprehension, not spectacle.
- **Signature:** authorship and credibility.

### Stillness comparison

A static portrait-and-copy spread would communicate the claim, but would not express the transition from room atmosphere to the person responsible for the work. The aperture is justified because it reveals the founder as a photographic subject in stages. The body copy does not need dramatic motion; its static fallback remains fully sufficient.

## 6. Scroll storyboard

| Beat | Scroll condition | What the user sees | Meaning | Motion |
| --- | --- | --- | --- | --- |
| 1. Room resolves | Final hero beat is readable | Completed room and `Realised in full.` | The studio can carry a project through completion. | Existing hero scrub. |
| 2. Paper takes position | Founder panel underlaps the final hero runway | Opaque warm paper rises over the room with a clean edge. | Atmosphere becomes authorship. | Ordinary document overlap; no extra pin. |
| 3. Person first appears | Founder content enters the lower viewport | A shallow portrait window reveals the face/eyes first. | Attention begins with the person. | Aperture opens downward; internal image drift begins. |
| 4. Sentence begins | Image is legible but not complete | `Personal` then `begins with` then `listening.` enters from one left origin. | Listening is a process, not a slogan. | Quiet masked line reveal. |
| 5. Full presence | Panel covers the majority of the viewport | Portrait expands to the complete founder image. | The person and practice are connected. | Aperture reaches full frame; image settles. |
| 6. Understanding | Portrait is stable | Body copy reveals in two clauses; identity and signature follow. | The visitor can read and trust the claim. | Clause-level ink exposure, then signature. |
| 7. Reverse | User scrolls upward | Full portrait closes back toward the face window; type returns to initial state. | Scroll remains controllable and reversible. | Exact scrub reverse. |

## 7. Desktop composition contract

Target conditions: desktop fine pointer and no reduced-motion preference, beginning at the project's existing desktop motion breakpoint.

### Panel geometry

- Keep the opaque warm-paper background and top edge from v2.
- Keep the `-30svh` underlap only inside a media query that includes both `pointer: fine` and `prefers-reduced-motion: no-preference`.
- Target `min-height: clamp(520px, 60svh, 550px)` or an equivalent content-safe range.
- Do not set a fixed height that clips content. If content exceeds the target, allow a measured expansion and report it.
- Keep the panel free of `overflow-y: auto` and nested scrollbars.
- Keep the top edge square and quiet; use only the existing hairline/shadow language.

### Portrait frame

- Use one semantic base portrait as the visible image layer.
- Replace the three duplicated clipped panels with one mask wrapper and one internal image transform.
- Target frame height approximately 330–360px at 1440×900.
- Preserve the 4:5 crop, face, hands, chair silhouette, and current image provenance.
- Keep decorative-only behavior hidden from assistive technology.

### Copy layout

- Preserve the headline, concise body copy, founder identity, signature, and About link.
- Keep body text at least 15px on desktop and maintain WCAG AA contrast.
- Tighten vertical gaps before shrinking type.
- Keep the headline as the primary left-side typographic mass; do not add a label or extra metadata block.
- If the current paragraph makes the target height impossible, split it into two semantic clause spans without changing its meaning or making unsupported claims.

## 8. Portrait aperture implementation

### Recommended structure

Keep the semantic `Image` and place it inside a dedicated mask frame:

```text
portraitField
└── portraitFrame
    └── portraitMask
        └── basePortrait (semantic next/image)
```

Do not create three full duplicate image layers for the aperture. The mask wrapper should own the clipping; the image should own the internal parallax.

### Starting state

- Mask reveals approximately the upper 25–30% of the frame.
- Image scale approximately `1.04`.
- Image y-offset approximately `-6%` (tune against the actual portrait crop).
- Image opacity remains 1 once the desktop motion context is active; the reveal comes from the mask, not a blank fade.

### Scrubbed state

- Mask expands downward to the complete frame.
- Image y-offset settles to `0%`.
- Image scale settles to `1`.
- Use linear or near-linear scrub for physical scroll correspondence.
- No bounce, spring, rotation, or 3D tilt.

### Meaning and pacing

The first visible area should privilege the founder's eyes/face. The full body should arrive after the face is recognized. This is the visual equivalent of “listen first, understand the whole person second.”

## 9. Typography and body-copy motion

### Heading

- Remove the current opposing left/right drafting offsets.
- Use one shared left-origin reveal for all lines.
- The line wrappers may use `clip-path`, overflow masking, or an equivalent CSS reveal.
- Keep movement restrained: a short horizontal exposure or a small upward settle, not a large travel.
- Stagger in reading order with a small interval, approximately 0.04–0.08 timeline units.
- Preserve full semantic heading text in the DOM at all times.

### Body copy

- Avoid per-word animation in the first pass.
- Split the paragraph into two natural clause spans only if required by the current markup.
- Reveal clause one, then clause two, with a soft left-to-right ink exposure or masked opacity change.
- A very restrained shadow edge may lead the reveal, but do not add a decorative blurred text duplicate.
- The copy must remain legible and available in the static fallback.

### Identity, signature, and link

- Founder identity: quiet opacity/translate resolution after body copy.
- Signature: preserve the left-to-right clip reveal as the authored seal.
- About link: resolve last, but guarantee it reaches its complete state at maximum document scroll.

## 10. ScrollTrigger timing contract

- Keep `gsap` and `ScrollTrigger` imported from `@/lib/motion`.
- Keep `gsap.matchMedia()` and a section-scoped `gsap.context()`; revert both in cleanup.
- Keep the actual content grid as the trigger, not the outer panel edge.
- Use `start: 'top 88%'` as the initial reference and tune from measured geometry.
- Move the endpoint earlier enough that it is always reachable at the bottom of the current page. A starting candidate is `end: 'top 38%'` or `end: 'top 40%'`; prove it at 1440×900 and 1280×800.
- Do not leave the final About link or signature partially resolved at maximum scroll.
- Verify forward and reverse scrub after Lenis settles.
- Do not create a second ScrollTrigger for hero media drift in this pass.

### Timeline starting values

These are starting values, not a reason to ignore viewport evidence:

1. `0.00–0.52` — portrait aperture expands and internal image settles.
2. `0.10–0.32` — `Personal` exposes from the left origin.
3. `0.20–0.42` — `begins with` exposes.
4. `0.30–0.52` — `listening.` exposes.
5. `0.46–0.68` — clause one and clause two resolve in reading order.
6. `0.68–0.84` — identity and signature resolve.
7. `0.82–0.96` — About link resolves completely.

The image is the dominant motion. Type and copy must be quieter and subordinate.

## 11. Responsive and accessibility contract

### Mobile and tablet

- At 900px and below, remove the underlap and use ordinary document flow.
- At 720px and below, hide the aperture animation and show the complete portrait in normal flow.
- Keep the full headline, body copy, identity, signature, and link visible.
- Preserve meaningful crop and avoid horizontal overflow.
- Do not force the desktop 58–61svh target on narrow screens; content determines height.

### Reduced motion

- The underlap must be disabled when `prefers-reduced-motion: reduce` is active.
- The hero and founder chapters must use ordinary flow with no overlap-dependent occlusion.
- The portrait must be fully visible without aperture travel.
- Heading, body copy, identity, signature, and link must be fully resolved.
- Live preference changes must cleanly rebuild the static state.

### Failure states

- If the portrait fails, text, identity, signature fallback behavior, and About link remain visible.
- If the signature fails, the rest of the founder content remains complete.
- No error handler may leave the section visually blank.

## 12. Files in scope

Expected modifications:

1. `studio-bespoke-next/app/concepts/living-threshold/founder-section.js`
   - replace three-panel markup with the aperture wrapper and semantic base image;
   - remove opposing line offsets;
   - add clause spans if needed;
   - update scroll timeline and reachable endpoint;
   - preserve matchMedia/context cleanup and failure handling.

2. `studio-bespoke-next/app/concepts/living-threshold/founder-section.module.css`
   - reduce desktop panel height and portrait frame;
   - implement mask and internal image positioning;
   - restrict underlap to fine-pointer/no-reduced-motion desktop;
   - preserve static compact/reduced-motion layouts.

3. `.agents/workflows/studio-bespoke-hero-finalization.json`
   - record v3 implementation and verification evidence only after the audit passes.

Do not modify `page.js`, `living-threshold.module.css`, `threshold-scroll-media.js`, `threshold-smooth-scroll.js`, `useLenis.js`, or hero copy unless a reproducible regression proves it is required. If a hero change is necessary, report the reason and exact scope before expanding the implementation.

## 13. Implementation order

1. Measure the current 1440×900 and 1280×800 founder panel, content grid, portrait, and maximum-scroll positions.
2. Remove the three decorative portrait panel layers and replace them with one mask wrapper.
3. Implement the face-first aperture and internal portrait parallax.
4. Remove opposing heading offsets and implement the shared left-origin line reveal.
5. Add clause-level body-copy reveal only if the existing paragraph markup needs it.
6. Reduce the desktop panel and portrait geometry.
7. Restrict underlap to the correct desktop motion media query.
8. Move the ScrollTrigger endpoint to a proven reachable position.
9. Verify the complete final state at document maximum scroll before tuning polish.
10. Verify reverse scrolling, live breakpoint changes, mobile, tablet, reduced motion, and image/signature failures.
11. Run lint, production build, JSON validation, and whitespace checks.
12. Return the required implementation report and stop for Codex audit.

## 14. Verification contract

### Structural checks

- No three-slice portrait layers remain.
- No `02 / The Studio` label or internal rule is reintroduced.
- No gradient transition is added.
- No word-by-word text library or new dependency is introduced.
- No second hero-media ScrollTrigger is added.
- No nested scrollbar exists inside the founder section.

### Desktop browser checks

At 1440×900 and 1280×800:

- panel height is within the approved target or any expansion is documented;
- portrait height is approximately 330–360px at 1440×900;
- the paper underlap remains visible and the hero stays beneath it;
- the face is the first portrait information revealed;
- the full portrait resolves without a jump or blank fade;
- heading lines reveal from one left origin in reading order;
- body clauses reveal calmly and remain readable;
- signature and About link reach fully resolved states at maximum scroll;
- maximum scroll does not strand the timeline before its endpoint;
- reverse scrolling restores the aperture and typography states;
- no new console errors or meaningful warnings appear.

### Responsive checks

- Live resize desktop → 375px → desktop without reload.
- Direct load at 375×812.
- Direct load around 768–900px.
- Compact modes have ordinary flow, complete content, meaningful crop, and zero horizontal overflow.

### Reduced motion checks

- Emulate reduced motion at desktop and mobile.
- Confirm no `-30svh` overlap.
- Confirm static hero and founder content are not occluded.
- Confirm all founder content is fully resolved.
- Toggle the preference live and confirm cleanup/rebuild.

### Failure checks

- Simulate portrait load failure and confirm copy/link remain.
- Simulate signature load failure and confirm the section remains usable.

### Commands

From `studio-bespoke-next`:

```powershell
npx eslint app/concepts/living-threshold/page.js app/concepts/living-threshold/founder-section.js app/concepts/living-threshold/threshold-scroll-media.js
npm run build
```

From the workspace root:

```powershell
git diff --check
Get-Content -Raw .agents/workflows/studio-bespoke-hero-finalization.json | ConvertFrom-Json | Out-Null
git status --short
```

## 15. Acceptance criteria

Accept only when all are true:

1. The portrait uses one semantic image inside one expanding aperture mask.
2. Internal image movement is subtle, reversible, and visually subordinate to the face reveal.
3. The current assembly-like three-panel motion is gone.
4. The heading reveals from a single reading origin and no longer implies pieces assembling.
5. Body copy uses a restrained clause-level reading reveal or a complete static equivalent.
6. Desktop panel target is approximately 520–550px at 1440×900, with no internal scrolling.
7. Portrait target is approximately 330–360px at 1440×900.
8. Underlap is disabled for reduced motion and non-desktop layouts.
9. The endpoint is reachable and the signature/link are complete at maximum scroll.
10. Mobile, tablet, reduced-motion, image failure, and signature failure states remain usable.
11. Existing hero media, Lenis, three copy beats, navigation, and arrival sequence remain intact.
12. ESLint, build, JSON parsing, and `git diff --check` pass.
13. No commit, push, deployment, dependency installation, or unrelated cleanup occurs.

## 16. Required implementation report

Return:

- changed files;
- exact mask geometry and internal image transform range;
- desktop panel and portrait heights at 1440×900 and 1280×800;
- ScrollTrigger start/end values and proof that the endpoint is reached at maximum scroll;
- heading/body reveal sequence and rationale;
- desktop forward/reverse verification;
- mobile/tablet/reduced-motion verification;
- failure-state verification;
- lint/build/JSON/diff-check results;
- any deviation from this plan;
- whether the optional dual-speed hero drift remains unnecessary after this aperture pass.

## 17. Delegation instruction

> Implement the approved plan at `C:\Users\godsw\ANTIGRAVITY  WORKSPACE\003\.agents\implementation-plans\studio-bespoke-founder-aperture-reveal-v3.md`. Read the entire plan and every authority file it names before editing. Replace the three-slice founder portrait motion with the single-image aperture reveal and subtle internal parallax. Implement the single-origin reading-direction typography and restrained clause-level body-copy reveal. Reduce the desktop panel to the approved target, fix the reduced-motion underlap bug, and make the final ScrollTrigger state reachable at maximum scroll. Preserve the existing hero, Lenis, copy beats, navigation, and unrelated work. Run every verification step. Do not commit, push, deploy, install dependencies, or modify global configuration. Return the required implementation report and stop for Codex review.
