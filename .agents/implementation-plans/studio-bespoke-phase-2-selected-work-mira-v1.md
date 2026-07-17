# Studio Bespoke — Phase 2: Selected Work and Featured Mira v1

**Status:** Direction and implementation plan; begins only after Phase 1 approval.

**Scope:** Selected Work title → finite gallery → depth bridge → Mira blueprint → finite multi-room Mira story.

**Approval gate:** Complete Selected Work first, stop for review, then complete Mira, and stop again.

## Diagnosis

The current Selected Work and Mira implementation has five specific failures:

1. The first project aperture can be completely blank because its clip begins at `yPercent: 100`; this reads as a missing image.
2. Selected Work has no proper chapter introduction on enhanced desktop, so it appears to be the lower half of Services.
3. The dark background and excessive empty field make the gallery feel unfinished rather than intentionally spacious.
4. The last Zulal image expands under `One project, in depth.` even though that image is not Mira. The transition promises one project while showing the wrong project.
5. Mira uses a soft proof still, a heavy veil, and too much explanatory copy. The completed space should become clearer and should lead into several project views.

## Part A — Selected Work repair

### Chapter identity

Selected Work begins only after the warm-paper introduction defined in Phase 1. Its gallery is a new dark room, not a continuation of Services.

- Gallery background: the shared ink `#171a17`.
- Aperture background while loading: `#171a17`, never a second off-black rectangle.
- Rails use ivory and muted stone tones derived from the shared tokens.
- Keep one dominant project image at a time.

### Asset selection gate

Do not select final images from filenames alone. Before changing animation:

1. Generate a local contact sheet from every candidate project family in `portfolio_gallery.md`.
2. Score candidates for:
   - genuine Studio Bespoke provenance;
   - architectural depth and clear focal point;
   - useful desktop and mobile crops;
   - visual distinction from adjacent projects;
   - adequate resolution;
   - no duplication with the hero or Mira;
   - successful decode and local file integrity.
3. Present the winning four-image set for approval before motion tuning.

Recommended project families remain:

- Murooj Al Furjan 2 — residential whole-home breadth.
- Cornelias Innovation Hub — workplace/commercial range.
- The Strand Cafe — hospitality and material atmosphere.
- Zulal The Lakes 2 — quiet residential resolution.

These names are a shortlist, not a locked image choice. Mira and Damac Hills remain excluded because they already own other homepage chapters.

### First-frame repair

- Preload and decode the first project image as the visitor approaches the title threshold.
- The first aperture must begin with at least `75–85%` of the image visible; it may complete a restrained reveal after entry.
- Never initialize the first clip fully outside the aperture.
- Provide an `onError` fallback surface and log the failed asset path in development.
- The first semantic project title and image remain present without JavaScript.

### Gallery composition

- Desktop stage: one finite four-project procession.
- Left rail: `Selected Work`, project name, verified category, one short visual observation, direct project link.
- Media aperture: approximately `72–78vw × 72–80svh`, tuned so empty space frames rather than swallows it.
- Right rail: calm `1 / 4` progress.
- Increase image authority on 1024–1280px widths; do not preserve desktop gutters mechanically.
- Do not overlay routine copy on the images.

### Motion

Keep the directional parallax principle but reduce its theatricality:

- clipping frame enters first;
- inner image follows with 8–12% resistance;
- outgoing image moves slightly and darkens;
- metadata transfers only after the new image is legible;
- every image receives a readable hold;
- no transition exposes the stage background as a blank image.

Mobile and reduced motion use four ordinary project figures with no pinned choreography.

## Part B — Correct bridge from range to depth

### Remove

- Remove the Zulal full-screen zoom under `One project, in depth.`
- Remove `Next / Featured project` over a non-Mira photograph.
- Do not crossfade from Zulal directly into a Mira room while the Zulal project identity remains visible.

### Recommended bridge — The Drawing Line

1. Zulal completes its final hold.
2. Its rails and image withdraw fully.
3. The dark stage gives way to a warm-paper field.
4. `One project, in depth.` appears as a clean centered typographic beat with no photograph behind it.
5. A fine architectural line extends from the heading field and becomes the first visible line in the Mira blueprint frame.
6. The title withdraws; the Mira blueprint takes the entire viewport and begins responding to scroll.

If the line correspondence cannot be made credible, use a simple paper-to-blueprint crossfade. Do not invent a complex morph that the source footage cannot support.

## Part C — Featured Mira redesign

### Narrative job

Selected Work proves range. Mira proves sustained attention. The Mira chapter should feel like entering one project, not reading a case-study article.

### Content hierarchy

Keep only:

- eyebrow: `Featured Project`;
- heading: `Mira Villa`;
- optional category/location only when verified;
- three very short room labels synchronized to the room sequence;
- direct link: `View the complete project`;
- optional small Marie Claire Maison credit/link at the final state.

Remove the current paragraphs beginning `From architectural intention…`, `Opening the central partitions…`, and `The island supports…` from the visual sequence. Preserve any useful verified facts in accessible project-link metadata or a later project page, not as large overlaid copy.

### Media sequence

1. **Blueprint:** existing six-second film scrubs with scroll, using guarded seeking.
2. **Resolution:** the film settles at its strongest completed drawing frame.
3. **Room reveal:** crossfade to a sharp, high-resolution Mira hero view with matching geometry where possible.
4. **Room procession:** three verified Mira images move upward through a finite bottom-to-top parallax sequence.
5. **Release:** final image holds quietly before Approach / Trust enters.

The room sequence is inspired by infinite parallax but is not infinite. It contains exactly three or four images, reverses cleanly, and releases the visitor.

### Image roles to select from the official Mira families

- Establishing kitchen/island view.
- Connected living or threshold view.
- One close material/detail view or secondary room.
- Optional bedroom/quiet-space contrast.

Use the high-resolution official `SBD_Mira_*` sources after rights/provenance confirmation. Replace the soft `mira-proof.webp` as the visible hero if a sharper original exists. Generate desktop and mobile crops deliberately; do not solve composition with `object-fit: cover` alone.

### Text behavior

- Room labels appear in one protected edge zone and never cover the principal furniture or openings.
- Examples of format, not final unverified copy:
  - `Kitchen / The social centre`
  - `Living / Open connection`
  - `Private rooms / A quieter register`
- Each label exits before the next image takes focus.
- No broad dark gradient. Use a small localized scrim only when contrast requires it.

### Choreography

| Progress | Visual responsibility |
| ---: | --- |
| 0.00–0.24 | Blueprint scrubs forward; only project identity is present |
| 0.24–0.34 | Drawing resolves and pauses |
| 0.34–0.46 | Sharp completed room replaces the drawing |
| 0.46–0.60 | First room holds; label one appears briefly |
| 0.60–0.74 | Second room rises bottom-to-top with slower inner-image drift |
| 0.74–0.88 | Third room rises and label changes |
| 0.88–1.00 | Final room holds; project and publication links become available |

- One section timeline owns the film and room procession.
- No autoplay; scroll controls the playhead.
- No second Lenis instance.
- Stop decoder seeking while offscreen.
- Mobile: static hero plus a vertical three-image project edit; no frame-accurate video scrub.
- Reduced motion: drawing poster, completed room, and three static figures.

## Transition to the remaining homepage

Mira ends on a clear room. Approach / Trust enters on warm paper from ordinary document flow. The transition should feel like leaving visual proof and arriving at the working relationship. Do not add a third pinned handoff.

## Verification and stop gates

### Selected Work gate

- First image is visible on first entry, refresh, and reverse scroll.
- All four project images load and have valid local fallbacks.
- Section has its own title threshold and does not visually merge with Services.
- No blank aperture, horizontal overflow, overlapping rail copy, or clipped project link.
- Stop for user review.

### Mira gate

- Zulal never appears behind the Mira introduction.
- The depth heading is image-free or already visibly transitioning into the Mira blueprint.
- Blueprint scrubs forward and backward without black frames.
- The completed room is sharp and not buried under a broad veil.
- Three project views advance with concise synchronized labels.
- Mobile and reduced-motion preserve the complete project story.
- Stop for user review before Phase 3.
