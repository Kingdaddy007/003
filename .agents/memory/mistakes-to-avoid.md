# Mistakes to Avoid - Studio Bespoke Design

**Date:** 2026-07-14  
**Target:** Studio Bespoke Design (Dubai, UAE)  

---

## 1. Technical & Platform Bottlenecks
- **Windows MAX_PATH Length Limit:**
  - *Mistake:* Cloning the OS repository or running python builds deep inside the Gemini App Data/scratch directories. This leads to paths exceeding the 260-character limit, causing `shutil.copytree` to throw `[WinError 3] The system cannot find the path specified`.
  - *Avoidance:* Eagerly use a shallow temp directory (e.g., `C:\Users\godsw\os-temp`) for cloning, building, and running installation scripts, then clean it up afterwards.

## 2. Inception Workflow Governance
- **Outdated Global Templates:**
  - *Mistake:* Blindly executing the global `/workflow-spatial-project-inception` templates before cross-referencing local workspace design audits. This led to creating old Version 1 files (`project-context.md`, `brand-diagnostics.md`) that conflicted with the user's refactored 5-artifact model.
  - *Avoidance:* Always check for a local `BEVAMPED_DESIGN_WORKFLOW_AUDIT.md` or similar refactoring doctrine first, and update the global OS payload to align them before writing contexts.
  - *Avoidance:* Eagerly run a git status check on startup to check for untracked folders or files written by previous runs, and ask the user for confirmation before initializing new files.

## 3. SVG & CSS Interpolation Mistakes
- **Clip-Path Unit Mismatches in CSS/GSAP:**
  - *Mistake:* Trying to interpolate polygon paths where some coordinates are unitless (like `0`) and others have percentages (like `100%`). This causes browsers to fail to transition the clip-path.
  - *Avoidance:* Always use matching percentage units for all points (`0%` and `100%`) when animating CSS clip-paths.
- **GSAP Stroke Outlines on Traced SVG Geometries:**
  - *Mistake:* Forcing a JS stroke and dash-array onto vector paths created by Figma's Image Tracer. Image Tracer creates shapes representing lines (polygons), so adding a stroke draws borders on both sides of the line, doubling its thickness and creating fuzzy, blurred edges.
  - *Avoidance:* Preserve native vector path fills without strokes. Use container-level masks or clip-paths for sketching reveals to keep original vector sharpness.

## 4. Scroll-Scrubbed Video Mistakes

- **Continuous direct writes to `video.currentTime`:**
  - *Mistake:* Tweening `video.currentTime` directly on every GSAP update can queue new seeks while the decoder is still seeking, producing visible stutter, freezes, or delayed reverse playback.
  - *Avoidance:* Let scroll update a target time, then use a guarded render loop that seeks only while `video.seeking === false`. Treat this as a prototype until human visual review confirms it. If source keyframe spacing still prevents smooth reverse scrubbing, escalate deliberately to an optimized all-intra encode or a preloaded canvas frame sequence.
- **Declaring motion smooth from numeric state alone:**
  - *Mistake:* Browser timestamps and error-free logs prove synchronization wiring, not perceived fluidity.
  - *Avoidance:* Require user-visible forward, reverse, fast-scroll, and stop/settle review before marking a cinematic scrub interaction complete.
