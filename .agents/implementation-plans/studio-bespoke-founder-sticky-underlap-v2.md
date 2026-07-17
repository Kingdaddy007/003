# Studio Bespoke — Founder Sticky Underlap v2

**Status:** Approved for delegation  
**Decision type:** Type 2 — reversible presentation and timing refinement  
**Target route:** `http://127.0.0.1:3000/concepts/living-threshold`  
**Branch:** `codex/chatgptibeliveyou`  
**Supersedes:** The transition, height, label, and reveal-timing portions of `studio-bespoke-founder-authored-studio-v1.md`  
**Implementation owner:** Delegated Anti-Gravity CLI agent  
**Review owner:** Codex and the user

## 1. Objective

Replace the current gradient handoff with a physical **sticky underlap / paper-panel overtake**:

- the hero remains visually underneath;
- the warm-paper founder panel rises over it in normal vertical scroll;
- the panel edge becomes the demarcation;
- no gradient is used;
- the founder composition occupies approximately 70% of a standard desktop viewport;
- the portrait and typography begin animating only after their composition is visibly entering;
- the `02 / The Studio` label is removed;
- the founder section has no internal scrolling and does not become a second cinematic hero.

The communication job is to shift from atmospheric brand promise to founder proof. The motion should feel like a sheet, presentation board, or material sample being placed over the room—not a generic parallax trick.

## 2. Authority and required context

Read these files completely before editing:

1. `AGENTS.md`
2. `.agents/workflows/studio-bespoke-hero-finalization.json`
3. `studio-bespoke-inception/brand-evolution-experience-blueprint.md`
4. `.agents/implementation-plans/studio-bespoke-founder-authored-studio-v1.md`
5. `studio-bespoke-next/app/concepts/living-threshold/page.js`
6. `studio-bespoke-next/app/concepts/living-threshold/living-threshold.module.css`
7. `studio-bespoke-next/app/concepts/living-threshold/founder-section.js`
8. `studio-bespoke-next/app/concepts/living-threshold/founder-section.module.css`
9. `studio-bespoke-next/app/concepts/living-threshold/threshold-scroll-media.js`
10. `studio-bespoke-next/app/concepts/living-threshold/threshold-smooth-scroll.js`
11. `studio-bespoke-next/hooks/useLenis.js`
12. `studio-bespoke-next/lib/motion.js`

Preserve unrelated modified and untracked files. Do not commit, push, deploy, install dependencies, or alter global configuration.

## 3. Current state

The current implementation contains:

- a zero-height `heroToFounderTransition` element with a warm gradient;
- a founder section with `min-height: 100svh`;
- an internal animated architectural rule;
- the label `02 / The Studio`;
- a desktop portrait capped at 390px wide / 487.5px tall;
- a scrubbed founder reveal driven by the founder section's top edge;
- a responsive static fallback using `gsap.matchMedia()`;
- a working Lenis + ScrollTrigger hero and guarded video-seek system.

The user rejects the gradient, considers the founder chapter too tall, does not want the numbered studio label, and still experiences the founder reveal as starting before it can be properly seen.

## 4. Selected direction: Paper Panel Overtake

### Physical law

The hero is the room beneath. The founder chapter is an opaque warm-paper presentation board sliding over the room through ordinary page movement.

### Why this direction

- It creates an unmistakable section boundary without a gradient.
- It uses the existing sticky hero instead of introducing another pin.
- It connects atmosphere to authorship: room first, person responsible second.
- It reduces implementation and performance risk.
- It reverses naturally when the user scrolls upward.

### Motion tracks

- **Arrival:** unchanged hero entrance.
- **Scroll-bound:** existing hero scrub plus the founder's restrained portrait/type formation.
- **Transition:** ordinary document overlap; no autoplay and no separate pinned timeline.
- **Ambient:** none.
- **Interaction:** existing About link only.

## 5. Options considered

### Option A — Sticky underlap / panel overtake — selected

Use negative desktop block spacing so the founder panel enters during the final part of the hero's sticky runway. The opaque founder panel, with a clear top edge and higher stacking level, covers the hero from bottom to top.

**Gain:** strongest relationship with the least code.  
**Cost:** requires careful height and stacking calculations.  
**Reversibility:** high.

### Option B — Dual-speed hero-media drift — optional second pass only

During the overlap, move only the inner hero media upward approximately `3–5svh` while the paper panel travels normally. Use one small ScrollTrigger or quick setter.

**Gain:** stronger depth separation.  
**Cost:** another timeline can compete with video scrubbing and create decoder/perception problems.  
**Decision:** do not implement in the first pass. Report it as an available enhancement after Option A is reviewed.

### Option C — Clip-path paper curtain — rejected

Reveal the founder panel with a clip path while it is pinned.

**Reason rejected:** adds a second cinematic hold, increases page length, and conflicts with the request for a shorter chapter.

## 6. Scroll storyboard contract

| Beat | Scroll condition | User sees | Communication job | Transition |
| --- | --- | --- | --- | --- |
| 1. Hero resolution | Final hero copy is still readable | `Realised in full.` over the completed room | Complete the brand promise | Hero remains underneath |
| 2. Paper edge enters | Founder top edge reaches the lower viewport | A clean warm-paper plane covers the bottom of the room | Signal a shift from atmosphere to authorship | Sticky underlap |
| 3. Founder composition enters | Founder content grid becomes visibly available | Split portrait and offset headline are present but not already resolved | Make the reveal observable | Scrubbed convergence |
| 4. Authorship resolves | Paper covers most of the viewport | Portrait becomes whole; headline aligns; body and signature follow | Prove the personal claim | Calm editorial hold |
| 5. Reverse | User scrolls upward | Founder formation separates and paper exposes the room beneath | Preserve orientation and control | Exact reverse |

## 7. Desktop geometry

Target desktop conditions: viewport width above 900px, fine pointer, and no reduced-motion preference.

### Hero/founder overlap

- Remove the gradient transition element and all related CSS.
- Give the founder section an opaque `#e8e0d4` background and a higher stacking level than the hero.
- Apply an overlap of approximately `-30svh` to the founder section on qualifying desktop conditions.
- Use the existing sticky hero runway as the underlay. Do not add a new pin.
- Use a clean top edge: a 1px warm-ink border and, only if required for separation, one restrained solid shadow. Do not simulate a gradient with a large blurred veil.
- Keep square edges. Do not turn the chapter into a rounded app card.

### Founder height

- Target `min-height: 70svh` on desktop.
- The panel must remain content-safe; do not use a fixed `height: 70svh` that clips text.
- At 1440×900, target a rendered section height near 630px, with tolerance up to approximately 680px if font metrics require it.
- No internal `overflow-y: auto`, nested scrollbar, or scroll trap.
- Reduce vertical padding to approximately `28–40px` per side.

### Portrait

- Target a desktop portrait height of approximately `360–420px`.
- Preserve the 4:5 frame, founder's face, hands, chair silhouette, and current crop logic.
- A suitable starting cap is approximately `300–330px` wide.
- Keep the semantic `next/image` base portrait and the existing decorative slice system.

### Copy composition

- Remove the complete `02 / The Studio` paragraph and its animation selector.
- Remove the internal animated architectural rule; the panel's top edge becomes the demarcation and removing the rule recovers vertical space.
- Preserve the headline, concise founder body, identity, authentic signature, and About link.
- Tighten gaps rather than shrinking body text below readable sizes.
- Keep body copy at least 15px on desktop and preserve WCAG AA contrast.

## 8. Founder reveal timing

The current problem is caused by using the outer section boundary as the timing reference. The panel can enter while its actual portrait and typography are still too far below the viewport.

### Required timing model

- Add a stable marker such as `data-founder-content` to the actual editorial grid.
- Use the content grid—not the outer founder section—as the ScrollTrigger trigger.
- Recommended initial range:
  - `start: 'top 88%'`
  - `end: 'top 32%'`
  - `scrub: 0.24–0.32`
- Tune by measured geometry, not by guesswork.
- At the trigger start, the portrait/headline must be visibly entering and still near their initial state.
- The reveal must not be more than approximately 10% complete when the content grid first crosses the lower viewport edge.

### Recommended sequence

Use the existing visual grammar but compress it for the shorter panel:

1. `0.00–0.34` — portrait slices converge.
2. `0.12–0.42` — headline lines draft into alignment.
3. `0.32–0.50` — semantic portrait replaces the panel layers.
4. `0.46–0.68` — founder copy and identity resolve.
5. `0.66–0.84` — signature reveals.
6. `0.80–0.96` — About link becomes available.

These are starting values. The acceptance test is visibility, not numerical loyalty.

### Cleanup

- Continue using `gsap` and `ScrollTrigger` from `@/lib/motion`.
- Continue using both `gsap.context()` and `gsap.matchMedia()`.
- Revert all contexts and ScrollTriggers on cleanup and when media conditions change.
- Do not mutate or query the hero video timeline from the founder component.

## 9. Responsive and accessibility behavior

### Mobile and touch-first layouts

- At 720px and below, use ordinary document flow.
- Set overlap/margin to zero.
- Do not animate the portrait convergence.
- Keep all founder content visible and preserve the current static fallback.
- Let content determine height; do not force 70svh on mobile.
- Ensure no horizontal overflow.

### Tablet / intermediate widths

- Avoid overlap where the hero is not running its desktop sticky choreography.
- Prefer ordinary flow for widths 721–900px unless browser testing proves the underlap remains coherent.

### Reduced motion

- Use ordinary flow and a complete static founder composition.
- No overlap dependency, portrait convergence, parallax drift, or delayed copy.
- The hero poster, founder portrait, text, signature, and About link must all remain available.

## 10. Files in scope

Expected modifications:

1. `studio-bespoke-next/app/concepts/living-threshold/page.js`
   - remove `heroToFounderTransition` markup.

2. `studio-bespoke-next/app/concepts/living-threshold/living-threshold.module.css`
   - remove gradient transition styles.
   - preserve hero styling and scrub layout.

3. `studio-bespoke-next/app/concepts/living-threshold/founder-section.js`
   - remove the numbered Studio label.
   - remove the internal rule markup and its animation references.
   - add the content-grid trigger marker.
   - anchor/tune the founder timeline to visible content.

4. `studio-bespoke-next/app/concepts/living-threshold/founder-section.module.css`
   - implement the opaque paper-panel overlap and top edge.
   - reduce desktop height, padding, gaps, and portrait scale.
   - preserve mobile/static fallbacks.

5. `.agents/workflows/studio-bespoke-hero-finalization.json`
   - record implementation and verification evidence after the work passes.

Do not modify `threshold-scroll-media.js`, `threshold-smooth-scroll.js`, `useLenis.js`, or hero copy/timing unless a reproducible regression proves the underlap requires it. Report any such need before expanding scope.

## 11. Implementation order

1. Inspect current geometry at 1440×900 and record section, content-grid, and portrait bounds.
2. Remove the gradient element and styles.
3. Remove the numbered label and internal rule.
4. Implement the CSS-only desktop overlap and 70svh target geometry.
5. Verify the hero remains readable during the first overlap portion.
6. Re-anchor the founder timeline to the content grid.
7. Tune portrait and type timings only after measuring when they enter the viewport.
8. Verify reverse scrolling.
9. Verify desktop resize, mobile, tablet, and reduced motion.
10. Run lint, production build, and whitespace checks.
11. Update workflow evidence and return the implementation report.

## 12. Verification contract

### Structural checks

- No `heroToFounderTransition` element or gradient transition CSS remains.
- No `02 / The Studio` text remains in rendered DOM or source.
- No internal architectural rule consumes founder-section height.
- No new dependency, pin, canvas, WebGL, or scroll-snap system is introduced.

### Desktop browser checks

Test at 1440×900 and 1280×800:

- the warm-paper panel visibly rises over the hero;
- the hero remains underneath without a white/transparent seam;
- the final hero message remains readable before meaningful occlusion;
- the founder panel is approximately 70% of viewport height at 1440×900;
- the portrait is approximately 360–420px tall;
- there is no internal section scrollbar;
- portrait/type motion begins while the composition is visible;
- reverse scrolling restores the split/offset state and reveals the hero cleanly;
- fast forward/reverse scrolling does not leave opacity, transform, or pointer-event residue;
- browser console contains no new error or meaningful warning.

### Responsive checks

- Live resize from 1440px to 375px and back without reload.
- Direct load at 375×812.
- Direct load around 768–900px.
- No overlap, hidden content, clipped signature, or horizontal overflow on compact layouts.

### Reduced motion

- Emulate `prefers-reduced-motion: reduce`.
- Confirm ordinary flow, static portrait, visible copy, signature, and link.
- Confirm no overlap-dependent missing content.

### Commands

From `studio-bespoke-next`:

```powershell
npx eslint app/concepts/living-threshold/page.js app/concepts/living-threshold/founder-section.js app/concepts/living-threshold/threshold-scroll-media.js
npm run build
```

From the workspace root:

```powershell
git diff --check
git status --short
```

## 13. Acceptance criteria

The implementation is accepted only when all are true:

1. The gradient transition is completely removed.
2. The founder panel overtakes the hero as an opaque paper plane.
3. The overlap is achieved without a second pin or heavy animation system.
4. The founder section targets approximately 70svh on standard desktop.
5. The portrait is materially smaller and the full composition fits without internal scrolling.
6. `02 / The Studio` and the internal architectural rule are removed.
7. The portrait/type reveal begins after visible content entry, not before.
8. The effect reverses cleanly.
9. Mobile, tablet, and reduced-motion modes remain complete and static.
10. Existing hero video scrub, three copy beats, Lenis behavior, navigation, and opening sequence remain intact.
11. Lint, production build, and `git diff --check` pass.
12. Unrelated worktree changes remain untouched.
13. No commit, push, deployment, or dependency installation occurs.

## 14. Required implementation report

Return:

- changed files;
- exact desktop overlap value;
- rendered founder-section and portrait height at 1440×900;
- ScrollTrigger start/end and measured content-entry state;
- desktop forward/reverse verification;
- mobile/tablet/reduced-motion verification;
- lint/build/diff-check results;
- any deviation from this plan;
- whether optional dual-speed hero-media drift is still recommended after seeing the CSS-only underlap.

## 15. Delegation instruction

> Implement the approved plan at `C:\Users\godsw\ANTIGRAVITY  WORKSPACE\003\.agents\implementation-plans\studio-bespoke-founder-sticky-underlap-v2.md`. Read the entire plan and every authority file it names before editing. Implement Option A, the CSS-first sticky underlap/paper-panel overtake. Do not implement the optional dual-speed hero-media drift in the first pass. Remove the gradient, reduce the desktop founder chapter to the 70svh target, remove `02 / The Studio` and the internal rule, and anchor the founder reveal to visible content entry. Preserve all unrelated work and the approved hero behavior. Run every verification step. Do not commit, push, deploy, install dependencies, or change global configuration. Return the required implementation report and stop for Codex review.
