# Shared Foundation — Navigation, Content, Scroll and Responsive Contract

**Owner:** Cross-homepage infrastructure  
**Depends on:** `00-master-sequence.md`, approved `design.md` / `design.json`  
**Consumed by:** Every section plan

## Outcome

Create one semantic, resilient homepage shell in which each chapter owns its content and motion while navigation, tokens, scroll infrastructure, media conventions and fallbacks remain consistent.

## Reference evidence

**Observed reference behaviour**

- R1, R3 and R6 retain navigation while chapters change beneath it.
- R5 demonstrates that a stable information field can orient the visitor while media moves.
- R4 maintains continuity by preserving one surface or motif across chapter boundaries.
- All six use extreme scale contrast between display language and small functional labels.

**Recommended Studio Bespoke adaptation**

- Keep one quiet top header and one understated inquiry action.
- Use section-specific register changes without replacing the navigation system.
- Keep media central and labels peripheral, but never reduce legibility to imitate a reference.

**Implementation inference**

- The current Next/React/GSAP/Lenis stack can implement the approved behaviour without new dependencies.
- Use native CSS sticky positioning and IntersectionObserver where timeline control is unnecessary.

## Current implementation assessment

| Current condition | Required action |
| --- | --- |
| `app/page.js` renders only Opening, Tension, Proof, two Detail cards and Footer | Add complete chapter order |
| Header links target `#work`, `#approach`, `#studio`, `#journal`, but those IDs do not exist | Create a verified anchor map and update labels |
| Header logo loads a remote `Studio-Bspoke` asset with known spelling/provenance risk | Replace with confirmed local asset before production |
| `useLenis()` is global and synchronized with GSAP | Preserve one instance; add explicit preference/lifecycle handling |
| Remote images use raw `<img>` or CSS backgrounds | Move licensed production assets local and provide intrinsic dimensions |
| All styles live in one global file | Keep for the current small build or split by component only when implementation starts; do not introduce a styling framework migration |

## Semantic page structure

```text
body
  skip-link
  SiteHeader
  OpeningPlanStage
    OpeningSection (h1)
    InheritedPlanSection (h2)
  main
    MiraProofSection (h2, id=work)
    RitualsSection (h2)
    SupportingWorkSection (h2)
    ProcessTrustSection (h2, nested approach/studio/press anchors)
    InquirySection (h2, id=inquiry)
  SiteFooter
```

Do not use the empty `HeroSection` solely as scroll spacer after the Opening Plan stage is refactored. The height that drives the handoff must belong to a semantic section or wrapper.

## Anchor and navigation contract

| Label | Target | Notes |
| --- | --- | --- |
| Work | `#work` | Begins at Mira intervention, where project proof becomes visible |
| Approach | `#approach` | Three verified delivery stages |
| Studio | `#studio` | Founder/trust subsection after process |
| Press | `#press` | Marie Claire confirmation or a compact press row; replace current unsupported `Journal` label |
| Enquire | `#inquiry` | Qualified inquiry section |

- Include a visible-on-focus skip link to `#main-content`.
- Native hash navigation must work with JavaScript disabled.
- Lenis anchor handling must respect header offset and focus the destination without trapping the keyboard.
- On mobile, use a conventional accessible disclosure menu. Do not compress five links beside the logo at 9px as the current CSS does.
- The quiet `Discuss your home` action may remain visible in the header after the opening, but it must not become a large pill or floating sales widget.

## Content model

Create one plain data module, for example `content/homepage.js`, with no CMS dependency:

```text
homepageContent
  opening
  inheritedPlan
  miraProof.steps[]
  rituals[]
  supportingProjects[]
  processStages[]
  founder
  press[]
  inquiry
```

Each project-derived object must include:

- `project`
- `claim`
- `evidenceSource`
- `image`
- `alt`
- optional `caption`
- optional `externalHref`

The evidence source is internal metadata for governance and need not render publicly. Do not let components contain scattered unverified claims or URLs.

## Component ownership

| Component | Owns | Does not own |
| --- | --- | --- |
| `SiteHeader` | Menu, current theme, anchor links, inquiry access | Chapter animation |
| `OpeningPlanStage` | Shared plan plane and chapter register | Mira room proof |
| `OpeningSection` | Arrival copy and cue | Tension copy |
| `InheritedPlanSection` | Constraint copy and exit | New blueprint asset |
| `MiraProofSection` | Arch aperture and two evidence states | Later details |
| `RitualsSection` | Four Mira decisions and sticky enhancement | Zulal/Desert Leaf |
| `SupportingWorkSection` | Two supporting cases | Full project index |
| `ProcessTrustSection` | Three stages, founder, testimony, capacity, press anchor | Inquiry submission |
| `InquirySection` | Fit-led form and status states | Site-wide legal navigation |
| `SiteFooter` | Legal, confirmed contact, social links | Lead-generation copy |

## Token contract

Keep the current working tokens:

```css
--color-neutral: #F9F8F6;
--color-communicator: #1C1C1A;
--color-anchor: #948E85;
--color-support: #F1EFEA;
--color-action: #4E3F35;
--font-serif: 'Melodrama', Georgia, serif;
--font-sans: 'Satoshi', system-ui, sans-serif;
```

Add only structural tokens proven to recur:

- `--header-height`
- `--page-gutter`
- `--content-max`
- `--measure-body`
- `--section-space`
- `--focus-ring`
- `--motion-weighted-out`

Do not add reference-specific red, black, rust, green, geometric or glass tokens. Sample final neutral/anchor variants from licensed Studio Bespoke imagery before production colour lock.

## Responsive grid

| Range | Contract |
| --- | --- |
| Large desktop | 12-column, max content width 1200px; full-bleed media may leave the container intentionally |
| Standard desktop/tablet landscape | 8-column equivalent; proof pin only when image depth and text rail remain legible |
| Tablet portrait | Ordinary flow for Proof if pin would leave less than 55% usable media width |
| Mobile | One primary column with deliberate image offsets; no pins, horizontal narrative scroll or hover dependency |

Use container queries only if component behaviour genuinely depends on its container. Do not introduce them merely to modernize the code.

## Scroll infrastructure

### Lenis

- Maintain a single instance at page level.
- Synchronize with ScrollTrigger once.
- Do not instantiate Lenis during reduced motion if native scrolling gives the intended static experience.
- Keep touch behaviour native and verify iOS overscroll, anchor links, focus jumps and history restoration.
- Destroy the instance and ticker callback on unmount.

### GSAP / ScrollTrigger

- Register plugins once in the client runtime.
- Use `gsap.context()` inside each owning component.
- Use `gsap.matchMedia()` for desktop/no-preference enhancement.
- Use function-based measurements and `invalidateOnRefresh` for viewport-dependent values.
- Revert timelines and kill owned triggers on cleanup.
- Do not query global class names such as `.preloader-mantra .word` when component refs can scope the target.

### Ownership budget

Only these scroll-controlled timelines are allowed:

1. Opening copy/plan handoff.
2. Inherited Plan exit/register shift, preferably in the same shared context as Opening.
3. Mira proof pin.

Rituals uses CSS sticky plus optional IntersectionObserver/crossfade. All later chapters use ordinary document flow.

## Header theme strategy

Use a small explicit theme set:

- `plan-light`
- `plan-shaded`
- `proof-dark`
- `mineral-light`
- `inquiry-light`

The header may update a `data-theme` attribute on its root. Section observers or very small ScrollTriggers may set that state. Do not animate React state on every scroll frame.

Header contrast must be valid in every intermediate proof state. If contrast cannot be guaranteed over the room image, provide a quiet localized veil behind the navigation rather than a text shadow across all links.

## Media conventions

1. Production project imagery must be rights-cleared and stored locally or served from an approved image domain.
2. Preserve intrinsic width/height or aspect ratio to prevent layout shift.
3. Use responsive `sizes` and modern formats.
4. Place semantic text outside masks and image files.
5. Every visual slot records desktop crop, mobile crop, focal point and text-safe zone.
6. Do not use CSS `background-image` for content-bearing imagery when a semantic image is practical.
7. Opening video requires poster and SVG fallback. No other video is part of the approved base implementation.

## Reduced-motion contract

- Remove all pins and scrubbed travel.
- Keep every section in the same narrative order.
- Display the blueprint, room and detail imagery as ordinary static figures.
- Reveal no critical content through animation or interaction.
- Disable pulse loops, animated scroll cues and ambient media.
- Preserve clear focus and hash navigation.

## Failure contract

| Failure | Required result |
| --- | --- |
| Opening video fails | SVG blueprint appears immediately; copy and navigation remain accessible |
| JavaScript fails | All chapters render in ordinary document flow |
| Project image fails | Figure keeps dimensions, alt/caption remain, page does not collapse |
| GSAP initialization fails | No content remains at opacity 0 or `visibility:hidden` |
| Lenis fails | Native scrolling and anchors still work |
| Form service unavailable | Form remains usable enough to explain the failure and preserve entered values |

## Accessibility baseline

- `lang="en"`, one `h1`, logical headings and landmarks.
- Focus ring at least 2px with sufficient contrast.
- Minimum body size remains legible; do not import reference microtype values.
- No `aria-hidden` container may contain unique meaningful proof.
- Links are links; form submission is a button; project previews are not fake buttons.
- Mobile menu announces expanded state and returns focus on close.
- Current-location or active section state is supplementary, not the only orientation signal.

## Performance budget

- First viewport: blueprint video **or** SVG fallback, not additional room video/WebGL/image sequence.
- No WebGL, canvas or third-party animation package.
- Lazy-load all project imagery below Mira's first required frame.
- Pause opening video when fully obscured/offscreen.
- Avoid animating layout properties in scrubbed timelines; use transforms and opacity.
- Remove `will-change` after long-lived transformations when practical.
- Establish final byte budgets only after licensed source assets are available; until then, reject uncompressed originals.

## Build steps

1. Create the content module with evidence metadata.
2. Establish the semantic page outline and real anchors.
3. Refactor header and mobile menu; replace remote typo-bearing mark with a confirmed placeholder gate.
4. Consolidate shared tokens and responsive primitives.
5. Harden Lenis and GSAP lifecycle ownership.
6. Create static mobile/reduced-motion layout first.
7. Implement section plans in master order.
8. Add enhanced motion only after static acceptance.

## Acceptance criteria

- All navigation targets exist and receive keyboard focus correctly.
- No unverified email or typo-bearing brand asset ships.
- One Lenis instance and no orphaned ScrollTriggers after navigation/remount.
- JavaScript-disabled/static rendering contains the full argument.
- Mobile menu is usable at 320px without compressed desktop links.
- Reduced-motion mode contains no pin, pulse or hidden content.
- All project claims come from centralized data with an evidence source.
- No dependency is added.

