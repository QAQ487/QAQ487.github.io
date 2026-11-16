/* Ivy Engine page: game preview loops. They play only while on screen, and never for reduced-motion users. */
(() => {
  const videos = Array.from(document.querySelectorAll(".ivy-game video"));
  if (!videos.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const stopAll = () => videos.forEach((v) => { v.pause(); v.removeAttribute("autoplay"); });
  if (reduce.matches) { stopAll(); return; }
  reduce.addEventListener("change", (e) => { if (e.matches) stopAll(); });

  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (reduce.matches) return;
      if (isIntersecting) target.play().catch(() => {});
      else target.pause();
    });
  }, { threshold: 0.25 });
  videos.forEach((v) => io.observe(v));
})();
