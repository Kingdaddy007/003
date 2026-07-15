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
| 1 | Opening belief | 0–14%; one-time arrival, then scroll-linked handoff | Design begins with the life inside the plan | Technical blueprint video, controlling line and delayed navigation; the visual plane remains anchored as the copy leaves | Recognition and technical trust | MINERAL LIGHT | Blueprint plane | DECLARATIVE | ANCHOR HOLD |
| 2 | The inherited plan | 14–28%; normal foreground scroll over the anchor hold | An enclosed plan can resist light, movement and gathering | Dedicated copy and quiet linework move through the viewport while the shared blueprint plane darkens without a panel edge | Tension and understanding | SHADED PLAN | Blueprint plane and type alignment | EDITORIAL | APERTURE RISE |
| 3 | The decisive cut | 28–48%; one 140vh desktop pin | One structural decision changed light, flow and family connection | One constant-shape arch rises and expands into the completed Mira room; a subtle internal crop shift settles before wall-removal evidence, island decision and Marie Claire confirmation | Relief and trust | OPEN PLAN | Arch/opening geometry | DECLARATIVE | LIGHT WASH |
| 4 | Rituals made spatial | 52–68%; controlled procession | Ease is designed through small exact decisions | Kitchen, joinery, storage and coffee-nook details; one item at a time | Appreciation | MINERAL LIGHT | Caption rhythm | EDITORIAL | DRIFT |
| 5 | The method travels | 68–80%; normal | The same intelligence works at different scales | Zulal and Desert Leaf as two concise cases | Confidence | MINERAL LIGHT | Split image/caption grid | EDITORIAL | HARD CUT |
| 6 | The hand behind ease | 80–90%; normal | Careful execution is part of the design | Three-stage process, material/process evidence, selected capacity | Assurance | MINERAL LIGHT | Vertical rule / annotation type | EDITORIAL | DISSOLVE |
| 7 | Invitation | 90–100%; normal | Begin with the ritual or friction that needs to change | Quiet visual field and fit-focused inquiry | Readiness | MINERAL LIGHT | NONE | INVITATION | NONE |

## Track responsibilities

| Track | Owner | Behaviour | Stop / fallback |
| --- | --- | --- | --- |
| Arrival | GSAP timeline | Technical CAD sketch draws lines on paper, fades in layout statement, dissolves to finished photo | Static hero photo under reduced motion or failed JS |
| Ambient | Optional CSS or GSAP | Real light/shadow shift only if an asset supports it; pause offscreen | Omit on mobile and reduced motion |
| Scroll-bound | GSAP ScrollTrigger | Beat 3 opens the architectural aperture and sequences exact proof; Beat 4 may later become a restrained transfer | Full room still followed by static proof copy |
| Interaction | Native/CSS first | Annotation reveal and enquiry focus | All information visible without interaction |

## Beat 3 media instruction

The current risk prototype uses a real Mira still inside one constant-geometry architectural aperture. The arch translates upward and scales uniformly until its edge overscans the viewport; it must not morph through capsule, oval and rounded-rectangle states. The still shifts only enough to transfer attention from the threshold toward the island. If a rights-cleared source image and approved reverse-safe film are later supplied, the still may become a scroll-mapped frame sequence. The accompanying annotation remains the evidence: it names the removed internal walls and the kitchen-centred plan, then cites the Marie Claire coverage. The media never reconstructs or implies a documentary before state and does not cycle through unrelated rooms.

## Responsive and reduced-motion translation

- **Desktop:** Beat 3 pins for one purposeful reading interval; its aperture and proof sequence reverse cleanly. Beat 4 may later use one controlled gallery procession.
- **Mobile:** no pin or frame sequence. Beats 2-4 become short vertical scenes using the blueprint field, room still and direct captions.
- **Reduced motion:** no threshold animation, no scrub or panel travel; use the same image sequence, static hierarchy and full captions.
- **Loading failure:** images load as ordinary document content; text/proof cannot depend on animation initialization.

## Guardrails

- No scroll-jacking, scroll progress gimmick, autoplay room film or universal fade-up preset.
- Navigation and enquiry stay reachable during the pin.
- A beat is removed if it does not advance the claim, prove the work or prepare inquiry.
- If real plan/before/process material cannot be supplied, Beat 3 uses the existing Marie Claire-supported editorial explanation and does not simulate a before/after reveal.
