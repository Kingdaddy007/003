# Studio Bespoke Design — Scroll Storyboard

**Activation:** Required. Meaning changes at authored scroll depths; the flagship Mira chapter needs controlled continuity between spatial tension, intervention and lived result.  
**Concept:** The Ritual Plan  
**Continuity rule:** A repeated architectural opening/arch, slow light transition and caption cadence connect scenes. No forced travelling object is required.

## Motion register

- **Primary register:** `MINERAL LIGHT` — warm paper, stone, timber and daylight; slow, grounded, calm.
- **Tension register:** `SHADED PLAN` — a slightly denser, lower-light state used only to name the inherited constraint.
- **Release register:** `OPEN PLAN` — brighter, spatially legible Mira imagery after the decision.
- **Continuity devices:** arch/threshold geometry, image crop direction, text alignment, quiet mineral anchor colour.

## Beat map

| Beat | Label | Scroll depth | Controlling idea | What the visitor sees | Feeling | Register | Continuity | Copy mode | Transition out |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Arrival threshold | 0–10%; one-time | A home can learn the rhythm of its people | Technical CAD sketch of Mira kitchen; dissolves to photo | Technical trust | SHADED PLAN | Blueprint lines | TECHNICAL | DISINTEGRATE |
| 2 | The life inside | 10–20%; normal | Design begins with a routine, not an object | One line about baking, gathering and daily use | Recognition | MINERAL LIGHT | Type alignment | DECLARATIVE | ANCHOR HOLD |
| 3 | The inherited plan | 20–32%; normal | An inward-looking plan can resist the way a family lives | Restrained crop/text describing the prior condition; no fabricated before image | Tension | SHADED PLAN | Same image edge/caption rail | EDITORIAL | PORTAL |
| 4 | The decisive cut | 32–52%; desktop pin | One intervention changed light, flow and connection | Mira wide shot; plan/site artifact if supplied; “walls removed” annotation; Marie Claire source | Relief and trust | OPEN PLAN | Arch/opening geometry | DECLARATIVE | LIGHT WASH |
| 5 | Rituals made spatial | 52–68%; controlled procession | Ease is designed through small exact decisions | Kitchen, joinery, storage and coffee-nook details; one item at a time | Appreciation | MINERAL LIGHT | Caption rhythm | EDITORIAL | DRIFT |
| 6 | The method travels | 68–80%; normal | The same intelligence works at different scales | Zulal and Desert Leaf as two concise cases | Confidence | MINERAL LIGHT | Split image/caption grid | EDITORIAL | HARD CUT |
| 7 | The hand behind ease | 80–90%; normal | Careful execution is part of the design | Three-stage process, material/process evidence, selected capacity | Assurance | MINERAL LIGHT | Vertical rule / annotation type | EDITORIAL | DISSOLVE |
| 8 | Invitation | 90–100%; normal | Begin with the ritual or friction that needs to change | Quiet visual field and fit-focused inquiry | Readiness | MINERAL LIGHT | NONE | INVITATION | NONE |

## Track responsibilities

| Track | Owner | Behaviour | Stop / fallback |
| --- | --- | --- | --- |
| Arrival | GSAP timeline | Technical CAD sketch draws lines on paper, fades in layout statement, dissolves to finished photo | Static hero photo under reduced motion or failed JS |
| Ambient | Optional CSS or GSAP | Real light/shadow shift only if an asset supports it; pause offscreen | Omit on mobile and reduced motion |
| Scroll-bound | GSAP ScrollTrigger + canvas frame renderer | Beat 4 maps scroll progress to a reverse-safe Mira film frame; Beat 5 is a restrained transfer; neither autoplay | Poster/static sequential images/captions |
| Interaction | Native/CSS first | Annotation reveal and enquiry focus | All information visible without interaction |

## Beat 4 media instruction

The decisive-cut visual becomes a **source-image-locked Mira room film** when the required asset is supplied. GSAP maps the desktop pin's scroll position to a canvas frame index, making forward and reverse scroll trace the same slow threshold-to-kitchen camera path. The accompanying annotation is the evidence: it names the removed internal walls and links to the Marie Claire coverage. The film never reconstructs or implies a documentary before state.

## Responsive and reduced-motion translation

- **Desktop:** Beat 4 may pin for one viewport-length of reading and scrub the Mira proof film; Beat 5 may use one controlled gallery procession.
- **Mobile:** no pin or frame sequence. Beats 3-5 become short vertical scenes using the poster/source still and direct captions/tap-safe annotations.
- **Reduced motion:** no threshold animation, no scrub or panel travel; use the same image sequence, static hierarchy and full captions.
- **Loading failure:** images load as ordinary document content; text/proof cannot depend on animation initialization.

## Guardrails

- No scroll-jacking, scroll progress gimmick, autoplay room film or universal fade-up preset.
- Navigation and enquiry stay reachable during the pin.
- A beat is removed if it does not advance the claim, prove the work or prepare inquiry.
- If real plan/before/process material cannot be supplied, Beat 4 uses the existing Marie Claire-supported editorial explanation and does not simulate a before/after reveal.
