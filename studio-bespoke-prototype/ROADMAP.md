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
| **Beat 2** | **The Life Inside** | Design begins with routine, not object. | Typographic declarative statement. | Quiet, staggered word fade-ins. |
| **Beat 3** | **The Inherited Plan** | The structural tension of a traditional, closed plan. | Restrained crop of prior architectural layout. | Vertical parallax drift on image. |
| **Beat 4** | **The Decisive Cut** | One structural change altered light, flow, and daily life. | Wide shot of Mira kitchen, walls removed annotations. | Pinned desktop slide. Scrubbing scroll maps to annotations. |
| **Beat 5** | **Rituals Made Spatial** | Highlight hidden, small details (joinery, coffee-nook). | Close-ups of material textures and layout details. | Controlled horizontal gallery procession. |
| **Beat 6** | **The Method Travels** | Showing the studio's spatial method at different scales. | Case studies (Zulal, Desert Leaf) in a split grid. | Smooth fade reveals. |
| **Beat 7** | **The Hand Behind Ease** | Production capability and detailed execution. | Restrained detail sheets, material specifications. | Vertical rule drawing, structured text. |
| **Beat 8** | **Invitation** | Qualify and capture high-intent inquiries. | Clean layout and fit-focused inquiry form. | Smooth focus states. |

---

## 4. Active Sprint & Next Actions

1. **AI Video Generation:** The user is currently generating a 4–6 second drawing animation (`blueprint_draft.mp4`) using Google video models (Veo / Gemini Omni) from the source kitchen image.
2. **Deploy Video:** Once generated, drop `blueprint_draft.mp4` directly into the `studio-bespoke-prototype/` folder.
3. **Verification:** Refresh the localhost server to confirm the video plays and blends seamlessly with the Limestone paper.
4. **Hero Build:** Begin styling the full Hero section content and coding the scroll triggers for Beat 2 and Beat 3.
