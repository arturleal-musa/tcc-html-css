(function () {
  const barPaint = document.querySelector(".custom-paint");
  const barDashboard = document.querySelector(".custom-dashboard");
  const barSeat = document.querySelector(".custom-seat");
  const barPinca = document.querySelector(".custom-pinca");
  const barWheels = document.querySelector(".custom-wheels");
  const barRoofs = document.querySelector(".custom-roofs");
  const tabExterior = document.querySelector('[data-mode="exterior"]');
  const tabInterior = document.querySelector('[data-mode="interior"]');
  const listExterior = document.querySelector(".custom-menu__items--exterior");
  const listInterior = document.querySelector(".custom-menu__items--interior");

  function toggleBar(openBar, closeBars = []) {
    if (!openBar) return;
    const willOpen = !openBar.classList.contains("is-open");
    openBar.classList.toggle("is-open", willOpen);
    closeBars.forEach((bar) => {
      if (bar && bar !== openBar) {
        bar.classList.remove("is-open");
      }
    });
  }

  document.addEventListener("click", (event) => {
    const paintBtn = event.target.closest("[data-trigger-pintura]");
    const wheelBtn = event.target.closest("[data-trigger-pneus]");
    const roofBtn = event.target.closest("[data-trigger-teto]");
    const dashBtn = event.target.closest("[data-trigger-dashboard]");
    const seatBtn = event.target.closest("[data-trigger-seat]");
    const colorBtn = event.target.closest("[data-trigger-color]");
    const pincaBtn = event.target.closest("[data-trigger-pinca]");
    if (paintBtn && barPaint) {
      event.preventDefault();
      toggleBar(barPaint, [barDashboard, barWheels, barRoofs, barSeat, barPinca, colorContainer && colorContainer.parentElement]);
    } else if (dashBtn && barDashboard) {
      event.preventDefault();
      toggleBar(barDashboard, [barPaint, barWheels, barRoofs, barSeat, barPinca, colorContainer && colorContainer.parentElement]);
    } else if (wheelBtn && barWheels) {
      event.preventDefault();
      toggleBar(barWheels, [barPaint, barDashboard, barRoofs, barSeat, barPinca, colorContainer && colorContainer.parentElement]);
    } else if (roofBtn && barRoofs) {
      event.preventDefault();
      toggleBar(barRoofs, [barPaint, barDashboard, barWheels, barSeat, barPinca, colorContainer && colorContainer.parentElement]);
    } else if (seatBtn && barSeat) {
      event.preventDefault();
      toggleBar(barSeat, [barPaint, barDashboard, barWheels, barRoofs, barPinca, colorContainer && colorContainer.parentElement]);
    } else if (pincaBtn && barPinca) {
      event.preventDefault();
      toggleBar(barPinca, [barPaint, barDashboard, barWheels, barRoofs, barSeat, colorContainer && colorContainer.parentElement]);
    } else if (colorBtn && colorContainer) {
      event.preventDefault();
      const barColor = colorContainer.parentElement;
      toggleBar(barColor, [barPaint, barDashboard, barWheels, barRoofs, barSeat, barPinca]);
    }
  });

  function switchMode(mode) {
    const showList = mode === "interior" ? listInterior : listExterior;
    const hideList = mode === "interior" ? listExterior : listInterior;
    if (hideList) {
      hideList.classList.remove("is-active");
      hideList.classList.add("is-fading");
    }
    if (showList) {
      showList.classList.add("is-active", "is-fading");
      requestAnimationFrame(() => showList.classList.remove("is-fading"));
    }
    if (tabInterior && tabExterior) {
      if (mode === "interior") {
        tabInterior.classList.add("custom-menu__title--underline");
        tabExterior.classList.remove("custom-menu__title--underline");
      } else {
        tabExterior.classList.add("custom-menu__title--underline");
        tabInterior.classList.remove("custom-menu__title--underline");
      }
    }
  }

  if (tabInterior) {
    tabInterior.addEventDefault = false;
    tabInterior.addEventListener("click", () => switchMode("interior"));
  }

  if (tabExterior) {
    tabExterior.addEventDefault = false;
    tabExterior.addEventListener("click", () => switchMode("exterior"));
  }

  // estado inicial: exterior ativo
  switchMode("exterior");

  const container = document.querySelector(".custom-paint__swatches");
  const swatches = container ? Array.from(container.querySelectorAll(".custom-swatch")) : [];
  const wheelsContainer = document.querySelector(".custom-wheels__swatches");
  const wheelSwatches = wheelsContainer ? Array.from(wheelsContainer.querySelectorAll(".custom-wheel")) : [];
  const roofsContainer = document.querySelector(".custom-roofs__swatches");
  const roofSwatches = roofsContainer ? Array.from(roofsContainer.querySelectorAll(".custom-roof")) : [];
  const dashContainer = document.querySelector(".custom-dashboard__swatches");
  const dashSwatches = dashContainer ? Array.from(dashContainer.querySelectorAll(".custom-dash")) : [];
  const colorContainer = document.querySelector(".custom-color__swatches");
  const colorSwatches = colorContainer ? Array.from(colorContainer.querySelectorAll(".custom-color__swatch")) : [];
  const seatContainer = document.querySelector(".custom-seat__swatches");
  const seatSwatches = seatContainer ? Array.from(seatContainer.querySelectorAll(".custom-seat__swatch")) : [];
  const pincaContainer = document.querySelector(".custom-pinca__swatches");
  const pincaSwatches = pincaContainer ? Array.from(pincaContainer.querySelectorAll(".custom-pinca__swatch")) : [];
  const bgLayer = document.querySelector(".personalizacao-bg");
  const DEFAULT_BG = 'url("img/revueltoinicial.jfif")';
  const RED_BG = 'url("img/revueltovermelho.jfif")';
  const TETO_BG_1 = 'url("img/teto1_bg.jfif")';
  const TETO_BG_2 = 'url("img/teto2_bg.jfif")';
  const RODA_BG_1 = 'url("img/roda1_bg.jfif")';
  const RODA_BG_2 = 'url("img/roda2_bg.jfif")';
  const RODA_BG_3 = 'url("img/roda3_bg.jfif")';
  const DASH_BG_1 = 'url("img/painel1.jfif")';
  const DASH_BG_2 = 'url("img/painel2.jfif")';
  const DASH_BG_3 = 'url("img/painel3.jfif")';
  const SEAT_BG_1 = 'url("img/banco1.jfif")';
  const SEAT_BG_2 = 'url("img/banco2.jfif")';
  const SEAT_BG_3 = 'url("img/banco3.jfif")';
  const COR_BG_EXTERIOR_CINZA1 = 'url("img/revueltobranco.jpeg")';
  const COR_BG_EXTERIOR_AZUL = 'url("img/revueltoazul.jpeg")';
  const COR_BG_1 = 'url("img/cor1.jfif")';
  const COR_BG_2 = 'url("img/cor2.jfif")';
  const COR_BG_3 = 'url("img/cor3.jfif")';
  const COR_BG_4 = 'url("img/cor4.jfif")';
  const PINCA_BG_1 = 'url("img/pincadourado_bg.jfif")';
  const PINCA_BG_2 = 'url("img/pincapreto_bg.jfif")';
  const PINCA_BG_3 = 'url("img/pincavermelho_bg.jfif")';
  const BG_MAP = {
    default: DEFAULT_BG,
    vermelho: RED_BG,
    teto1: TETO_BG_1,
    teto2: TETO_BG_2,
    roda1: RODA_BG_1,
    roda2: RODA_BG_2,
    roda3: RODA_BG_3,
    painel1: DASH_BG_1,
    painel2: DASH_BG_2,
    painel3: DASH_BG_3,
    banco1: SEAT_BG_1,
    banco2: SEAT_BG_2,
    banco3: SEAT_BG_3,
    pinturaCinza1: COR_BG_EXTERIOR_CINZA1,
    pinturaAzulEscuro: COR_BG_EXTERIOR_AZUL,
    cor1: COR_BG_1,
    cor2: COR_BG_2,
    cor3: COR_BG_3,
    cor4: COR_BG_4,
    pincadourado: PINCA_BG_1,
    pincapreto: PINCA_BG_2,
    pincavermelho: PINCA_BG_3,
  };
  let queuedBg = null;

  if (bgLayer && !bgLayer.style.backgroundImage) {
    bgLayer.style.backgroundImage = DEFAULT_BG;
    bgLayer.dataset.bgKey = "default";
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

  function applyBackground(key) {
    if (!bgLayer) return;
    const nextKey = BG_MAP[key] ? key : "default";
    if (bgLayer.dataset.bgKey === nextKey) return;
    const nextBg = BG_MAP[nextKey];
    bgLayer.dataset.bgKey = nextKey;
    queuedBg = nextBg;
    if (!bgLayer.classList.contains("is-fading")) {
      bgLayer.classList.add("is-fading");
    }
  }

  function moveToMiddle(containerEl, targetEl) {
    if (!containerEl || !targetEl) return;
    const children = Array.from(containerEl.children).filter((el) => el !== targetEl);
    const midIndex = Math.floor(children.length / 2);
    targetEl.remove();
    const refNode = children[midIndex];
    if (refNode) {
      containerEl.insertBefore(targetEl, refNode);
    } else {
      containerEl.appendChild(targetEl);
    }
  }

  function centerSwatch(target, shouldApplyBg = true) {
    if (!container || !target) return;
    moveToMiddle(container, target);
    swatches.forEach((s) => s.classList.remove("custom-swatch--active"));
    target.classList.add("custom-swatch--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.color === "vermelho") bgKey = "vermelho";
      if (target.dataset.color === "cinza-1") bgKey = "pinturaCinza1";
      if (target.dataset.color === "azul-escuro") bgKey = "pinturaAzulEscuro";
      applyBackground(bgKey);
    }
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => centerSwatch(swatch));
  });
  const initialActiveSwatch = swatches.find((s) => s.classList.contains("custom-swatch--active"));
  if (initialActiveSwatch) {
    centerSwatch(initialActiveSwatch, false);
  }

  function centerWheel(target, shouldApplyBg = true) {
    if (!wheelsContainer || !target) return;
    moveToMiddle(wheelsContainer, target);
    wheelSwatches.forEach((w) => w.classList.remove("custom-wheel--active"));
    target.classList.add("custom-wheel--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.wheel === "roda1") bgKey = "roda1";
      if (target.dataset.wheel === "roda2") bgKey = "roda2";
      if (target.dataset.wheel === "roda3") bgKey = "roda3";
      applyBackground(bgKey);
    }
  }

  wheelSwatches.forEach((wheel) => {
    wheel.addEventListener("click", () => centerWheel(wheel));
  });
  const initialActiveWheel = wheelSwatches.find((w) => w.classList.contains("custom-wheel--active"));
  if (initialActiveWheel) {
    centerWheel(initialActiveWheel, false);
  }

  function centerRoof(target, shouldApplyBg = true) {
    if (!roofsContainer || !target) return;
    moveToMiddle(roofsContainer, target);
    roofSwatches.forEach((r) => r.classList.remove("custom-roof--active"));
    target.classList.add("custom-roof--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.roof === "teto1") bgKey = "teto1";
      if (target.dataset.roof === "teto2") bgKey = "teto2";
      applyBackground(bgKey);
    }
  }

  roofSwatches.forEach((roof) => {
    roof.addEventListener("click", () => centerRoof(roof));
  });
  const initialActiveRoof = roofSwatches.find((r) => r.classList.contains("custom-roof--active"));
  if (initialActiveRoof) {
    centerRoof(initialActiveRoof, false);
  }

  function centerDash(target, shouldApplyBg = true) {
    if (!dashContainer || !target) return;
    moveToMiddle(dashContainer, target);
    dashSwatches.forEach((d) => d.classList.remove("custom-dash--active"));
    target.classList.add("custom-dash--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.dash === "painel1") bgKey = "painel1";
      if (target.dataset.dash === "painel2") bgKey = "painel2";
      if (target.dataset.dash === "painel3") bgKey = "painel3";
      applyBackground(bgKey);
    }
  }

  dashSwatches.forEach((dash) => {
    dash.addEventListener("click", () => centerDash(dash));
  });
  const initialActiveDash = dashSwatches.find((d) => d.classList.contains("custom-dash--active"));
  if (initialActiveDash) {
    centerDash(initialActiveDash, false);
  }

  function centerSeat(target, shouldApplyBg = true) {
    if (!seatContainer || !target) return;
    moveToMiddle(seatContainer, target);
    seatSwatches.forEach((s) => s.classList.remove("custom-seat__swatch--active"));
    target.classList.add("custom-seat__swatch--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.seat === "banco1") bgKey = "banco1";
      if (target.dataset.seat === "banco2") bgKey = "banco2";
      if (target.dataset.seat === "banco3") bgKey = "banco3";
      applyBackground(bgKey);
    }
  }

  seatSwatches.forEach((seat) => {
    seat.addEventListener("click", () => centerSeat(seat));
  });
  const initialActiveSeat = seatSwatches.find((s) => s.classList.contains("custom-seat__swatch--active"));
  if (initialActiveSeat) {
    centerSeat(initialActiveSeat, false);
  }

  function centerPinca(target, shouldApplyBg = true) {
    if (!pincaContainer || !target) return;
    moveToMiddle(pincaContainer, target);
    pincaSwatches.forEach((p) => p.classList.remove("custom-pinca__swatch--active"));
    target.classList.add("custom-pinca__swatch--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.pinca === "pincadourado") bgKey = "pincadourado";
      if (target.dataset.pinca === "pincapreto") bgKey = "pincapreto";
      if (target.dataset.pinca === "pincavermelho") bgKey = "pincavermelho";
      applyBackground(bgKey);
    }
  }

  pincaSwatches.forEach((pinca) => {
    pinca.addEventListener("click", () => centerPinca(pinca));
  });
  const initialActivePinca = pincaSwatches.find((p) => p.classList.contains("custom-pinca__swatch--active"));
  if (initialActivePinca) {
    centerPinca(initialActivePinca, false);
  }
  function centerColor(target, shouldApplyBg = true) {
    if (!colorContainer || !target) return;
    moveToMiddle(colorContainer, target);
    colorSwatches.forEach((c) => c.classList.remove("custom-color__swatch--active"));
    target.classList.add("custom-color__swatch--active");
    if (shouldApplyBg) {
      let bgKey = "default";
      if (target.dataset.colorOption === "preto") bgKey = "default";
      if (target.dataset.colorOption === "azul") bgKey = "cor2";
      if (target.dataset.colorOption === "marrom") bgKey = "cor3";
      if (target.dataset.colorOption === "vermelho") bgKey = "cor1";
      if (target.dataset.colorOption === "branco") bgKey = "cor4";
      applyBackground(bgKey);
    }
  }

  colorSwatches.forEach((color) => {
    color.addEventListener("click", () => centerColor(color));
  });
  const initialActiveColor = colorSwatches.find((c) => c.classList.contains("custom-color__swatch--active"));
  if (initialActiveColor) {
    centerColor(initialActiveColor, false);
  }
})();
