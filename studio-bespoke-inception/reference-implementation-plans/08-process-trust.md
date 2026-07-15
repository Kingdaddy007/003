# Section Plan — The Hand Behind Ease / Process & Trust

**Stable job:** Make delivery responsibility, founder judgment and project fit legible after design proof has been earned.  
**Current owner:** None  
**Recommended owner:** `ProcessTrustSection`  
**Depends on:** Verified service language, founder facts, optional process imagery and approved testimony

## Approved outcome

The section explains how Studio Bespoke carries a project from concept through construction, then establishes the founder and selected capacity without turning the page into a biography, awards wall or counter dashboard.

## Reference evidence

**Observed reference behaviour**

- R3 uses one split template for seven numbered process states and large stage numbers as orientation.
- R4 uses large numerals with disciplined supporting text for credentials.
- R6 pairs exact technical information with large calm typography and thin rules.
- R1 reduces motion while presenting philosophy and identity information.

**Recommended Studio Bespoke adaptation**

- Use three numbered stages because the current service evidence supports three, not seven.
- Put responsibility and outputs ahead of abstract service names.
- Follow process with a compact founder/trust block, one verified client statement, independent press and capacity.

**Implementation inference**

- Normal document flow and CSS grid are sufficient.
- If process imagery is missing, a text-led editorial layout is more credible than generated sketches or stock material boards.

## Process hierarchy

### 01 — Concept development

Job: understand the household, define priorities and establish the spatial direction.

Only claim activities confirmed by Studio Bespoke's service material. Candidate outputs such as brief, adjacency decisions or concept direction must be reviewed before publication.

### 02 — Detailed design

Job: resolve planning, materials, joinery and the information required to make the design buildable.

Do not publish a detailed deliverables list until drawings, approvals and procurement responsibilities are confirmed.

### 03 — Construction / completion

Job: coordinate delivery under the stated turnkey/project-management relationship.

Do not promise budget certainty, fixed timelines, worldwide local execution or stress-free completion without operational proof.

## Stage composition

Each stage uses the same structural grammar:

```text
large stage number
stage heading
one responsibility statement
one short “what becomes clear” statement
optional verified process image / drawing / material evidence
```

Desktop may alternate image/text sides, but number, heading and body anchors stay consistent. Thin rules and generous pauses provide structure. Do not place all three stages inside equal rounded cards.

## Founder and authority block

Place after the stages under `id="studio"`.

Verified/reported candidate facts:

- Brittany Guimaraes, Founder & Creative Director.
- Raised in Johannesburg.
- Lived/worked in Dubai for more than ten years, as reported by the current site.
- Completed a five-year accredited Interior Design degree, as reported.
- LEED GA is reported but must be independently verified before publication.

The founder portrait is secondary to the proof already shown. Use one working or composed portrait only if rights and crop are approved.

## Client trust

Use one short attributed statement about interpretation, collaboration or sourcing only after exact wording and permission are confirmed. The New Earth Café evidence is suitable in principle, but the implementation must not invent or loosely quote the client.

If no approved quotation exists, replace the quote with a factual responsibility statement rather than anonymous praise.

## Press

Provide a compact `id="press"` row:

- Publication: Marie Claire Maison.
- Project: Mira.
- Job: independent confirmation of the project logic.
- Link to exact article.

Do not use a wall of media logos. Do not repeat the same press line at equal visual weight in both Proof and Process; one can be a small source link and the other a compact recognition entry.

## Capacity and fit

State only what the existing site supports:

- The studio curates a limited number of projects each year.
- One-to-two-month urgent completion requests may not be suitable.

This is a calm filter, not scarcity theatre. It should prepare Inquiry without intimidating a suitable client.

## Motion contract

### Communication job

Make a complex renovation journey feel structured and responsibly held.

### Stillness comparison

Stillness is stronger than another pin. The visitor must read, compare and build trust.

### Approved motion

- Stage number/title may reveal as one block when entering view.
- Optional process image may clip in from a material edge over 600–900ms.
- No small-to-full-frame expansion because the Mira aperture already owns that grammar.
- No counters, ticker, carousel, accordion dependency or pinned stage sequence.

## Asset states

| Available evidence | Layout response |
| --- | --- |
| Real drawings, samples, site or founder-working images | One verified image per stage, art-directed and captioned |
| Founder portrait only | Text-led process stages; portrait appears in founder block |
| No process/founder imagery | Pure editorial stages with rules, numbers and exact copy |

Never substitute generated samples, hands, drawings or site photography without explicit approval and truthful labelling.

## Mobile

- Three stages stack in order with large but bounded numbers.
- Founder block follows all stages.
- Press, testimony and capacity each remain separate small blocks.
- No accordion required to access the process.

## Reduced motion

- Normal flow, no clip or reveal animation.

## Accessibility

- Stages are an ordered list or three semantic articles.
- Large numbers are decorative when headings already identify the stage; hide duplicate number pronunciation if necessary.
- Quote uses `blockquote` only when exact quotation is approved.
- External press link identifies publication and project.
- Small metadata must maintain legible size and contrast.

## Performance

- Text-led base costs almost nothing.
- Lazy-load process/founder images.
- No video, canvas or animation library work beyond an optional existing reveal helper.

## Build steps

1. Confirm exact three-stage service language and scope boundaries.
2. Inventory real process/founder assets; choose text-led fallback if insufficient.
3. Build semantic three-stage sequence.
4. Add founder, testimony, press and capacity blocks with evidence gates.
5. Establish `#approach`, `#studio` and `#press` anchors.
6. Add optional light reveals only after reading flow passes.
7. Verify transition into Inquiry.

## Acceptance criteria

- Three stages are understandable without animation.
- No unsupported operational promise appears.
- Founder content arrives after project proof.
- LEED GA and testimonial wording remain blocked until verified.
- No `0` counters, generic statistics or awards wall.
- Capacity language filters gently and leads naturally into Inquiry.
- All three navigation anchors land correctly.

