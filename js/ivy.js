/* Ivy Engine page: feature atlas. Without this script every group panel stays visible. */
(() => {
  "use strict";
  const root = document.querySelector("[data-atlas-root]");
  if (!root) return;
  const rows = Array.from(root.querySelectorAll("[data-atlas]"));
  const panels = Array.from(root.querySelectorAll(".atlas-panel"));
  if (!rows.length || !panels.length) return;

  function select(id, focusPanel) {
    rows.forEach((row) => row.setAttribute("aria-pressed", row.dataset.atlas === id ? "true" : "false"));
    panels.forEach((panel) => {
      if (panel.id === id) panel.removeAttribute("data-hidden");
      else panel.setAttribute("data-hidden", "");
    });
    if (focusPanel && window.matchMedia("(max-width: 900px)").matches) {
      const panel = document.getElementById(id);
      if (panel) panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  rows.forEach((row, i) => {
    row.addEventListener("click", () => select(row.dataset.atlas, true));
    row.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const next = rows[(i + (e.key === "ArrowDown" ? 1 : rows.length - 1)) % rows.length];
      next.focus();
      select(next.dataset.atlas, false);
    });
  });

  root.classList.add("is-live");
  const first = rows.find((row) => row.getAttribute("aria-pressed") === "true") || rows[0];
  select(first.dataset.atlas, false);
})();
