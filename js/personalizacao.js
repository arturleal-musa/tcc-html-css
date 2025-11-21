(function () {
  const trigger = document.querySelector("[data-trigger-pintura]");
  const bar = document.querySelector(".custom-paint");

  if (trigger && bar) {
    trigger.addEventDefault = false;
    trigger.addEventListener("click", () => {
      bar.classList.toggle("is-open");
    });
  }

  const container = document.querySelector(".custom-paint__swatches");
  const swatches = container ? Array.from(container.querySelectorAll(".custom-swatch")) : [];
  const bgLayer = document.querySelector(".personalizacao-bg");
  const DEFAULT_BG = 'url("img/revueltoinicial.png")';
  const RED_BG = 'url("img/revueltovermelho.png")';
  let queuedBg = null;

  if (bgLayer && !bgLayer.style.backgroundImage) {
    bgLayer.style.backgroundImage = DEFAULT_BG;
    bgLayer.dataset.bg = DEFAULT_BG;
  }

  if (bgLayer) {
    bgLayer.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "opacity") return;
      if (!bgLayer.classList.contains("is-fading")) return;
      if (queuedBg) {
        bgLayer.style.backgroundImage = queuedBg;
        queuedBg = null;
      }
      requestAnimationFrame(() => {
        bgLayer.classList.remove("is-fading");
      });
    });
  }

  function applyBackground(forRed) {
    if (!bgLayer) return;
    const next = forRed ? RED_BG : DEFAULT_BG;
    if (bgLayer.dataset.bg === next) return;
    bgLayer.dataset.bg = next;
    queuedBg = next;
    if (!bgLayer.classList.contains("is-fading")) {
      bgLayer.classList.add("is-fading");
    }
  }

  function centerSwatch(target) {
    if (!container || !target) return;
    const swatchArray = Array.from(container.children);
    const midIndex = Math.floor(swatchArray.length / 2);
    const midNode = swatchArray[midIndex];
    if (!midNode || target === midNode) {
      swatches.forEach((s) => s.classList.remove("custom-swatch--active"));
      target.classList.add("custom-swatch--active");
      applyBackground(target.dataset.color === "vermelho");
      return;
    }

    // move the clicked swatch to the middle position
    container.insertBefore(target, midNode);
    swatches.forEach((s) => s.classList.remove("custom-swatch--active"));
    target.classList.add("custom-swatch--active");

    applyBackground(target.dataset.color === "vermelho");
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => centerSwatch(swatch));
  });
})();
