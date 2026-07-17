# Studio Bespoke — Phase 1: Services and Chapter Thresholds v1

**Status:** Direction and implementation plan; do not implement until this phase is assigned.

**Scope:** Founder exit → Services invitation → Services experience → Selected Work entrance.

**Approval gate:** Complete this phase, present it for user review, and stop. Do not begin Phase 2 without explicit approval.

## Diagnosis

The current Services build has four structural problems:

1. `One studio. Two ways to work.` is being treated as left-column service content even though it is the chapter invitation.
2. The image has no communication job. It makes the service feel like another project gallery and competes with the service names.
3. The founder paper register (`#e8e0d4`) cuts directly to a near-black field (`#11130f`) without a designed threshold.
4. Services and Selected Work visually bleed into one long dark module, so neither chapter feels authored or complete.

The fix is not another image choice. The service chapter must become typographic, comparative, and spatially self-contained.

## Locked decisions

- Remove all service photographs on desktop and mobile.
- Keep the verified service families, using the current official names at implementation time:
  - `Full Interior Design Services` / approved homepage label `Full Turnkey Interior Design`.
  - `International Interior Design` / approved homepage label `Worldwide Interior Design`.
- Move `One studio. Two ways to work.` into its own centered invitation beat before the service states.
- Preserve the earlier well-liked heading animation, but rebuild it as a reversible, section-owned text reveal.
- Do not use service numbers, generic icons, cards, a central project image, or a repeated giant `INTERIOR DESIGN` label.
- Selected Work must receive its own title threshold and background reset.

## Three concept territories

### Concept A — Two Thresholds (recommended)

**Thesis:** Two different ways of entering the same authored practice.

The founder section releases into a warm-paper invitation. `One studio.` resolves first; `Two ways to work.` follows through a restrained line mask. A dark architectural plane then rises like a door leaf and becomes the Services stage. Each service occupies the entire stage alone. The first state exits before the second enters.

Inside each state:

- the service name is the dominant architectural mass;
- one exact service sentence sits beneath it;
- a quiet lower rail carries verified scope or geographic proof;
- a thin vertical seam marks the threshold between states;
- no photography appears.

Why this is strongest: it gives the heading its proper role, makes the two services easy to compare, creates a meaningful physical law, and remains distinctive without adding visual noise.

### Concept B — The Paired Pages

**Thesis:** One studio expressed through two editorial pages.

The invitation remains centered on paper. Two oversized typographic pages then pass vertically through one viewport. The first page contains Full Turnkey; the second contains Worldwide. Each page has its own typographic cadence and verified scope, but both share the same grid.

Strength: quiet and highly editorial.

Risk: if the page movement is too literal it can feel like a portfolio template, and the distinction between the two offers may remain informational rather than spatial.

### Concept C — The Dividing Line

**Thesis:** One continuous point of view changes reach, not quality.

A single line grows across the invitation and becomes the axis of the service stage. Full Turnkey is read above the line; Worldwide is read below. Scroll moves the line through the viewport, transferring emphasis without moving the words into collision.

Strength: minimal asset burden and strong conceptual continuity.

Risk: more abstract, less immediately legible, and too close to decorative typography if the supporting service distinctions are weak.

## Recommended build: Concept A

### Scene 1 — Founder-to-Services invitation

- Register: founder warm paper `#e8e0d4`, ink `#171a17`.
- Approximate height: `55–70svh`, tuned by reading time rather than spectacle.
- Center the proposition optically, slightly above mathematical center.
- Eyebrow: `Services` may appear only after the first heading line begins resolving.
- Heading:
  - `One studio.`
  - `Two ways to work.`
- Support line: `One point of view, carried through every project and every detail.`
- Motion job: announce a new chapter and gather attention before the register change.
- Motion: line/word mask, no fade-up stack, no image, no pin longer than necessary.

### Scene 2 — Service state one

- Register: graphite `#171a17` rather than the current green-black `#11130f`; warm ivory type `#f2eee5`.
- Heading: `Full Turnkey Interior Design` unless the user approves the official `Full Interior Design Services` wording.
- Supporting line: `From first idea to final detail, one studio carries the whole.`
- Verified scope rail may use the official six stages in a compact, readable sequence:
  - Pre-Concept
  - Schematic Design
  - Detail Design
  - BOQ Coordination
  - Procurement, Furnishing & Styling
  - Construction Supervision
- Do not animate all six items independently. Reveal the rail as one evidence unit.

### Scene 3 — Service state two

- Heading: `Worldwide Interior Design` unless the user approves the official `International Interior Design` wording.
- Supporting line: `The same personal design process, carried beyond Dubai.`
- Verified evidence rail: `Dubai · Cambridge · South Africa`, sourced from the official Services page. Do not imply those are offices.
- Transfer motion: the first service closes behind the central seam; the second opens from the same seam. Both headings are never fully visible together.

### Scene 4 — Services release

- Service copy withdraws completely.
- The graphite plane releases; it does not expose the Selected Work project image immediately.
- A warm-paper title threshold rises into view and establishes Selected Work as a separate chapter.
- No dark blank spacer and no visible next-section content before the release completes.

## Selected Work entrance threshold

- Approximate height: `55–65svh` in ordinary flow or a short sticky hold.
- Register: warm paper `#e8e0d4` to separate the two dark experiences.
- Eyebrow: `Selected Work`.
- Recommended heading: `Different lives. Different answers.`
- Alternative: `A point of view, never a formula.`
- Support: optional one-line invitation only; no project description yet.
- Exit: paper field parts or lifts to reveal the first gallery aperture already containing a decoded, visible image.

## Motion contract

| Beat | Progress responsibility | Rule |
| --- | --- | --- |
| Invitation | Founder exits; centered heading resolves | No dark register before the heading is readable |
| Door rise | Graphite plane overtakes paper | One controlled material event |
| Turnkey | Service one reveals and holds | Full readable dwell; no image |
| Transfer | Central seam closes/reopens | Outgoing copy clears before incoming copy appears |
| Worldwide | Service two reveals and holds | Geographic proof remains subordinate |
| Release | Dark plane withdraws | Selected Work title threshold owns the next frame |

- One GSAP timeline per chapter; page-level Lenis remains the only smooth-scroll instance.
- Scroll-bound motion stops when scrolling stops and reverses cleanly.
- Do not use random directions or velocity distortion.
- Mobile uses ordinary flow: invitation → service one → service two → Selected Work title.
- Reduced motion uses the same sequence with no pin and no transformed text.

## Implementation boundaries

- Refactor `services-section.js` and its CSS module.
- If necessary, split the centered invitation into `services-introduction.js`; do not put it inside the active service grid.
- Create an explicit Selected Work introduction wrapper or include the threshold inside `selected-work-section.js` before the sticky gallery.
- Define shared color tokens at the Living Threshold page level:
  - `--paper: #e8e0d4`
  - `--ink: #171a17`
  - `--ivory: #f2eee5`
  - `--muted-paper-ink: #6d655b`
- Remove `#11130f`, `#15130f`, and `#181a16` as competing dark-background identities unless a single derived tone is documented.

## Verification and acceptance

- The heading is visually centered and reads as an invitation, not a service label.
- No service photograph exists.
- Each service is independently understandable with JavaScript disabled.
- The two service names never overlap.
- The founder, Services, and Selected Work registers have intentional thresholds.
- The first Selected Work image is decoded and visible before its aperture opens.
- No section leakage at 1440×900, 1280×800, 1024×768, 390×844, or reduced motion.
- Stop for user approval before Phase 2.
