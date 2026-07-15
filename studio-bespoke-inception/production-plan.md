# Studio Bespoke Design — Production Plan

**Status:** Active risk-prototype production contract; still-led aperture proof in testing
**Concept:** The Ritual Plan  
**Implementation authority:** Granted for the opening, inherited-plan bridge, and decisive-intervention risk prototype. Later chapters remain outside this prototype slice.

## 1. Asset contract

| Asset | Purpose | Status | Required before production |
| --- | --- | --- | --- |
| Mira wide room photographs | Threshold and flagship proof | Public examples observed | High-resolution licensed originals and crop approvals |
| Mira kitchen/living detail imagery | Rituals made spatial | Public examples observed | Final image selection and caption-safe crops |
| Mira original plan, sketch, site image or before photo | Explain decisive intervention | Unknown | At least one authentic source; otherwise simplify the proof scene |
| Mira source still for room film | Anchor an AI-assisted or edited room film to the real project | Unknown | Rights-cleared, high-resolution image with the kitchen/living relationship and a protected text-safe edge |
| Mira proof film | Make the central spatial opening legible under scroll control | Not created | 6-8 second reverse-safe clip, source-image lock, poster frame, frame map and mobile fallback |
| Zulal imagery | Smaller-scale method proof | Public examples observed | High-resolution licensed set |
| Desert Leaf imagery | Guest-studio transformation proof | Public examples observed | High-resolution licensed set |
| Material/process assets | Explain joinery, stone, microcement, consultation and delivery | Unknown | Sample boards, drawings, site images or photography |
| Marie Claire title/link and permitted pull quote | Independent authority | Available page/link | Usage approval and exact quotation check |
| Founder portrait / working imagery | Humanise delivery | Current portrait exists, use unknown | Confirm image rights and purpose |

## 2. Media and choreography map

| Section | Journey stage | Media type | Scroll behaviour | Text zone | Motion track | Fallback |
| --- | --- | --- | --- | --- | --- | --- |
| Threshold | Atmosphere / argument | Technical blueprint video with inline SVG fallback | One-time arrival, then an anchored background handoff controlled by scroll | Lower-left statement zone | Arrival + scroll-bound handoff | Static blueprint field and immediate headline |
| Inherited plan | Tension | Shared blueprint field + editorial copy | Foreground copy follows ordinary scroll while the background plane stays anchored and changes register | Dedicated left column | Scroll-bound handoff | Ordinary dark editorial section |
| Decisive intervention | Proof | Real Mira still inside a constant-geometry architectural aperture, paired with exact annotations | One 140vh desktop pin; the arch rises, expands, and settles before proof copy appears | Fixed left annotation rail after expansion | Scroll-bound | Full room still plus stacked captions |
| Rituals made spatial | Proof / material | Selected detail photos | Gallery procession; no mandatory pin | Edge labels, never over key room content | Scroll-bound / interaction | Stacked image/caption sequence |
| Supporting work | Proof | Zulal and Desert Leaf stills | Ordinary scroll with deliberate pauses | Captions below/alongside images | None or subtle interaction | Same |
| Method | Trust | Material/process imagery and editorial notes | Normal scroll | Clear reading column | None | Same |
| Invitation | Inquiry | Quiet texture or visual silence | No pin | Dedicated form area | Interaction only | Same |

## 3. Motion and engineering contract

- Use **GSAP + ScrollTrigger** only for approved authored chapters: hero arrival, Mira proof hold, selected gallery transfer.
- Keep Lenis as the single scroll infrastructure layer and synchronize it with the GSAP ticker and ScrollTrigger. Anchor navigation, touch scrolling, reverse travel and reduced-motion fallbacks must remain reliable.
- No WebGL or autonomous room video in the initial prototype. The opening technical blueprint video performs the arrival job and has an SVG fallback. The decisive-intervention proof remains a real still unless an approved reverse-safe Mira film proves the intervention more clearly.
- Separate arrival, ambient, scroll-bound and interaction timelines. They may not overwrite each other.
- Use scene-native transitions: arch/threshold reveal, light wash, material edge or a deliberate hard cut. No generic diagonal wipes.
- Keep navigation and enquiry reachable during any pin.

## 4. Accessibility and fallback contract

- `prefers-reduced-motion`: remove travel and pins; show a static editorial order with all captions and proof present.
- Mobile: replace pinned sequences with stacked scenes; no horizontal narrative scroller; no hover-only evidence.
- Every meaningful image receives an accurate alt description or an empty alt only when genuinely decorative.
- Text contrast and focus states must meet accessible contrast requirements against all image/colour contexts.
- Captions remain semantic text, outside masks and raster media.

## 5. Performance contract

- Responsive image formats and sizes; first viewport loads only the hero and essential typography. The proof film begins as its poster; only its initial frame tier loads ahead of the Mira chapter.
- Lazy-load later project images and optional video.
- Establish a page-weight and image-budget target after real source files are supplied; do not optimise against placeholders.
- No heavy real-time rendering in the first viewport.
- Use poster frames for any later room film; never make video the only proof state.

## 6. Risk prototype

### Dangerous assumption

The visitor understands the Mira intervention—and feels the promised cinematic continuity—without relying on a fake before/after story.

### Vertical slice to prototype first

Build only this sequence before broader production:

1. Threshold: technical CAD sketch of kitchen with bread on cutting board, drawing lines, dissolving into real photo.
2. The inherited plan: a short editorial tension statement.
3. Decisive intervention: one real wide shot inside a constant-geometry expanding arch, a labelled decision, and Marie Claire proof. On desktop, every state must reverse cleanly without copy collision or shape deformation.
4. Ritual detail: one kitchen/coffee/storage illustration or image, with a precise caption.
5. Mobile and reduced-motion variants of all four moments.

### Success criteria

- A visitor can describe what changed in Mira after one pass.
- Static/reduced-motion version remains compelling and complete.
- Pinning does not trap navigation or enquiry.
- Images retain spatial depth on desktop and mobile.
- The sequence feels like one story, not four designed sections.
- The film advances the architectural argument more clearly than the still poster alone; otherwise retain the still and remove the film.

### Verdict options after prototype

`expand` | `revise` | `simplify` | `return to concept`

## 7. Build slices after prototype approval

1. Foundation: semantic routes, content model, type/grid/layout primitives, responsive image handling.
2. Flagship: Mira threshold through rituals proof, static first then approved motion.
3. Supporting proof: Zulal, Desert Leaf, method and editorial authority.
4. Inquiry: fit form, accessibility, error states and confirmation behavior.
5. Motion pass: GSAP/ScrollTrigger, lifecycle cleanup, reduced-motion, mobile simplification.
6. Verification: accessibility, performance, responsive crops, proof accuracy and concept continuity.

## 8. Video-led proof choreography

### Active prototype section: Mira - The decisive intervention

| Field | Contract |
| --- | --- |
| Journey stage | Proof: the point where the visitor must understand what changed, not merely admire the finished room. |
| Belief/proof job | A plan can be opened around a family's actual movement, gathering and cooking rituals. |
| Media type | Real Mira still inside a constant-geometry DOM aperture. A source-image-to-video frame sequence remains a later conditional option. |
| Scroll behaviour | Pinned and scrubbed across 140vh. Scroll raises and uniformly scales the arch; reverse scroll closes the same path. |
| Enter / leave | Enter after the inherited-plan editorial statement; leave once the walls-removed annotation and press source have both been readable. Final pixel ranges are prototype-derived, not invented now. |
| Text zone | Left or right quiet edge of the source composition; never over the kitchen work surface, opening, or movement path. |
| Reveal rhythm | Arch rise -> room settles -> "Walls removed to connect kitchen, living and dining" -> island decision -> Marie Claire proof link. |
| Motion track | Scroll-bound. Arrival and ambient motion remain separate. |
| Prompt requirement | None for the current still prototype. A future film requires `cinematic-prompt-pack.md`, a rights-cleared Mira source still, a composition lock and an end-frame definition. |
| Fallback | Poster still, complete annotation, source link and ordinary document flow on mobile/reduced motion or failed JavaScript. |

### Reverse-safe film rules

- Film one continuous, slow camera move through a real current Mira threshold toward the kitchen/living connection; it must never depict an invented demolition or a fabricated old floor plan.
- Keep people, cooking steam, water, screens, vehicles, flames and other visibly time-directional actions out of the shot. A camera and daylight shift reverse plausibly; these actions do not.
- Use a 6-8 second, 16:9 master. The exact frame count, extraction FPS, source path, preload budget and crop tiers are defined after the master exists.
- The film earns its place only if it improves the visitor's understanding of the opening. If the poster plus annotation proves more clearly, the static version wins.
