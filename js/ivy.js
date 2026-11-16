/* Ivy Engine page: leaf <-> feature card highlight. */
(() => {
  const leaves = document.querySelectorAll(".vine-leaf[data-feat]");
  const cards = document.querySelectorAll(".ivy-feat[data-feat]");
  const set = (key, on) => {
    document.querySelectorAll(`[data-feat="${key}"]`).forEach((el) => el.classList.toggle("is-hot", on));
  };
  [...leaves, ...cards].forEach((el) => {
    el.addEventListener("pointerenter", () => set(el.dataset.feat, true));
    el.addEventListener("pointerleave", () => set(el.dataset.feat, false));
  });
})();

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
