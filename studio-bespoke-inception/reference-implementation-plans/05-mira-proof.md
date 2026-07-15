# Section Plan — Mira / The Decisive Intervention

**Stable job:** Prove the structural decision and its effect on light, movement and family connection.  
**Current owner:** `components/ProofPinSection.jsx`  
**Recommended owner:** Refined `MiraProofSection`  
**Depends on:** Inherited Plan exit, licensed Mira wide image, exact press link

## Approved outcome

One constant architectural arch rises from the shaded plan and expands until the completed Mira room becomes spatially legible. Only then do two concise evidence states explain the wall removal and kitchen-centred social anchor. The chapter is the homepage's motion climax.

## Reference evidence

**Observed reference behaviour**

- R1 opens media through a central angular mask and later holds an artwork while surrounding meaning changes.
- R3 expands a small Process image to full frame with clean reverse behaviour.
- R5 uses one aperture as a stable orientation device while media and metadata change.
- R4 repeatedly lets one image become the next chapter's surface.

**Recommended Studio Bespoke adaptation**

- Keep the already-approved arch, not the references' triangles, circles or rectangles.
- Use the arch once to move from plan to real proof.
- Hold the room long enough to read two facts; do not turn it into a gallery.

**Implementation inference**

- GSAP + ScrollTrigger remains justified because the arch, inverse-scaled media shell and evidence timing must share one reversible playhead.
- The existing scale/inverse-scale technique is structurally sound and should be refined rather than replaced.

## Preserve

- One constant arch geometry.
- Real Mira wide image currently prototyped with `SBD_Mira_K14-scaled.jpg`, pending licensing/crop approval.
- Desktop-only pin and reverse-safe scrub.
- Two evidence states: walls removed; island/social anchor.
- Marie Claire confirmation as subordinate proof.
- No fabricated before state and no unrelated room cycling.

## Change

1. Give the timeline explicit reading phases rather than very short 0.1-duration caption flashes.
2. Replace `end: '+=140%'` with a function-derived scroll distance based on viewport height, approximately `1.4 * innerHeight`, then tune in the browser.
3. Keep the arch's border-radius constant in every state. Only `translate` and uniform `scale` change.
4. Reduce or remove the continuously pulsing annotation rings; they compete with architectural proof.
5. Make the Marie Claire source a real accessible link with exact publication title.
6. Ensure header contrast without relying only on broad text shadows.
7. Make mobile/reduced content order explicit instead of depending on desktop hidden states being overridden.
8. Keep all evidence text in semantic DOM outside the mask.

## Content hierarchy

### State 1 — Structural release

- Label: `Mira Villa / The Decisive Cut`
- Heading: `Internal walls removed.`
- Body: Opening the central partitions connected kitchen, dining and living into one ground-floor relationship, changing how light and movement travelled through the home.
- Optional marker: `Plan opened / Kitchen, dining and living connected.`

### State 2 — Lived consequence

- Label: `The heart open`
- Heading: `The island as social anchor.`
- Body: The island supports the client's baking routine while cooking, conversation and gathering remain in the same shared space.
- Source: `Independent confirmation / Marie Claire Maison`

Do not add a third state unless it introduces distinct, verified proof that cannot belong in Rituals.

## Composition

- Initial aperture: centred, portrait-like arch occupying approximately 35–45% viewport width and 55–70% viewport height.
- Final aperture: overscans viewport edges; its shape does not appear to morph because the edge has simply moved beyond view.
- Image shell inverse-scales so room geometry does not balloon with the mask.
- Final image crop must preserve the kitchen-to-living relationship and social island.
- Evidence rail sits on a quiet edge protected by a localized overlay; it must not cover island, threshold or circulation path.
- Markers are secondary and must correspond to visible features at the selected crop.

## Motion contract

### Communication job

Show the release created by one structural decision, then explain it.

### Why motion is better than stillness

The plan-to-room aperture creates a truthful conceptual transition from architectural problem to completed spatial evidence. The motion does not simulate demolition.

### Desktop playhead

| Progress | Responsibility |
| --- | --- |
| 0.00–0.14 | Arch enters from below and reaches initial reading position |
| 0.14–0.38 | Arch scales uniformly to viewport overscan; image shell inverse-scales |
| 0.26–0.44 | Image crop shifts subtly toward the island; no unrelated movement |
| 0.38–0.50 | Room holds with minimal overlay; visitor reads the space before copy |
| 0.50–0.68 | State 1 appears and holds |
| 0.68–0.76 | State 1 transfers out; avoid simultaneous unreadable overlap |
| 0.76–0.94 | State 2 and press source appear and hold |
| 0.94–1.00 | Stable final room before release to Rituals |

- `scrub` may use restrained smoothing around 0.4–0.6 seconds.
- Pin begins only when the proof section reaches the viewport top.
- All states reverse in the exact opposite order.
- No time-based media plays independently of scroll.

## Optional film gate

The current still is the approved base. A film/frame sequence may replace it only if all are true:

1. Rights-cleared Mira source still exists.
2. The clip preserves exact geometry and materials.
3. Camera move is reverse-safe.
4. Frame sequence makes the kitchen/living opening clearer than the still.
5. Poster, mobile and reduced-motion fallbacks are complete.
6. Performance prototype passes.

If any condition fails, keep the still. No implementation plan should assume the film exists.

## Mobile

```text
full-width Mira room figure
state 1 label/heading/body
state 2 label/heading/body/source link
```

- No pin, aperture scale, inverse media shell or annotation hotspots.
- Use a crop selected specifically for narrow screens; if the relationship cannot survive the crop, use an alternate Mira image rather than forcing `object-position`.
- Keep source link visible.

## Reduced motion

- Same as mobile ordinary flow at every viewport.
- A static arch-shaped crop is optional only if it does not reduce proof clarity; full rectangular room image is preferred.

## Accessibility

- Proof image has accurate alt text describing the connected kitchen, dining and living relationship.
- Decorative aperture is hidden from assistive technology.
- Both evidence states remain in DOM and reading order. Do not expose overlapping duplicate text during animation.
- Annotation markers are optional enhancement. If interactive, they need buttons, focus states and non-hover access; if redundant, keep them decorative and `aria-hidden`.
- External source link announces publication and opens according to normal user expectation.

## Performance

- One image in the proof base implementation.
- Preload only its responsive desktop candidate shortly before the section; mobile uses the correct smaller crop.
- Avoid large backdrop blur. Use a localized gradient/solid veil.
- Transform the aperture, inverse shell and image; do not animate width/height on every frame.
- Refresh measurements after fonts and required image decode, not on every resize event.

## Build steps

1. Move proof copy and source into the central content module.
2. Confirm image rights, dimensions, focal point and desktop/mobile crops.
3. Preserve one arch CSS geometry and inverse-scale media shell.
4. Rebuild timeline with explicit spatial and reading phases.
5. Add semantic source link and simplify markers.
6. Implement ordinary-flow mobile/reduced version first.
7. Add desktop enhancement through `gsap.matchMedia()`.
8. Verify reverse scroll at slow, fast and oscillating input speeds.
9. Verify header contrast and transition into Rituals.

## Acceptance criteria

- Visitor can describe what changed after one pass.
- Arch does not visibly morph.
- Room becomes legible before evidence copy appears.
- Both evidence states receive a usable reading interval.
- Reverse scroll restores every prior state cleanly.
- No image from another project appears.
- No fake before/demolition state appears.
- Mobile/reduced motion contain complete proof without animation.
- Navigation and Enquire remain reachable throughout the pin.

