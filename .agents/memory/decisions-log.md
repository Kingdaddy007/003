# Decisions Log - Studio Bespoke Design

**Date:** 2026-07-14  
**Target:** Studio Bespoke Design (Dubai, UAE)  
**Active Branch:** `codex/chatgptibeliveyou`

---

## 1. Selected Prospect & Target
- **Target Selection:** Studio Bespoke Design was chosen for Phase 1 Inception due to the highest website gap score and significant premium leaks (0-counters, broken links, email spelling discrepancies).
- **Core Concept Selection:** Approved the strategic concept **"The Architecture of Everyday Rituals"**, pivoting the studio from generic decorator copy to high-integrity residential interior architecture.

## 2. OS Environment Alignment
- **Payload Upgrade:** Fully updated the local system configurations in `C:\Users\godsw\.gemini\config` to Version 3 of the Anti-Gravity OS.
- **Workflow Standard:** Adopted the 5-artifact model (`evidence-dossier.md`, `creative-brief.md`, `concept-directions.md`, `experience-blueprint.md`, `production-plan.md`) defined in the `BEVAMPED_DESIGN_WORKFLOW_AUDIT.md` refactor.
- **Artifact Location:** Consolidated all active Version 3 inception files inside the restored `studio-bespoke-inception/` folder, removing duplicate contexts under `.agents/` to keep the workspace clean.
- **Outreach Risk Protocol:** Documented the spelling mismatch (`studiobspoke` on contact body vs `studiobespoke` on footer/domain) to ensure any future cold emails are routed safely.

## 3. Transition to Vite & Preloader Handshake
- **Stack Migration:** Upgraded the flat HTML/CSS/JS prototype folder into a Vite development environment to resolve local browser CORS constraints on videos and custom fonts.
- **Preloader Reveal Mechanic:** Replaced individual path stroke rendering (which caused double-stroke blurriness on traced SVG shapes) with a container-level horizontal `clip-path` sweep and a hybrid check that autoplays `blueprint_draft.mp4` when dropped in.
- **Section Roadmap:** Created `ROADMAP.md` inside `studio-bespoke-prototype/` to document the preloader-to-hero transition handshake and beats 2-8 website roadmap.

## 4. Living Threshold Hero — Current Best Version

**Date:** 2026-07-17

- **Implementation location:** `studio-bespoke-next/app/concepts/living-threshold/`
- **Preview route:** `http://127.0.0.1:3000/concepts/living-threshold`
- **Status:** Best hero version achieved so far, close to approval but not final. The user must still review minor visual and motion issues.
- **Arrival:** Studio Bespoke identity opens into the room through a circular threshold/aperture before the hero typography appears.
- **Hero media:** Damac Hills residential image and its generated six-second room/pool video are the active visual assets.
- **Scroll behavior:** GSAP/ScrollTrigger maps vertical progress to a target video time. A guarded `requestAnimationFrame` loop updates `video.currentTime` only when the previous seek has finished. This reduced seek flooding, but smoothness still requires user approval and may ultimately require optimized encoding or a canvas frame sequence.
- **Text color:** Hero interface typography changed from hard black to warm ivory (`#f2eee5`) with restrained localized contrast.
- **Responsive fallback:** At 720px and below, and for reduced-motion users, the hero remains poster-based rather than running the heavy scrub interaction.
- **Copy currently implemented:**
  1. `Made personal.` / `Spaces shaped around the way you live.`
  2. `Designed as a whole.` / `Full turnkey and worldwide interior design.`
- **Unresolved copy decision:** There is no third copy beat in the current implementation. Decide whether the six-second visual genuinely supports a third beat, establish its communication job and wording, then choreograph it. Do not add it merely to fill time.
- **Authoritative working references:** `studio-bespoke-inception/portfolio_gallery.md` for approved/local brand assets and project provenance; `studio-bespoke-inception/brand-evolution-experience-blueprint.md` for the current brand-homepage direction. Older project-story plans remain historical context and must not silently override the newer brand evolution direction.
- **Skill follow-up:** Do not revise or create the reusable video-scroll skill until this hero is approved as smooth and correct. After approval, document the verified guarded-seek pattern, encoding/keyframe requirements, text synchronization, frame-sequence escalation criteria, loading strategy, mobile fallback, and reduced-motion behavior.
