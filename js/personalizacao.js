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
  const body = document.body;
  const defaultBg = body ? getComputedStyle(body).background : "";

  function applyBackground(forRed) {
    if (!body) return;
    if (forRed) {
      body.style.backgroundImage = 'url("img/revueltovermelho.png")';
      body.style.backgroundPosition = "center";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundSize = "cover";
      body.style.backgroundAttachment = "fixed";
    } else if (defaultBg) {
      body.style.background = defaultBg;
    }
    body.style.minHeight = "100vh";
    body.style.minWidth = "100%";
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.overflowX = "hidden";
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
