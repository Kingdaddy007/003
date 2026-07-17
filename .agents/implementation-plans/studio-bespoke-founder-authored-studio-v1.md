# Studio Bespoke Founder Section — The Authored Studio

**Plan ID:** `studio-bespoke-founder-authored-studio-v1`  
**Status:** Approved for delegated implementation  
**Decision class:** Type 2 — reversible section-level prototype  
**Branch:** `codex/chatgptibeliveyou`  
**Required base commit:** `286aa349f6c38d7010970ea399cee85e6515139f`  
**Target route:** `http://127.0.0.1:3000/concepts/living-threshold`  
**Integrity:** See the adjacent `.manifest.json` file.  
**Owner:** Delegated Anti-Gravity implementation agent  
**Reviewer:** Primary Codex task  

## 1. Objective

Add the second homepage chapter, **The Studio / Founder**, immediately after the approved Living Threshold hero.

The section must convert the hero promise “Made personal” into credible authorship. Visitors should understand that Studio Bespoke is led by a qualified creative lead whose work begins with understanding how people live.

The section must feel authored and spatial without becoming a second cinematic hero. It must release the page from the pinned room sequence into a calm editorial founder composition.

## 2. Context inheritance and authority

Read these files before changing code, in this order:

1. `AGENTS.md` from the workspace instructions already supplied to the task.
2. `studio-bespoke-next/AGENTS.md`.
3. `.agents/workflows/studio-bespoke-hero-finalization.json`.
4. `studio-bespoke-inception/brand-evolution-experience-blueprint.md`.
5. `studio-bespoke-inception/evidence-dossier.md`.
6. `studio-bespoke-inception/portfolio_gallery.md` only for provenance; do not modify it.
7. Existing Living Threshold source files under `studio-bespoke-next/app/concepts/living-threshold/`.

Authority rules:

- `brand-evolution-experience-blueprint.md` governs the active brand-homepage direction.
- Older Mira-led implementation plans are historical context and must not override this plan.
- Do not invent founder credentials, project claims, services, testimonials, or contact information.
- Do not alter the approved hero copy, hero timing, video scrub implementation, entrance sequence, or navigation.

## 3. Approved concept

**Concept name:** The Authored Studio  
**Journey stage:** Recognition → authorship  
**Desired visitor belief:** “The work is personal because a qualified creative lead is closely involved.”  
**Physical law:** A full-screen designed environment releases into an editorial studio sheet; separated portrait planes align into one composed portrait.  
**Motion job:** Shift from atmosphere to proof by revealing the person responsible for the work.  
**Stillness alternative:** A complete portrait-and-copy editorial spread.  
**Media type:** Verified still portrait plus authentic signature asset.  
**Scroll behavior:** Free vertical flow with a short, reversible ScrollTrigger reveal. No pinning.  
**Prompt requirement:** None. No generated media is approved or needed.

## 4. Approved content

Use this content exactly for the first implementation pass:

**Section label**

`02 / The Studio`

**Heading**

`Personal begins with listening.`

Render the heading as three controllable lines:

1. `Personal`
2. `begins with`
3. `listening.`

**Body copy**

`Studio Bespoke is led by Brittany Guimaraes, whose approach begins with understanding how people live — then carries that understanding through every design decision.`

**Founder identification**

`Brittany Guimaraes`  
`Founder / Interior Designer / Dubai`

**Link**

Label: `About the studio`  
Prototype destination: `https://studiobespoke.design/about-us/`

Do not add LEED GA, years of experience, worldwide-delivery claims, awards, statistics, or testimonials to this section in v1.

## 5. Approved assets and provenance

Download the assets into this new directory:

`studio-bespoke-next/public/images/studio-founder/`

### 5.1 Founder portrait

Source:

`https://studiobespoke.design/wp-content/uploads/2025/12/Britt-33-scaled-e1765790663961.jpg`

Local destination:

`studio-bespoke-next/public/images/studio-founder/brittany-guimaraes-founder.jpg`

Accessible alternative text:

`Brittany Guimaraes, founder of Studio Bespoke Design`

### 5.2 Authentic signature

Source:

`https://studiobespoke.design/wp-content/uploads/2021/01/autograph-01.png`

Local destination:

`studio-bespoke-next/public/images/studio-founder/brittany-guimaraes-signature.png`

The signature is an authentic raster asset, not a font. Preserve its proportions and visible mark. Do not imitate it with a handwriting font, redraw it, AI-generate it, or treat an automatic vector trace as the production signature.

The image is decorative when the founder’s name is already present as text. Render it with empty alternative text and `aria-hidden="true"`.

### 5.3 Asset integrity

After download:

- Record file dimensions and byte sizes.
- Generate SHA-256 and MD5 hashes for both local assets.
- Add those values to the implementation report.
- If either download fails or resolves to HTML rather than an image, stop and report the blocker. Do not substitute another image.

These public assets are approved for this local concept prototype only. Do not deploy or publish them as production assets without an explicit rights confirmation.

## 6. Composition contract

### 6.1 Desktop, 1200px and wider

- Section background: warm paper/ivory, distinct from the dark hero.
- Minimum height: between `110svh` and `130svh`; prefer `120svh` initially.
- Do not pin the section.
- Use the existing page gutter and a 12-column layout.
- Text field: columns 1–6.
- Portrait field: columns 7–12.
- Portrait frame: vertical `4 / 5` composition, max-height constrained so the full editorial grouping remains readable within a normal desktop viewport.
- The founder’s face, hands, and chair silhouette must remain unobscured.
- The signature belongs beneath the body/identity field or at the text–portrait seam only if it never crosses the face, hands, or link.
- Use one thin architectural rule as a quiet transition device.
- Avoid rounded cards, glass panels, drop-shadow cards, decorative blobs, generic luxury ornaments, or equal card grids.

### 6.2 Tablet, 721px–1199px

- Preserve the editorial asymmetry.
- Use a narrower 7/5 or 6/6 relationship depending on portrait crop safety.
- Reduce headline size before changing line breaks.
- Keep the signature within the text field.
- No horizontal overflow.

### 6.3 Mobile, 720px and below

- Use ordinary document flow.
- Section label and heading first.
- One complete portrait image second.
- Body, founder identity, signature, and link afterward.
- Do not render the three-panel convergence mechanic.
- A short portrait crossfade or `clip-path` entrance is optional, but the complete section must remain understandable with no animation.
- Use a crop that preserves Brittany’s face and seated posture.
- Target section height must be content-driven, not a long cinematic scroll runway.

## 7. Component and file contract

### 7.1 Allowed code changes

Modify only:

- `studio-bespoke-next/app/concepts/living-threshold/page.js`
- `.agents/workflows/studio-bespoke-hero-finalization.json` after successful verification

Create:

- `studio-bespoke-next/app/concepts/living-threshold/founder-section.js`
- `studio-bespoke-next/app/concepts/living-threshold/founder-section.module.css`
- `studio-bespoke-next/public/images/studio-founder/brittany-guimaraes-founder.jpg`
- `studio-bespoke-next/public/images/studio-founder/brittany-guimaraes-signature.png`

### 7.2 Forbidden changes

Do not modify:

- `threshold-entrance.js`
- `threshold-scroll-media.js`
- `threshold-smooth-scroll.js`
- Existing Living Threshold hero CSS rules unless a verified integration defect makes a minimal change unavoidable.
- Hero media files.
- Global navigation.
- `studio-bespoke-inception/portfolio_gallery.md`.
- The two unrelated untracked media files already present in `studio-bespoke-next/public/images/`.
- Dependencies, lockfiles, Next.js configuration, or global tooling.

Do not commit, push, deploy, publish, or submit external forms.

## 8. DOM and accessibility structure

Create a client component named `FounderSection`.

Recommended semantic structure:

```text
section[aria-labelledby="founder-section-title"]
  div — architectural top rule
  div — editorial grid
    div — copy field
      p — section label
      h2#founder-section-title
        span line 1
        span line 2
        span line 3
      p — body copy
      div — founder identity
      img — decorative authentic signature
      a — About the studio
    figure — portrait field
      div — base portrait, semantic image
      div[aria-hidden] — three temporary panel layers
```

Accessibility requirements:

- Use one `h2` for the section heading.
- Maintain logical reading order independent of visual layout.
- Only the base portrait carries meaningful alternative text.
- Panel copies and signature are decorative and hidden from assistive technology.
- The About link must have a visible focus state.
- Text contrast must meet WCAG AA.
- No meaning may depend on animation.

## 9. Portrait construction

Use a seam-safe four-layer portrait system:

1. One base portrait layer covering the full frame.
2. Three temporary duplicate portrait layers, each clipped to one vertical third.
3. All four layers must use exactly the same object-fit and object-position values.
4. During the reveal, the three clipped layers converge from small horizontal offsets.
5. Once aligned, crossfade to the single base portrait and hide the three temporary layers.

This final crossfade prevents persistent anti-alias seams between clipped panels.

Initial desktop motion values:

- Left panel: `xPercent: -8` → `0`.
- Centre panel: `yPercent: 3` → `0`.
- Right panel: `xPercent: 8` → `0`.
- Panel image scale: `1.045` → `1`.
- Initial panel clip widths may be slightly narrower than their final thirds, but no content may disappear at completion.
- Base layer: `autoAlpha: 0` → `1` only after alignment.
- Temporary layers: `autoAlpha: 1` → `0` as the base layer arrives.

If the duplicated-image approach produces crop mismatch, flicker, loading flashes, or persistent seams, simplify to one portrait with a single vertical architectural reveal. Correctness and image quality outrank novelty.

## 10. GSAP choreography

Use the existing `gsap` and `ScrollTrigger` exports from `@/lib/motion`. Do not register a new animation library.

Use `gsap.context()` scoped to the section and `gsap.matchMedia()` for desktop/reduced-motion separation. Revert both during cleanup.

### 10.1 ScrollTrigger contract

- Trigger: founder section root.
- Start: approximately `top 88%`.
- End: approximately `top 18%`.
- Scrub: between `0.25` and `0.4`; begin with `0.32`.
- Pin: `false`.
- Invalidate on refresh: `true`.
- The animation must reverse cleanly when scrolling upward.
- Lenis remains infrastructure only; do not instantiate another Lenis instance.

### 10.2 Timeline sequence

Use a normalized timeline. Initial target ranges:

| Progress | Event |
| --- | --- |
| 0.00–0.18 | Architectural rule extends from left to right. |
| 0.08–0.46 | Three portrait planes converge; internal image scale settles. |
| 0.24–0.52 | Heading lines move from offset drafting positions onto one shared grid. |
| 0.45–0.62 | Base portrait replaces temporary panel layers. |
| 0.52–0.72 | Body copy and founder identity resolve. |
| 0.68–0.88 | Authentic signature reveals left-to-right. |
| 0.78–0.94 | About link and its rule become fully available. |
| 0.94–1.00 | Complete still composition; no ambient movement. |

### 10.3 Drafting-alignment typography

Do not use another generic fade-up.

- Each heading line must sit inside an overflow-hidden wrapper.
- Begin line 1 slightly left, line 2 slightly right, and line 3 slightly left or centred according to the final grid.
- Combine restrained `xPercent` travel with a small vertical reveal.
- Finish every line at exact integer or visually stable positions to avoid blurred type.
- Use `power3.out` for non-scrub fallback entrances; the scrubbed timeline may use `none` or near-linear interpolation where appropriate.
- Do not rotate, bounce, overshoot, split into individual characters, or scramble text.

### 10.4 Signature reveal

Use the authentic PNG. Do not use GSAP DrawSVG on the raster image.

V1 behavior:

- Place the image in an overflow-hidden wrapper.
- Animate `clip-path: inset(0% 100% 0% 0%)` to `inset(0% 0% 0% 0%)`.
- A narrow soft leading gradient may travel with the reveal to reduce the appearance of a hard rectangular wipe.
- Keep the signature proportions unchanged.
- Do not attempt to reconstruct handwriting order without an approved vector source.

## 11. Hero-to-founder transition

Render `<FounderSection />` immediately after the existing Living Threshold story section inside the page `<main>`.

The hero must finish normally. The founder section’s warm paper background then enters through ordinary vertical scrolling and visually replaces the full-screen room.

Requirements:

- No second pinned transition.
- No hero fade-to-black.
- No rounded “card” rising over the room.
- No jump in scroll position.
- No white seam between sections.
- The final hero message must remain readable until the founder section actually reaches it.
- The founder section must not query or mutate the hero video timeline.

## 12. Visual tokens

Begin with these values, then adjust only for verified contrast or image harmony:

- Warm paper: `#e8e0d4`.
- Primary ink: `#171a17`.
- Muted ink: `#6d655b`.
- Hairline: `rgba(23, 26, 23, 0.24)`.
- Signature: use the authentic source color; do not recolor unless necessary for contrast and approved in review.
- Reuse the project’s existing serif and sans-serif font variables.

Typography posture:

- Display heading: serif, spatial, decisive.
- Body: quiet editorial sans-serif.
- Section label and founder identity: small uppercase or restrained tracked sans-serif.
- Do not introduce a handwriting font.

## 13. Reduced motion and failure behavior

### 13.1 Reduced motion

When `prefers-reduced-motion: reduce` matches:

- Do not create the ScrollTrigger timeline.
- Show the base portrait immediately.
- Hide temporary portrait panels.
- Show all text, signature, rule, and link in their completed state.
- Keep ordinary vertical flow.

### 13.2 Asset failure

- Text, founder identity, and About link must remain visible if the portrait fails.
- Give the portrait frame a deliberate warm-neutral background rather than leaving a broken blank area.
- If the signature fails, hide its wrapper; do not show a broken-image icon.
- Do not block or delay the section while waiting for either asset.

## 14. Performance contract

- Use local optimized images after download.
- Use `next/image` for the semantic base portrait.
- Do not mark the founder portrait as priority; the hero already owns first-viewport priority.
- Provide an accurate `sizes` value.
- Avoid layout shift by fixing the portrait aspect ratio before load.
- Duplicate panel layers may reuse the same cached local portrait source.
- Do not add video, canvas, WebGL, frame sequences, or new dependencies.
- Remove `will-change` after animation when practical; do not apply it globally.

## 15. Implementation sequence

1. Confirm branch and base commit.
2. Inspect git status; preserve all unrelated changes.
3. Read the authority files listed in section 2.
4. Download and validate the approved portrait and signature.
5. Record asset dimensions, byte sizes, SHA-256, and MD5.
6. Build the static semantic founder section first.
7. Verify desktop, tablet, mobile, no-JS/static readability, and asset failure fallbacks.
8. Add the three-panel portrait convergence.
9. Add drafting-alignment typography.
10. Add the authentic signature reveal.
11. Integrate the section immediately after the hero.
12. Verify forward and reverse scrolling.
13. Verify reduced motion.
14. Run targeted ESLint and the production build.
15. Perform browser verification at desktop and mobile widths.
16. Update the workflow JSON with implementation evidence and remaining review questions.
17. Stop without committing or pushing.

## 16. Verification contract

### 16.1 Static structure

- Section exists immediately after the hero.
- Correct heading, copy, founder identity, signature, portrait, and About link are present.
- DOM reading order is logical.
- Portrait and text remain legible without motion.

### 16.2 Desktop motion

- Hero releases without a scroll jump.
- Portrait panels visibly converge into one seamless final image.
- Final image contains no persistent panel seams.
- Heading uses drafting alignment, not a generic fade-up.
- Signature reveal uses the authentic asset.
- Animation stops completely after resolution.
- Reverse scrolling restores the initial state cleanly.
- No second pin exists.

### 16.3 Mobile

- No three-panel mechanic.
- No horizontal overflow.
- Portrait crop preserves face and seated posture.
- Copy is readable at 320px, 375px, and 430px widths.
- Section height is content-driven.

### 16.4 Reduced motion

- Complete static section appears immediately.
- No ScrollTrigger is created for founder animation.
- No required content is hidden.

### 16.5 Engineering

Run:

```text
npx eslint app/concepts/living-threshold/page.js app/concepts/living-threshold/founder-section.js
npm run build
git diff --check
```

Browser verification must confirm:

- No console errors or warnings introduced by this section.
- ScrollTrigger and Lenis remain synchronized.
- Existing hero forward/reverse behavior still works.
- Founder animation works forward and in reverse.
- Failed signature does not show a broken image.
- No visible layout shift when the portrait arrives.

## 17. Definition of done

The implementation is review-ready only when:

1. The founder section communicates personal authorship without a long biography.
2. The portrait treatment feels distinctive but calm.
3. The signature is authentic and not recreated as a font.
4. The hero remains unchanged and verified.
5. Desktop, tablet, mobile, reduced-motion, and failure states work.
6. Targeted ESLint, production build, and `git diff --check` pass.
7. Browser verification reports no new runtime warnings or errors.
8. The implementation report lists changed files, asset hashes, verification evidence, compromises, and remaining subjective review questions.
9. No commit, push, deployment, or unrelated cleanup has occurred.

## 18. Required implementation report

Return a concise report containing:

- Summary of what was built.
- Exact changed and created files.
- Portrait and signature dimensions, byte sizes, SHA-256, and MD5.
- Motion implementation details.
- Desktop/mobile/reduced-motion behavior.
- Commands run and results.
- Browser verification evidence.
- Any deviations from this plan and why.
- Remaining visual questions for the reviewer.

## 19. Delegation instruction

Use this exact instruction with the Anti-Gravity CLI:

```text
Implement the approved plan at C:\Users\godsw\ANTIGRAVITY  WORKSPACE\003\.agents\implementation-plans\studio-bespoke-founder-authored-studio-v1.md. Read the entire plan and every authority file it names before editing. Work only on the founder-section scope, preserve all unrelated user changes and untracked assets, and do not alter the approved Living Threshold hero behavior. Complete every verification step in the plan. Do not commit, push, deploy, publish, install dependencies, or modify global configuration. When finished, return the required implementation report and stop for Codex review.
```
