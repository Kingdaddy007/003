# Section Plan — Rituals Made Spatial / Consequences

**Stable job:** Connect the opened Mira plan to exact decisions that reduce daily friction.  
**Current owner:** `components/DetailsSection.jsx`  
**Recommended owner:** Rebuilt `RitualsSection`  
**Depends on:** Completed Mira proof, four verified Mira detail assets and captions

## Approved outcome

After the room-scale intervention, the visitor sees how everyday ease is built through concealed function, storage, thresholds and planning. The section behaves like one measured editorial composition, not a decorative detail grid.

## Current implementation correction

The present two-card section is not acceptable as proof:

- `Studio-bespoke_mira_32-scaled.jpg` is not present in the scraped Mira asset register and must be verified before use.
- `Lakes_16-scaled.jpg` belongs to Zulal, yet it is presented under “Rituals Made Spatial” as if it were Mira evidence.
- Two attractive cards do not establish the causal relationship between ritual and decision.

Remove both placeholder assumptions. Build from a verified Mira-only set.

## Reference evidence

**Observed reference behaviour**

- R1 holds a stable three-zone editorial grid while numbered text and central media change.
- R5 keeps project information fixed while media moves in a separate field.
- R6 uses asymmetric architectural image fields with large breathing room.
- R4 runs cards horizontally over a stable landscape, but the horizontal implementation is costly outside desktop.

**Recommended Studio Bespoke adaptation**

- Use a CSS-sticky image stage beside four normally scrolling decision entries.
- Preserve one consistent layout while the evidence changes.
- Keep the chapter vertical on every device; mobile becomes an art-directed stack.

**Implementation inference**

- CSS `position: sticky` and IntersectionObserver are sufficient.
- A short image crossfade may use CSS or GSAP, but the section does not receive a ScrollTrigger pin.

## Evidence slots

The final captions must be checked against the source project and selected image. Use this structure:

| Step | Ritual / friction | Verified decision | Required visual proof | Current status |
| ---: | --- | --- | --- | --- |
| 01 | Morning preparation | Concealed coffee nook keeps a repeated ritual available without leaving visual clutter | Mira image showing the nook open/closed or clearly located | Asset selection required |
| 02 | Cooking and reset | Integrated appliances and storage absorb daily equipment into the joinery | Mira joinery/storage detail with architecture still legible | Asset selection required |
| 03 | Moving between rooms | Arched openings turn the re-plan into deliberate thresholds | Mira image that shows an actual arch and adjacent-space relationship | Asset and exact claim validation required |
| 04 | Privacy and guest use | Powder-room relocation/plan adjustment supports the new ground-floor choreography | Plan, room or threshold image that genuinely demonstrates the decision | Asset required; omit if proof cannot be shown |

If Step 04 cannot be demonstrated visually, replace it with another verified Mira consequence supported by a real asset. Do not retain four items merely for symmetry.

## Content hierarchy

```text
eyebrow: Rituals Made Spatial
h2: Ease is designed, not improvised.
short introduction: the opened plan becomes useful through exact daily decisions
decision list: 01–04
  ritual label
  decision heading
  one factual caption
  optional material note
```

Avoid captions such as “beautiful cabinetry,” “timeless details” or “luxurious materials.” Every caption must name what the design allows, conceals, connects or protects.

## Desktop composition

Recommended 12-column allocation:

- Sticky media stage: columns 1–7, approximately 68–76svh high.
- Decision rail: columns 9–12.
- Section title may enter above both or occupy the first decision interval.
- One active decision at a time receives full text contrast.
- Inactive entries remain readable; do not fade them below accessible contrast.

The image stage may change crop only when the asset itself changes. Do not morph one photograph's aspect ratio continuously; that risks turning proof into a visual trick.

## Motion contract

### Communication job

Allow the visitor to compare several daily rituals against one consistent design logic.

### Why motion is better than stillness

A stable image field with sequential captions focuses attention on one decision at a time while preserving the sense that all decisions belong to one home. A static art-directed stack remains the valid fallback.

### Behaviour

1. The first image is present before the section reaches the viewport.
2. The media stage sticks within the section; the page itself remains native vertical flow.
3. Each decision entry becomes active near the viewport centre.
4. Media crossfades or uses a restrained 2–3% crop settle over approximately 500–800ms.
5. Caption state changes immediately enough to remain connected to the active image.
6. The final image releases normally into Method Travels.

No horizontal translation, infinite loop, autoplay slideshow, cursor effect or full-screen pin.

## Interaction

- Scroll automatically establishes the active entry on desktop.
- Decision labels may also be buttons if manual selection materially helps. If so, selection must work by keyboard and touch and must not fight scroll state.
- Do not add annotation hotspots unless the image contains a precise feature that benefits from them.
- Hover may slightly clarify a preview but cannot reveal the only caption.

## Asset and crop contract

For every selected image record:

- exact Mira source URL/file and rights status;
- intrinsic dimensions;
- wide/threshold/detail role;
- desktop crop and focal point;
- mobile crop or alternate image;
- text-safe area (normally none because copy has its own rail);
- accurate alt text;
- the project fact the image supports.

Do not use Zulal, Desert Leaf or unrelated Mira bedroom imagery in this chapter.

## Mobile

Use an alternating editorial stack:

```text
01 label + decision
01 image
02 label + decision
02 image
...
```

- No sticky stage.
- Vary image width or alignment deliberately, but keep one dominant read per screen.
- Captions appear before or immediately after their image; never require memory across several screens.
- All images remain visible with JavaScript disabled.

## Reduced motion

- Use the mobile/static stack at every viewport or keep desktop two-column layout without sticky/crossfade behaviour.
- No opacity-hidden inactive images or text.

## Accessibility

- Each decision is an `article` or structured list item with a heading.
- Active state is visual enhancement only; all decisions remain in the accessibility tree.
- Image alt text describes the spatial feature, not the marketing message.
- If manual tabs are added, implement the complete tabs pattern; otherwise use ordinary buttons/list and avoid fake ARIA tabs.

## Performance

- Load the first detail image as the section approaches; lazy-load later images.
- Use responsive sources and fixed aspect ratios.
- Keep at most two image layers mounted in the crossfade stage.
- No video, canvas or continuous filter animation.

## Build steps

1. Audit Mira image candidates visually and verify every claim-image pairing.
2. Create four content objects with evidence metadata and fallbacks.
3. Build the static mobile/editorial sequence.
4. Build desktop two-column layout with CSS sticky media.
5. Add active-state observer and restrained crossfade.
6. Verify section release and transition into supporting work.
7. Test missing image, slow network, keyboard and reduced motion.

## Acceptance criteria

- Every image belongs to Mira and supports its displayed claim.
- Section remains useful with all motion removed.
- Desktop uses no GSAP pin and no horizontal narrative scroller.
- Mobile shows all decisions in ordinary flow.
- No caption depends on hover.
- Visitor can name at least two ways the plan supports daily life after the section.

