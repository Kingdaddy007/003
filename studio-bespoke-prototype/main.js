import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Studio Bespoke Design — Risk Prototype Animation Controller

function initPage() {
  const preloader = document.getElementById("preloader");
  const enterBtn = document.getElementById("enter-button");
  const body = document.body;

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

    // Local file fail-safe: If after 300ms the video hasn't loaded (e.g. 404 or slow load), fall back to SVG sweep
    setTimeout(() => {
      if (!useVideo) {
        initArrivalTimeline(svgElement, false);
      }
    }, 300);
  } else {
    initArrivalTimeline(svgElement, false);
  }

  // 2. Preloader Arrival Timeline Generator
  function initArrivalTimeline(targetElement, isVideo) {
    if (window.arrivalTimelineInitialized) return;
    window.arrivalTimelineInitialized = true;

    const arrivalTl = gsap.timeline();

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
      .to(".preloader-mantra .word", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        stagger: 0.24,
        ease: "power2.out"
      }, 1.8)
      .to(".mantra-subtext", {
        opacity: 0.95, /* higher contrast visibility */
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, 2.8)
      // Show Scroll Cue
      .to(enterBtn, {
        opacity: 1,
        duration: 1.2
      }, 3.2);
  }

  // 3. Theatrical Dissolve Handshake
  // Trigger on click OR on scroll/wheel interaction
  let isDissolving = false;
  
  enterBtn.addEventListener("click", () => {
    if (!isDissolving) triggerPreloaderDissolve();
  });

  window.addEventListener("wheel", (e) => {
    if (!isDissolving && Math.abs(e.deltaY) > 5) {
      triggerPreloaderDissolve();
    }
  }, { passive: true });

  window.addEventListener("touchmove", () => {
    if (!isDissolving) {
      triggerPreloaderDissolve();
    }
  }, { passive: true });

  function triggerPreloaderDissolve() {
    isDissolving = true;
    
    const dissolveTl = gsap.timeline({
      onComplete: () => {
        preloader.style.display = "none";
        enableScroll();
        initScrollAnimations(); // Initialize ScrollTrigger after preloader is unmounted
      }
    });

    dissolveTl
      // A. Fade out foreground typography & scroll cue
      .to([enterBtn, ".preloader-mantra", ".mantra-subtext"], {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.08
      })
      // B. The Portal Zoom Transition: Dive camera directly through the blueprint lines
      .to(".blueprint-img", {
        scale: 1.4, /* Scales full-screen cover image up, expanding lines past screen */
        opacity: 0,
        duration: 2.0,
        ease: "power2.in"
      }, 0.2)
      // C. Fade out preloader background
      .to(".preloader-bg", {
        opacity: 0,
        duration: 1.8,
        ease: "power2.inOut"
      }, 0.4)
      // D. Animate the static logo badge filter to invert matching hero
      .to(".preloader-logo-badge", {
        filter: "brightness(0) invert(1)",
        duration: 1.2
      }, 0.5)
      // E. Handshake Reveal: Fade in and scale down finished villa photo
      .to(".hero-bg", {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "power2.inOut"
      }, 0.4)
      // F. Cascade in Hero Typography
      .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out"
      }, 1.4)
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, 1.7);
  }

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
    const pinTrigger = document.querySelector(".pinned-section");
    
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

}

initPage();
