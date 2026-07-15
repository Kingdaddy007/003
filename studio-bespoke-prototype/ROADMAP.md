# Studio Bespoke Design — Website Roadmap & Transition Contract

This document captures our shared architectural understanding of the website structure, transition mechanics, and the roadmap for upcoming sprints. It serves as the primary alignment contract when starting new sessions.

---

## 1. The Opening Sequence (Preloader)

* **Initial State:** Scrolling is disabled on the body (`overflow: hidden`). The page is a textured, off-white "Limestone Paper" sheet (`#F7F5F2`).
* **Visual Reveal (Dual Mode):**
  * **SVG Mode (Fallback):** Standardized percentage `clip-path` wipe (`polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)` to `100%`) draws the high-resolution vector kitchen blueprint lines from left to right over `3.5s`.
  * **Video Mode (Primary):** The script checks for the presence of `blueprint_draft.mp4` in the project root. If found, it autoplays the video. The video has `mix-blend-mode: multiply` applied, blending the black architectural lines directly onto the Limestone paper background.
* **Typography Reveal:** The central mantra ("A great home is built around your family's daily routine.") is programmatically split into words. They fade in and focus softly using a blur filter (`filter: blur(0px)`) staggered at `1.8s`, after the blueprint outlines have swept across the page.
* **Scroll Cue:** The enter prompt ("SCROLL OR CLICK TO ENTER") fades in at `3.2s`.

---

## 2. The Hero Section Transition Handshake

When a user clicks the scroll cue, scrolls, or wheels down on the page:
1. **The Fade-Out:** The preloader container (`#preloader`) fades out smoothly (`opacity: 0`, duration `1.2s`) and is set to `display: none` to unmount it from the layout.
2. **Scroll Unlock:** Scrolling is restored to the body (`overflow: auto`, `height: auto`).
3. **Hero Entrance:** The Hero section (off-white grid structure, large typographic headings, and high-end image layout) fades in, with text sliding up slightly (`y: 30` to `y: 0`) to complete the transition.

---

## 3. Website Sections Roadmap (Beats 2–8)

The website is planned as an editorial, scroll-choreographed story. Here is what is mapped for the subsequent sections:
| Beat | Section Name | Focus & Concept | Visuals & Media | Interaction & Motion |
| :--- | :--- | :--- | :--- | :--- |
| **Beat 1** | **Arrival (Preloader)** | Technical sketch draw-in and opening sequence. | Dynamic video blend (`Kitchen_blueprint_...mp4`) or fallback SVG. | Auto-plays and transitions on scroll/click. |
| **Beat 2** | **The Life Inside (Hero)** | **Flexible Discussion Zone** — Layout and transition options to be decided. | Typographic narrative, editorial framing. | Custom scroll/reveal to be discussed. |
| **Beat 3** | **The Inherited Plan** | **Flexible Discussion Zone** — Structural tension of closed layouts. | Restrained prior architectural floor plan crop. | Parallax or reveal transition options. |
| **Beat 4** | **The Decisive Cut** | **Flexible Discussion Zone** — Pinned showcase of the Mira project. | Finished room layout, annotations, Marie Claire proof. | Scroll-bound desktop pinning to scrub annotations. |
| **Beat 5** | **Rituals Made Spatial** | **Flexible Discussion Zone** — Close-ups of design elements. | Material textures, coffee-nook, joinery details. | Controlled horizontal gallery sequence. |
| **Beats 6-8** | **Method & Invitation** | **Flexible Discussion Zone** — Sizing and fit-focused inquiry paths. | Case study grid (Zulal, Desert Leaf), minimal contact forms. | Clean reveals and focus state highlights. |

---

## 4. Alignment with Visual Storyboard & Inception Files

* **The Guide, Not a Cage:** The local `scroll-storyboard.md` and visual boards represent our strategic thinking on the *emotional narrative* (moving the visitor from preloader technical sketch -> hero -> tension -> proof -> detail -> invitation).
* **Dynamic Design Cycle:** While the **Opening Sequence (Beat 1)** is now fully coded and validated, all subsequent sections (Beats 2–8) are placeholder templates. The layout, typography, copy, and specific visual assets of the **Hero Section** and later chapters will be discussed, designed, and updated piece-by-piece in collaboration with you to match the high-end standard of the opening video.

---

## 5. Active Sprint & Next Actions

1. **AI Video Deployed & Linked:** The generated drawing video (`Kitchen_blueprint_drawing_animation_1080p_202607150143.mp4`) has been placed in the `/assets/` directory and linked in the codebase.
2. **Dynamic Playback Live:** The local Vite dev server at **[http://localhost:5174/](http://localhost:5174/)** is running. It dynamically loads your video, applies the Limestone paper multiply blend, and runs the preloader text stagger.
3. **Next Sprint Goal:** Review the live animation on localhost, and begin the creative conversation/exploration for the **Hero Section** layout and styling.

