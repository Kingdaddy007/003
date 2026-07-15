# Section Plan — Opening / Belief

**Stable job:** Establish that design begins with the life inside the plan.  
**Current owner:** `components/Preloader.jsx` + empty `HeroSection.jsx`  
**Recommended owner:** `OpeningPlanStage` + `OpeningSection`  
**Depends on:** Shared Foundation, confirmed blueprint asset and brand mark

## Approved outcome

The visitor arrives inside a quiet architectural plan, reads the controlling belief, and gains access to the page quickly. The sequence feels authored but never behaves like loading theatre.

The exact controlling line remains:

> A home becomes personal when its plan begins to recognize the life inside it.

## Reference evidence

**Observed reference behaviour**

- R4 reveals a whole scene through one vertical-line language and carries the hero image into the next chapter.
- R5 evolves one aperture from loader into interface rather than discarding the opening device.
- R6 introduces a small brand mark, then allows architectural media and copy to settle before the first scroll.
- R1 expands a central aperture but then relies on media atmosphere.

**Recommended Studio Bespoke adaptation**

- The blueprint is both arrival and continuity plane; it persists into The Inherited Plan.
- The opening visual event is the plan becoming legible, not a logo performance or room showreel.
- One restrained light sweep may cross the plan because light is part of the spatial argument.

**Implementation inference**

- The current MP4/SVG fallback and GSAP arrival timeline are sufficient.
- A single shared wrapper can keep the plan plane fixed while two semantic sections pass over it.

## Preserve

- `blueprint_draft.mp4` with inline SVG fallback.
- Approved controlling line and `Studio Bespoke Design — Dubai` attribution.
- Lower-left copy posture.
- Delayed header reveal after the first visual state is legible.
- Desktop anchored handoff and static mobile/reduced-motion alternative.
- No finished-room hero reel.

## Change

1. Rename the conceptual role from “Preloader” to “Arrival” even if the component filename changes later.
2. Make the controlling line the page `h1`; it is currently a paragraph.
3. Avoid a long blank wait. The static plan and copy must render before video readiness is known.
4. Cap the authored arrival. Target content legibility within roughly 1.2–1.6 seconds and release scroll within roughly 2.4–2.8 seconds; tune in browser rather than treating these values as immutable.
5. Scope word targets with refs instead of the global selector `.preloader-mantra .word`.
6. Replace the logo asset only after a correct local mark is supplied; do not load the known typo-bearing remote file.
7. Integrate the empty hero spacer into a semantic Opening section or shared stage.
8. The “Enter” control may remain, but scrolling must work without activating it.

## Remove or reject

- Percentage counters, changing portrait montage, logo scaling, showreel footage, giant brand typography and a black-to-white agency reveal.
- Blur-heavy word-by-word animation. If words reveal individually, keep blur at zero or nearly imperceptible; the blueprint already carries the event.
- A loader that waits for all later project assets.
- Decorative sunbeam intensity that reads as a CSS gradient rather than daylight.

## Structure

```text
OpeningPlanStage
  PlanMedia
    video (muted, playsInline, poster)
    svg fallback
  PlanRegisterOverlay
  OpeningSection
    h1
    studio/location label
    enter cue
  InheritedPlanSection
```

The shared plan media is a sibling of both semantic sections. It must not be duplicated inside each section.

## Visual composition

- Plan fills the viewport but remains lighter than the headline.
- Headline occupies a deliberate lower-left text-safe zone, maximum readable measure approximately 10–13 words per line depending on viewport.
- Header appears at the page edge after the first read; it must not compete with the headline.
- Scroll cue remains bottom-right or along the lower edge and uses text plus a simple line, not a floating pill.
- The plan should feel technically credible. Do not add extra linework solely to fill empty areas.

## Motion contract

### Communication job

Reveal that the home is understood first as a plan shaped around life.

### Why motion is better than stillness

A short drawing/light arrival turns a technical plan into the threshold of the story. After that threshold, stillness is sufficient.

### Arrival timeline

Suggested normalized sequence:

| Progress | Event |
| --- | --- |
| 0.00–0.18 | Static paper/plan base already visible; no blank screen |
| 0.10–0.48 | Video opacity settles **or** SVG clip reveals left-to-right |
| 0.20–0.55 | One low-opacity light sweep crosses the plan |
| 0.42–0.78 | `h1` resolves as one or two restrained groups |
| 0.62–0.88 | Studio/location label and cue appear |
| 0.78–1.00 | Header becomes available; body scroll unlocks |

Do not serialize every event. Overlap creates a shorter, more confident arrival.

### First scroll response

- Copy and cue clear upward by a restrained distance.
- Plan remains fixed and gradually enters the shaded register required by The Inherited Plan.
- Header stays available.
- No Z-axis zoom and no panel edge.

## Loading and resilience

1. Render SVG and copy in the server/static output.
2. Treat video as progressive enhancement; hide it until it can play without flashing.
3. Use the poster/static plan immediately.
4. If video is not ready within a short threshold, complete the arrival with SVG and never switch mid-read.
5. Remove body scroll lock in every success, fallback, error and unmount path.
6. Pause and unload the video after the shared plan stage is no longer visible if it is not reused.

## Mobile

- Render the static plan at a crop that preserves recognisable architectural lines.
- Keep the full `h1` visible without staged word animation.
- Show header/menu immediately or after a very short opacity transition.
- No scroll lock beyond the first paint.
- Opening and Inherited Plan become two ordinary stacked sections over coordinated static backgrounds.

## Reduced motion

- No clip sweep, light travel, word travel or animated cue.
- Static plan, `h1`, label and navigation are visible immediately.
- The plan may change tone between sections through an instantaneous style change or short non-travelling opacity crossfade.

## Accessibility

- `h1` is real text and first in the page heading hierarchy.
- Video is decorative: muted, no audio, `aria-hidden`, no essential content.
- SVG is decorative when the `h1` supplies meaning; use `aria-hidden="true"`.
- Enter cue is a button only if it performs an action; otherwise use a non-interactive instruction.
- Do not hide the page from assistive technology during visual loading.

## Performance

- First viewport contains only the blueprint media system and typography.
- Provide poster dimensions and avoid layout shift.
- No second autoplay video, canvas or image sequence.
- Animate transforms, clip-path and opacity only.
- Test low-power mobile with video disabled.

## Build steps

1. Create semantic `OpeningPlanStage` structure with static SVG base.
2. Move approved copy into `h1` and content data.
3. Render Inherited Plan inside the same stage.
4. Rebuild arrival timeline using scoped refs and overlapping phases.
5. Add video enhancement and timeout/error handling.
6. Wire header reveal without making header visibility depend permanently on video completion.
7. Add mobile and reduced-motion base states.
8. Verify arrival, reverse scroll and unmount cleanup.

## Acceptance criteria

- No blank screen lasts beyond first paint.
- `h1` is readable before animation completion.
- Scroll always unlocks, including failed video and reduced motion.
- The same plan plane visibly continues into The Inherited Plan.
- Header and Enter cue are keyboard operable.
- No logo animation, portrait loader or room showreel appears.
- The first meaningful interaction is available within approximately 2.8 seconds on a normal desktop connection and immediately in reduced motion.

