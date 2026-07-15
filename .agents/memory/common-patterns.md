# Common Patterns - Studio Bespoke Design

**Date:** 2026-07-14  

---

## 1. System Upgrade Patterns
- **Shallow Directory Workaround on Windows:**
  - When compiling custom OS packages or building adapter payloads on Windows, clone the repository to a short, user-level folder (e.g., `C:\Users\godsw\os-temp`) before running installation scripts. This successfully bypasses file copy failures.

## 2. Git Governance Patterns
- **Branch Tracking Preservation:**
  - Always track the active user branch (e.g., `codex/chatgptibeliveyou`) and check status before executing file modifications or git commits.
- **Gitignore Local Backups:**
  - When creating local backup folders (e.g., `.agents/contexts-backup/`) to preserve historical files for user review, immediately append them to `.gitignore` to keep commits focused strictly on the production files.

## 3. Integrated Context Merging
  - When taking over a project with existing context files, cross-reference their research against a fresh live site scrape. Merge any specific technical findings (such as image file naming typos in uploads, broken counter code, and specific CSS layout guidelines) directly into the parent dossier rather than maintaining separate files.

## 4. Local Web Server & Hybrid Video Preloaders
- **Vite Integration for Interactive Prototyping:**
  - Transition flat codebases to Vite dev servers (`npm run dev`) immediately when incorporating rich media like video and custom web fonts to prevent local browser CORS blocks.
- **Dynamic Preloader Fallbacks:**
  - Implement dynamic script loaders that listen for video source triggers (`canplaythrough` vs `error`) and fall back to SVG masks if resources are not yet generated, guaranteeing the website is never stuck or blank.
