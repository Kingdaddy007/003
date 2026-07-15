import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Studio Bespoke Design — Risk Prototype Animation Controller

function initPage() {
  const preloader = document.getElementById("preloader");
  const enterBtn = document.getElementById("enter-button");
  const body = document.body;

  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Check for prefers-reduced-motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    // Immediate bypass for accessibility
    gsap.set(preloader, { display: "none" });
    gsap.set(".hero-bg", { opacity: 1, scale: 1 });
    gsap.set(".hero-title, .hero-subtitle", { opacity: 1, y: 0 });
    enableScroll();
    initScrollAnimations();
    return;
  }

  // 1. Initial State: Lock Scrolling & Split Text programmatically by word for clean, premium reveal
  disableScroll();

  const mantra = document.querySelector(".preloader-mantra");
  if (mantra) {
    const rawText = mantra.textContent.trim();
    // Normalize spaces and split by word
    const words = rawText.split(/\s+/);
    mantra.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
  }

  // Look for the already inlined SVG blueprint in the DOM
  const svgElement = document.getElementById("blueprint-svg");
  const videoElement = document.getElementById("blueprint-video");
  
  // Set up dynamic video loader
  let useVideo = false;
  let attempts = 0;
  if (videoElement) {
    // Attempt loading the user's specific generated video from the assets folder first
    videoElement.src = "../assets/Kitchen_blueprint_drawing_animation_1080p_202607150143.mp4";
    
    // Multi-stage fallback loop
    videoElement.addEventListener("error", () => {
      if (attempts === 0) {
        attempts++;
        console.log("Assets video not found, falling back to local folder video...");
        videoElement.src = "blueprint_draft.mp4"; // local folder fallback
      } else {
        console.log("Preloader video source not found, falling back to SVG vector sweep.");
        initArrivalTimeline(svgElement, false);
      }
    });

    // If video is ready to play, hide the SVG and play the video
    videoElement.addEventListener("canplaythrough", () => {
      if (!useVideo) {
        useVideo = true;
        console.log("Cinematic background video loaded successfully.");
        videoElement.style.display = "block";
        if (svgElement) svgElement.style.display = "none";
        initArrivalTimeline(videoElement, true);
      }
    }, { once: true });

    // Local file fail-safe: If after 2500ms the video hasn't loaded (e.g. 404 or slow load), fall back to SVG sweep
    setTimeout(() => {
      if (!useVideo) {
        console.log("Video load timed out after 2500ms, falling back to SVG vector sweep.");
        initArrivalTimeline(svgElement, false);
      }
    }, 2500);
  } else {
    initArrivalTimeline(svgElement, false);
  }

  // 2. Preloader Arrival Timeline Generator
  function initArrivalTimeline(targetElement, isVideo) {
    if (window.arrivalTimelineInitialized) return;
    window.arrivalTimelineInitialized = true;

    const arrivalTl = gsap.timeline({
      onComplete: () => {
        enableScroll();
        initCrystallizationScrub();
        initScrollAnimations();
      }
    });

    arrivalTl
      // Animate Corporate Logo Badge in the corner
      .to(".preloader-logo-badge", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      });

    if (isVideo) {
      // Play the generated draw video natively
      targetElement.play();
      arrivalTl.to(targetElement, {
        opacity: 0.35, /* match watermark contrast */
        duration: 1.2,
        ease: "power2.out"
      }, 0.2);
    } else {
      // Slow, elegant left-to-right clip-path sweep of the razor-sharp SVG blueprint!
      // This preserves 100% of the vector lines' sharpness with absolute percentage syntax.
      arrivalTl.fromTo(targetElement, 
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0 },
        { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
          opacity: 0.35, /* high contrast sharpness */
          duration: 3.5, /* slow, cinematic draw-in */
          ease: "power2.inOut" 
        },
        0.2
      );
    }

    arrivalTl
      // Run the Sunbeam Sweep light glare horizontally across the screen
      .fromTo(".sunbeam-sweep",
        { opacity: 0, x: -300 },
        { opacity: 1, x: window.innerWidth + 300, duration: 3.5, ease: "power2.inOut" },
        0.4
      )
      // Quiet & Elegant Typography Reveal: Staggered word fade-ins with soft blur focusing
      // Delayed until 3.2s so the blueprint line drawing completes its sweep in clean silence
      .to(".preloader-mantra .word", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        stagger: 0.24,
        ease: "power2.out"
      }, 3.2)
      .to(".mantra-subtext", {
        opacity: 0.95, /* higher contrast visibility */
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, 4.2)
      // Show Scroll Cue
      .to(enterBtn, {
        opacity: 1,
        duration: 1.2
      }, 4.5);
  }

  // 3. Scroll-Scrubbed Crystallization Handshake (GSAP ScrollTrigger)
  function initCrystallizationScrub() {
    // Unhide hero elements initially in preparation for the scrub
    gsap.set(".hero-bg", { opacity: 0 });
    gsap.set([".hero-title", ".hero-subtitle"], { opacity: 0, y: 30 });
    
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=120%", /* Scroll distance for full crystallization */
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onLeave: () => {
          // Hide preloader pointer events entirely once user is past the fold
          gsap.set("#preloader", { display: "none", pointerEvents: "none" });
        },
        onEnterBack: () => {
          // Restore preloader when scrolling back up
          gsap.set("#preloader", { display: "block", pointerEvents: "auto" });
        }
      }
    });

    scrubTl
      // A. Fade out preloader typography and cue rapidly
      .to([".mantra-text-wrapper", "#enter-button"], {
        opacity: 0,
        y: -40,
        duration: 0.35,
        ease: "power1.inOut"
      }, 0)
      // B. Cross-fade blueprint lines/preloader background to hero
      .to(["#blueprint-video", "#blueprint-svg", ".preloader-bg"], {
        opacity: 0,
        duration: 0.75,
        ease: "power1.inOut"
      }, 0.1)
      // C. Fade in finished room photograph on top of the same layout coordinates
      .fromTo(".hero-bg",
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.0, ease: "power1.inOut" },
        0
      )
      // D. Cascade in Hero Typography
      .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out"
      }, 0.45)
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out"
      }, 0.6)
      // Safety gate to hide preloader container overlay at end of scrub
      .to("#preloader", {
        opacity: 0,
        duration: 0.8
      }, 0.1);
  }

  // Handle click on scroll cue to trigger smooth scroll transition
  enterBtn.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight * 1.2,
      behavior: "smooth"
    });
  });

  // Helper scroll-lock functions
  function disableScroll() {
    body.style.overflow = "hidden";
    body.style.height = "100vh";
  }

  function enableScroll() {
    body.style.overflow = "";
    body.style.height = "";
  }

  /* ========================================================
     4. SCROLL-BOUND ANIMATIONS (GSAP SCROLLTRIGGER)
     ======================================================== */
  function initScrollAnimations() {
    
    // --- Hero Sticky Reveal Parallax ---
    // The hero is position: sticky. As you scroll, the image scales up until the next section slides over it.
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false
      }
    });

    // Scale the background image slightly to "bring the user into the room"
    heroTl.to(".hero-bg", {
      scale: 1.15,
      ease: "none"
    }, 0);

    // --- Tension Section ---
    const pinTrigger = document.querySelector(".pinned-section");
    if (!pinTrigger) return;
    
    // Create master pin scroll trigger
    ScrollTrigger.create({
      trigger: pinTrigger,
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (progress < 0.5) {
          document.getElementById("step-1").classList.add("active");
          document.getElementById("step-2").classList.remove("active");
          
          document.getElementById("anno-walls").classList.add("visible");
          document.getElementById("anno-island").classList.remove("visible");
        } else {
          document.getElementById("step-1").classList.remove("active");
          document.getElementById("step-2").classList.add("active");
          
          document.getElementById("anno-walls").classList.remove("visible");
          document.getElementById("anno-island").classList.add("visible");
        }
      }
    });

    // Parallax details transition
    gsap.from(".tension-img", {
      scrollTrigger: {
        trigger: "#tension",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      yPercent: 15,
      ease: "none"
    });
  }

  // Set timeline callbacks to chain activation
  window.addEventListener("load", () => {
    // If arrival timeline is initialized, set its onComplete callback
    const checkTlInterval = setInterval(() => {
      if (window.arrivalTimelineInitialized) {
        clearInterval(checkTlInterval);
      }
    }, 100);
  });
  
  // Directly attach the initialization callback to the primary timeline
  window.addEventListener("DOMContentLoaded", () => {
    // We already setup the arrivalTl inside initArrivalTimeline, so we'll configure its onComplete directly there.
  });
}

initPage();
