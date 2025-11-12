(function () {
  const slider = document.querySelector("[data-brand-slider]");
  if (!slider) {
    return;
  }

  const track = slider.querySelector("[data-brand-slider-track]");
  if (!track) {
    return;
  }

  const slides = Array.from(track.querySelectorAll(".brands-slide"));
  if (slides.length <= 1) {
    return;
  }

  const TRANSITION_MS = 650;
  const WHEEL_THRESHOLD = 30;
  const TOUCH_THRESHOLD = 60;

  const sliderDots = Array.from(slider.querySelectorAll(".brands-slider__nav [data-slide-to]"));
  const footerDots = Array.from(document.querySelectorAll(".brands-footer [data-slide-to]"));
  const controls = Array.from(new Set([...sliderDots, ...footerDots]));

  let activeIndex = 0;
  let isAnimating = false;
  let touchStartX = null;
  let resizeFrame = null;
  let animationTimer = null;

  const clampIndex = (index) => Math.min(Math.max(index, 0), slides.length - 1);

  const setAriaStates = () => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  };

  const updateControls = () => {
    controls.forEach((control) => {
      const target = Number.parseInt(control.dataset.slideTo, 10);
      const isCurrent = target === activeIndex;
      control.classList.toggle("ativo", isCurrent);
      if (isCurrent) {
        control.setAttribute("aria-current", "true");
      } else {
        control.removeAttribute("aria-current");
      }
    });
  };

  const applyTransform = () => {
    const offset = -activeIndex * slider.clientWidth;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
    slider.dataset.brandActiveIndex = String(activeIndex);
  };

  const finishAnimation = () => {
    isAnimating = false;
    slider.classList.remove("is-animating");
  };

  const goToSlide = (index) => {
    const targetIndex = clampIndex(index);
    if (targetIndex === activeIndex || isAnimating) {
      return;
    }
    isAnimating = true;
    slider.classList.add("is-animating");
    activeIndex = targetIndex;
    applyTransform();
    setAriaStates();
    updateControls();

    window.clearTimeout(animationTimer);
    animationTimer = window.setTimeout(finishAnimation, TRANSITION_MS);
  };

  const handleControlClick = (event) => {
    event.preventDefault();
    const targetIndex = Number.parseInt(event.currentTarget.dataset.slideTo, 10);
    if (Number.isNaN(targetIndex)) {
      return;
    }
    goToSlide(targetIndex);
  };

  controls.forEach((control) => {
    control.addEventListener("click", handleControlClick);
  });

  const handleWheel = (event) => {
    if (isAnimating) {
      return;
    }

    const primaryDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(primaryDelta) < WHEEL_THRESHOLD) {
      return;
    }

    event.preventDefault();
    if (primaryDelta > 0) {
      goToSlide(activeIndex + 1);
    } else {
      goToSlide(activeIndex - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (isAnimating) {
      return;
    }
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    }
  };

  const handleTouchStart = (event) => {
    if (event.touches.length !== 1) {
      touchStartX = null;
      return;
    }
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null || isAnimating) {
      return;
    }
    const currentX = event.touches[0].clientX;
    const deltaX = touchStartX - currentX;
    if (Math.abs(deltaX) < TOUCH_THRESHOLD) {
      return;
    }
    event.preventDefault();
    if (deltaX > 0) {
      goToSlide(activeIndex + 1);
    } else {
      goToSlide(activeIndex - 1);
    }
    touchStartX = null;
  };

  const handleTouchEnd = () => {
    touchStartX = null;
  };

  const handleResize = () => {
    track.style.transition = "none";
    if (resizeFrame) {
      window.cancelAnimationFrame(resizeFrame);
    }
    applyTransform();
    resizeFrame = window.requestAnimationFrame(() => {
      track.style.transition = "";
    });
  };

  slider.addEventListener("wheel", handleWheel, { passive: false });
  slider.addEventListener("touchstart", handleTouchStart, { passive: true });
  slider.addEventListener("touchmove", handleTouchMove, { passive: false });
  slider.addEventListener("touchend", handleTouchEnd, { passive: true });
  slider.addEventListener("touchcancel", handleTouchEnd, { passive: true });
  window.addEventListener("keydown", handleKeyDown, { passive: false });
  window.addEventListener("resize", handleResize);

  applyTransform();
  setAriaStates();
  updateControls();
})();
