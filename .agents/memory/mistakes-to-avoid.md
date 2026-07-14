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
- **Duplicate Context Clutter:**
  - *Mistake:* Writing contexts directly to `.agents/contexts/` without checking if the user already had them in another branch folder like `studio-bespoke-inception/`.
  - *Avoidance:* Eagerly run a git status check on startup to check for untracked folders or files written by previous runs, and ask the user for confirmation before initializing new files.
