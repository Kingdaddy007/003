# Section Plan — The Method Travels / Supporting Work

**Stable job:** Prove that Studio Bespoke's judgment works at different scales without flattening the portfolio into equal cards.  
**Current owner:** None  
**Recommended owner:** `SupportingWorkSection`  
**Depends on:** Licensed Zulal and Desert Leaf image sets and exact project facts

## Approved outcome

Two concise project chapters show the same core intelligence responding to different inherited conditions: working with an existing material language at Zulal, and turning a former service room into a self-contained guest studio at Desert Leaf.

## Reference evidence

**Observed reference behaviour**

- R3 uses art-directed image groupings and variable negative space instead of generic masonry.
- R6's Featured Projects list attaches precise project/product metadata to large architectural proof.
- R4 keeps one colour or image relationship across scene handoffs rather than resetting the design for every card.
- R2 demonstrates image isolation but relies on hover.

**Recommended Studio Bespoke adaptation**

- Use two asymmetric case chapters, each with one dominant image, one supporting detail and one exact decision narrative.
- Preserve the mineral page register and caption cadence from Rituals.
- Let the cases feel related but not mechanically identical.

**Implementation inference**

- Ordinary CSS grid/document flow is sufficient.
- Route transitions, filtering and hover previews belong to a future Work index, not this homepage section.

## Case 01 — Zulal / Working with what remains

**Evidence-backed premise:** The intervention works with inherited grey slate rather than erasing it; bathroom material decisions include microcement and brushed brass.

Suggested hierarchy:

```text
01 / Zulal — The Lakes
Working with what remains.
Inherited condition: existing grey slate
Design response: joinery/styling/material intervention that turns the retained condition into part of the composition
supporting note: microcement + brushed brass, only if shown by the selected asset
```

Required visual set:

- one wide image that establishes the room and retained condition;
- one detail that proves the joinery or material response;
- no Mira image and no duplicate project route treated as another project.

## Case 02 — Desert Leaf / Making a room self-contained

**Evidence-backed premise:** A former maid's room becomes a self-contained guest studio through joinery, light, neutral tones and spatial efficiency.

Suggested hierarchy:

```text
02 / Desert Leaf — Al Barari
Making a room self-contained.
Inherited condition: a small service room
Design response: storage, light and compact planning create an independent guest space
```

Required visual set:

- one image that communicates the compact room as a whole;
- one joinery, storage or threshold detail;
- captions that do not imply a paired before image unless one is supplied.

## Composition

### Desktop

- Section introduction is brief and does not repeat the brand thesis.
- Zulal: dominant wide image aligned left, text/detail occupying a narrower right rail.
- Desert Leaf: reverse the visual weight or use a tall image/detail pairing to reflect the smaller scale.
- Cases are separated by a meaningful pause, rule or crop change—not a card border.
- Project name, location and scope behave like architectural labels.

### Deliberate hard cut

The storyboard permits a hard cut after Rituals. Implement it as a change in scale and composition, not an arbitrary new palette:

- Rituals sticky media releases.
- A full-width rule/label establishes “The Method Travels.”
- Zulal's wide image appears in ordinary flow.

No black panel, animated wipe or reference-colour takeover.

## Motion contract

### Communication job

Reset attention from one flagship home to two concise demonstrations of range.

### Stillness comparison

Stillness is sufficient. The project work and captions carry the argument.

### Approved motion

- Optional image reveal through overflow clipping over 600–900ms when first entering view.
- Optional 1–2% image settle on pointer hover for linked project previews, with no critical information hidden.
- No pin, scrub, horizontal motion, mosaic transfer, filter reflow or autoplay media.

## Links and future routes

- A project may link to a future case-study route only if the route exists.
- Do not render dead `View project` links.
- A final `View selected work` link may be included as a disabled design placeholder only in development, never production.
- Future route-transition ideas from R3, R5 and R6 are explicitly deferred.

## Mobile

- One case at a time: label, heading, dominant image, decision caption, detail image.
- Keep project differentiation through crop and rhythm, not colour-coded cards.
- No side-by-side comparison that makes both projects too small.

## Reduced motion

- Same layout with no clip/settle animation.

## Accessibility

- Each case is a semantic `article` with a heading and project metadata.
- Images have project-specific alt text.
- Links identify the project by name.
- Do not desaturate all non-hover images to the point that project proof becomes unclear.

## Performance

- Load Zulal's first image when the section approaches.
- Lazy-load Desert Leaf and all details.
- Use local responsive assets and intrinsic dimensions.
- Avoid mounting duplicate crops if `object-position` can preserve the focal point without harming the image.

## Build steps

1. Confirm which duplicate live routes belong to one project family.
2. Select and license two images per project.
3. Verify every constraint and response statement.
4. Build static case articles.
5. Apply asymmetric desktop compositions and mobile sequence.
6. Add only the optional reveal after static acceptance.
7. Test the transition from Rituals and into Process & Trust.

## Acceptance criteria

- Zulal and Desert Leaf do not appear as equal generic cards.
- Each case names an inherited condition and a design response.
- No before/after implication exists without real before proof.
- Section contains no pin, carousel or hover-only content.
- Mobile gives each case enough image scale to remain spatially credible.
- The visitor understands that the method travels without assuming every project is the same size or style.

