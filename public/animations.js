// Minimal attribute-driven GSAP runtime for production
// This script auto-detects GSAP attributes and applies the correct animation plugin
// No UI, no React — just pure, optimized GSAP

// To use this file, include these CDN scripts in your HTML BEFORE this file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrambleTextPlugin.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js"></script>
// <script src="/animations.js"></script>

if (typeof window !== "undefined" && window.gsap) {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText, TextPlugin);
}

function animateByAttribute(el, type) {
  if (type === "scrolltrigger") {
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );
  } else if (type === "splittext") {
    const split = new SplitText(el, { type: "words,chars" });
    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.04,
        onComplete: () => split.revert(),
      }
    );
  } else if (type === "scrambletext") {
    gsap.to(el, {
      scrambleText: {
        text: el.textContent,
        chars: "upperAndLowerCase",
        revealDelay: 0.2,
        speed: 0.5,
      },
      duration: 1.2,
      ease: "power2.out",
    });
  } else if (type === "textplugin") {
    gsap.fromTo(
      el,
      { text: "" },
      {
        text: el.textContent,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }
}

function runGsapAttributeAnimations() {
  if (typeof window === "undefined") return;
  const map = [
    "scrolltrigger",
    "splittext",
    "scrambletext",
    "textplugin"
  ];
  map.forEach(type => {
    document.querySelectorAll(`[data-gsap="${type}"]`).forEach(el => {
      animateByAttribute(el, type);
    });
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(runGsapAttributeAnimations, 0);
  } else {
    window.addEventListener("DOMContentLoaded", runGsapAttributeAnimations);
  }
}
