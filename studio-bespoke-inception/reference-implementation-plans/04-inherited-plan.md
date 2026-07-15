# Section Plan — The Inherited Plan / Problem

**Stable job:** Explain how the existing arrangement resisted light, movement and gathering without fabricating a before state.  
**Current owner:** `components/TensionSection.jsx`  
**Recommended owner:** `InheritedPlanSection` inside `OpeningPlanStage`  
**Depends on:** Opening Arrival and shared plan plane

## Approved outcome

The visitor moves from belief to a credible problem statement while the same plan remains beneath the page. The register becomes denser and quieter. The section prepares the intervention but does not reveal the finished room early.

## Reference evidence

**Observed reference behaviour**

- R4 preserves the hero image while its surrounding visual world changes, then uses one surface to carry the next chapter.
- R1 lowers motion density for its philosophy statement and lets text move as one readable block.
- R6 frequently uses large negative space and small precise labels before architectural proof.

**Recommended Studio Bespoke adaptation**

- Retain one plan plane while the foreground statement names the constraint.
- Darken or shade the plan gradually; do not slide in a separate dark panel.
- Use one declarative title and one evidence-backed paragraph, with a small architectural note.

**Implementation inference**

- The current separate `BlueprintField` SVG should be removed after the shared plan plane exists.
- The copy can remain in normal flow while a shared parent timeline controls plan opacity/register.

## Preserve

- Eyebrow: `The Inherited Plan`.
- Title direction: `Closed rooms. Borrowed habits.`
- Evidence-backed explanation of the enclosed Mira ground floor.
- No before photograph, fake floor plan or Al Barari substitution.
- Desktop foreground scroll and mobile ordinary flow.

## Change

1. Remove the second approximate blueprint drawing from `TensionSection`; it breaks continuity and is not verified Mira evidence.
2. Let the shared opening plan receive a shaded overlay and lower contrast.
3. Position copy on a dedicated column rather than over the plan's highest-density linework.
4. Keep the small constraint label horizontal on mobile and avoid vertical writing as the only orientation cue.
5. Make the section end with a visible threshold/clearance that gives the arch room to enter.

## Content hierarchy

```text
section label: The Inherited Plan
h2: Closed rooms. Borrowed habits.
body: verified Mira constraint and the question the plan needed to answer
note: 01 / Constraint before intervention
```

The body should remain concise. Do not add generic homeowner pain points or claims about builder-grade plans that are not part of Mira's evidence.

## Composition

- Desktop: copy occupies approximately columns 2–7; the right side remains plan/negative space.
- Keep body measure around 50–65 characters per line.
- The title is spatially decisive but smaller than the proof room.
- Note aligns to a stable grid line; vertical text is optional decoration only and must have a horizontal semantic equivalent.
- Section min-height may approach one viewport but must be driven by reading and handoff, not an arbitrary theatre duration.

## Motion contract

### Communication job

Turn the opening belief into a specific architectural tension.

### Why motion is better than stillness

The shared plan holding in place while copy changes demonstrates that the problem exists within the same home/plan. A separate panel would make it feel like a disconnected marketing section.

### Desktop sequence

| Phase | Behaviour |
| --- | --- |
| Enter | Opening copy has cleared; shaded register reaches its settled state |
| Read | Tension copy moves through ordinary document flow; plan remains stable |
| Exit | Copy/note translate upward a short distance and fade; plan lines recede enough for the arch threshold to become primary |

- Use linear or near-linear scrub only for exit travel.
- Do not pin the section.
- Do not move the plan independently in X/Y beyond a minimal depth cue; continuity is more important than parallax.
- The proof arch begins only after the title/body have had a complete reading interval.

## Transition into proof

The handoff is `SHADED PLAN → APERTURE RISE → OPEN PLAN`:

1. Tension copy leaves.
2. Plan contrast reduces but does not vanish abruptly.
3. One constant-geometry arch enters from below/centre.
4. The real Mira room becomes visible inside the arch.

Do not cover the plan with a red/black/reference-style panel. Do not shrink the plan into a fake before image.

## Mobile

- Dark mineral section in ordinary flow after the Opening.
- Use the same static plan crop or a coordinated plan texture, but do not rely on fixed background attachment.
- Copy remains fully visible; no exit fade is needed.
- A normal room figure follows below in the Proof section.

## Reduced motion

- Static shaded plan plus complete copy.
- No scroll-linked fade or translation.
- Proof begins as the next normal section with the full room image.

## Accessibility

- Section has `aria-labelledby` tied to the `h2`.
- Blueprint remains decorative.
- Body contrast must remain high against the shaded plan.
- Do not place text at reduced opacity to create atmosphere.

## Performance

- Reuse the already loaded plan asset; no additional image/video request.
- The register shift should be one overlay opacity or CSS-variable change.
- Avoid backdrop filters and large animated blurs.

## Build steps

1. Move the section inside the shared Opening Plan stage.
2. Remove local `BlueprintField` and duplicated SVG paths.
3. Establish text-safe column and shaded overlay state.
4. Keep copy in semantic normal flow.
5. Add a scoped desktop exit timeline only.
6. Coordinate the exit threshold with the Proof plan.
7. Add mobile/reduced static layouts.

## Acceptance criteria

- Opening and Inherited Plan visibly share one plan plane.
- No panel edge slides over the opening.
- No fake before image, plan or unrelated project asset appears.
- Copy can be read completely at normal and fast scroll speeds.
- The section does not pin or trap scrolling.
- Proof arch does not enter before the constraint has been legible.

