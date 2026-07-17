# Studio Bespoke — Featured Project / Mira Restoration v1

**Status:** Implementation-ready restoration plan

**Homepage chapter:** 05 — Featured Project / Depth

**Journey job:** Range → Depth

**Visitor belief:** Studio Bespoke does not merely compose beautiful rooms; it can reorganize a home around light, movement, and gathering.

## Restoration decision

Restore the earlier Mira proof system as a **below-fold featured project**, not as the homepage hero. Reuse its strongest existing assets and logic, but do not paste the old page wholesale.

Recoverable sources already present in repository history:

- `24ff570:studio-bespoke-next/components/MiraProofSection.jsx`
- `24ff570:studio-bespoke-next/public/images/projects/mira/mira-proof.webp`
- `24ff570:studio-bespoke-next/public/images/projects/mira/mira-island.webp`
- `24ff570:studio-bespoke-next/public/images/projects/mira/mira-threshold.webp`
- `24ff570:studio-bespoke-next/public/images/projects/mira/mira-storage.webp`
- `24ff570:studio-bespoke-next/public/images/projects/mira/mira-coffee.webp`
- current `studio-bespoke-next/public/blueprint_draft.mp4`
- current guarded seek pattern in `threshold-scroll-media.js`

Recover files with targeted `git show <revision>:<path>` or equivalent non-destructive extraction. Do not reset, checkout, or restore unrelated files from the historical snapshot.

## Visual thesis

**Range resolves into one decisive case.**

Selected Work proves breadth. Mira slows the page down and proves depth. The project begins as an architectural drawing/film within the gallery's final frame, then the completed room takes over the viewport. Two concise evidence beats explain the physical decision and its lived consequence.

## Content hierarchy

### Orientation

- Eyebrow: `Featured Project`
- Project: `Mira Villa`
- Location/type only if verified in the evidence dossier.

### Evidence state 1

- Label: `The decisive intervention`
- Heading: `Internal walls removed.`
- Body: `Opening the central partitions connected kitchen, dining and living into one ground-floor relationship, changing how light and movement travelled through the home.`

### Evidence state 2

- Label: `The lived consequence`
- Heading: `The island as social anchor.`
- Body: `The island supports the client's baking routine while cooking, conversation and gathering remain in the same shared space.`
- Source: accessible link to the exact Marie Claire Maison feature after its URL and wording are verified.

Do not add invented measurements, before images, demolition claims, or a third text state without new evidence.

## Composition

- Desktop is one full-viewport pinned scene with a longer scroll distance, approximately `220–260svh` including the incoming handoff.
- Mira media is the primary focal point. Evidence copy occupies a protected edge and never covers the island or the kitchen-to-living connection.
- The drawing film and completed room share one frame geometry so the change reads as plan → lived space, not video → unrelated photograph.
- Use a localized dark veil behind copy only; preserve the room's natural light and material contrast.
- Remove pulsing annotation rings. If annotations remain, use one quiet line/marker tied to a clearly visible feature.

## Media choreography

### Track separation

- **Scroll-bound:** blueprint film current time, film-to-room crossfade, room settle, evidence states.
- **Ambient:** none.
- **Arrival:** owned by the Selected Work handoff only.
- **Interaction:** project/source links only.

### Desktop playhead

| Progress | Responsibility |
| ---: | --- |
| 0.00–0.10 | Receive the full-viewport frame from Selected Work; display the first blueprint-film frame. |
| 0.10–0.32 | Scrub the blueprint film forward with guarded `requestAnimationFrame` seeking. No evidence copy yet. |
| 0.32–0.42 | Film pauses at its strongest resolved drawing; completed Mira room begins a matched crossfade. |
| 0.42–0.52 | Completed room reaches full visibility and settles with a 3–5% crop correction. Hold without copy. |
| 0.52–0.70 | Evidence state 1 reveals and holds. |
| 0.70–0.78 | State 1 exits completely. |
| 0.78–0.94 | Evidence state 2 and press source reveal and hold. |
| 0.94–1.00 | Stable final room before release into Approach / Trust. |

- `scrub: 0.45–0.65`, tuned through browser sampling.
- Reverse scroll must reverse the film and evidence sequence without black frames or overlapping text.
- The film must stop seeking when the section is offscreen.
- Keep the existing seeking guard: update `video.currentTime` only when the decoder is not already seeking, with bounded interpolation toward the target.

## Still-image fallback

If `blueprint_draft.mp4` is not visually the correct Mira source, fails correspondence with the final room, or performs poorly, do not force it. Use the earlier constant-arch still treatment from `MiraProofSection.jsx`:

1. a static plan/drawing state;
2. one constant aperture expands uniformly;
3. `mira-proof.webp` becomes the completed room;
4. evidence states follow after the room is legible.

The fallback is a first-class approved route, not an error screen.

## Transition from Selected Work

- Selected Work expands its final frame to full viewport and crossfades to the first Mira poster frame.
- Mira takes control only after the frame is stable.
- Do not stack two simultaneous pins. The outgoing Selected Work timeline must release before Mira's pin begins.
- Use a one-pixel overlap or shared background color if necessary to eliminate a flash, not a large negative margin.

## Transition to Approach / Trust

The completed Mira room remains still as the final evidence copy withdraws. A warm paper/stone field then rises from the bottom as an ordinary next section, echoing a material sample laid over a photograph. This is a short section-native transition, not the hero's earlier underlap and not another directional project slide.

Approach owns the rising field. Mira exposes a stable final room and releases its pin cleanly.

## Mobile

- No pin and no frame-accurate video scrubbing.
- Use the strongest Mira room still first.
- Follow with two semantic evidence articles and the press link.
- The blueprint film may appear as a muted, user-controlled video only if it adds clarity; otherwise omit it.
- Preserve the kitchen/island relationship with a mobile-specific crop or alternate Mira image.

## Reduced motion

- Static completed-room figure plus both evidence states in ordinary flow.
- No scrub, crossfade dependency, aperture scaling, or transformed copy.
- Keep the press source reachable.

## Accessibility

- One semantic section and one `h2` for Mira; evidence state 2 uses an `h3`.
- Video is decorative when the same information exists in text and the completed image; hide it from assistive technology.
- Completed room has accurate alt text describing the connected kitchen, dining, and living relationship.
- All evidence remains in DOM order. Enhanced desktop visibility must not create duplicate spoken content.
- The external press link uses exact publication naming and normal link behavior.

## Performance

- Confirm MP4 duration, dimensions, codec, seekability, and poster before enabling scrub.
- Preload metadata/poster, not the entire film at page load.
- Prefetch the film only as the visitor approaches Selected Work's final beat.
- Use local optimized images restored from history; provide intrinsic sizes through `next/image`.
- Only the film, one completed-room image, and current evidence state should be actively composited.
- Stop requestAnimationFrame work and decoder seeking outside the section.

## Implementation ownership

- Add:
  - `studio-bespoke-next/app/concepts/living-threshold/featured-mira-section.js`
  - `studio-bespoke-next/app/concepts/living-threshold/featured-mira-section.module.css`
- Mount after `SelectedWorkSection` in `page.js`.
- Reuse `@/lib/motion` and extract the guarded-seek utility only if both hero and Mira need the same behavior with identical contracts. Otherwise keep explicit local implementations to avoid premature abstraction.
- Restore only required assets from `24ff570`; preserve all unrelated current work.

## Verification matrix

- Confirm media origin → target time mapping → guarded seek → decoded frame → visible video.
- Confirm Selected Work release completes before Mira pin starts.
- Confirm room image is fully visible before evidence state 1 appears.
- Sample progress at 0.00, 0.10, 0.32, 0.42, 0.52, 0.70, 0.78, 0.94, and 1.00 in both directions.
- Test slow wheel, fast wheel, trackpad oscillation, direct refresh mid-pin, tab background/foreground, resize, and reduced motion.
- Confirm no black frame, stuck `seeking`, text overlap, pin jump, horizontal overflow, or unreachable next section.

## Acceptance criteria

- A viewer can explain the Mira intervention and its lived consequence after one pass.
- The drawing/film and final room feel like one project and one transformation.
- The room receives a silent visual hold before copy appears.
- Both evidence states have readable dwell time and never overlap.
- Reverse scroll returns to the drawing without decoder flooding.
- Mobile and reduced motion preserve the complete proof without the cinematic mechanism.
- Approach / Trust remains reachable and begins without a blank seam or double pin.
- Lint, production build, browser console, media timing trace, desktop/mobile/reduced-motion, and performance checks pass.
