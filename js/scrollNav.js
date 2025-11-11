(function () {
  const SCROLL_DURATION = 650;
  const WHEEL_THRESHOLD = 35;
  const TOUCH_THRESHOLD = 70;

  const wrapper = document.querySelector("[data-scroll-wrapper]");
  if (!wrapper) {
    return;
  }

  const screens = Array.from(wrapper.querySelectorAll("[data-screen]"));
  if (screens.length <= 1) {
    return;
  }

  const navButtons = Array.from(document.querySelectorAll("[data-scroll-to]"));
  const lastScreenIndex = screens.length - 1;
  const MAX_CAROUSEL_STAGE = 2;

  const updateStageState = () => {
    document.body.classList.toggle("on-secondary", currentIndex > 0);
    document.body.dataset.stageIndex = String(currentIndex);
  };

  wrapper.style.setProperty("--scroll-screen-count", screens.length);
  wrapper.style.setProperty("--scroll-offset", "0vw");
  let currentIndex = 0;
  let isAnimating = false;
  let touchStartY = null;
  let carouselStage = 0;

  const updateCarouselStage = () => {
    document.body.dataset.carouselStage = String(carouselStage);
  };

  const resetCarouselStage = () => {
    if (carouselStage === 0) {
      return;
    }
    carouselStage = 0;
    updateCarouselStage();
  };

  const setOffset = (index) => {
    wrapper.style.setProperty("--scroll-offset", `-${index * 100}vw`);
  };

  const updateNav = () => {
    navButtons.forEach((button) => {
      const target = Number.parseInt(button.dataset.scrollTo, 10);
      const isActive = target === currentIndex;
      button.classList.toggle("ativo", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  };

  const tryHandleCarouselStage = (direction) => {
    if (currentIndex !== lastScreenIndex) {
      return false;
    }
    if (direction === "forward" && carouselStage < MAX_CAROUSEL_STAGE) {
      carouselStage += 1;
      updateCarouselStage();
      return true;
    }
    if (direction === "backward" && carouselStage > 0) {
      carouselStage -= 1;
      updateCarouselStage();
      return true;
    }
    return false;
  };

  const finishAnimation = () => {
    isAnimating = false;
    wrapper.classList.remove("is-animating");
  };

  const startAnimation = (nextIndex) => {
    if (nextIndex === currentIndex || nextIndex < 0 || nextIndex >= screens.length) {
      return;
    }
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    if (nextIndex !== lastScreenIndex) {
      resetCarouselStage();
    }
    currentIndex = nextIndex;
    updateStageState();
    wrapper.classList.add("is-animating");
    setOffset(nextIndex);
    updateNav();
    window.setTimeout(finishAnimation, SCROLL_DURATION);
  };

  const handleButtonClick = (event) => {
    const targetIndex = Number.parseInt(event.currentTarget.dataset.scrollTo, 10);
    if (Number.isNaN(targetIndex)) {
      return;
    }
    if (targetIndex === lastScreenIndex && carouselStage > 0) {
      event.preventDefault();
      resetCarouselStage();
      return;
    }
    event.preventDefault();
    startAnimation(targetIndex);
  };

  navButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  const handleWheel = (event) => {
    if (isAnimating) {
      return;
    }
    if (event.deltaY > WHEEL_THRESHOLD && tryHandleCarouselStage("forward")) {
      event.preventDefault();
      return;
    }
    if (event.deltaY < -WHEEL_THRESHOLD && tryHandleCarouselStage("backward")) {
      event.preventDefault();
      return;
    }
    if (event.deltaY > WHEEL_THRESHOLD && currentIndex < screens.length - 1) {
      event.preventDefault();
      startAnimation(currentIndex + 1);
    } else if (event.deltaY < -WHEEL_THRESHOLD && currentIndex > 0) {
      event.preventDefault();
      startAnimation(currentIndex - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (isAnimating) {
      return;
    }
    const isNextKey = event.key === "ArrowRight" || event.key === "PageDown";
    const isPrevKey = event.key === "ArrowLeft" || event.key === "PageUp";
    if (isNextKey && tryHandleCarouselStage("forward")) {
      event.preventDefault();
      return;
    }
    if (isPrevKey && tryHandleCarouselStage("backward")) {
      event.preventDefault();
      return;
    }
    if (isNextKey && currentIndex < screens.length - 1) {
      event.preventDefault();
      startAnimation(currentIndex + 1);
    } else if (isPrevKey && currentIndex > 0) {
      event.preventDefault();
      startAnimation(currentIndex - 1);
    }
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      touchStartY = event.touches[0].clientY;
    } else {
      touchStartY = null;
    }
  };

  const handleTouchMove = (event) => {
    if (touchStartY === null || isAnimating) {
      return;
    }

    const currentY = event.touches[0].clientY;
    const delta = touchStartY - currentY;

    if (delta > TOUCH_THRESHOLD && tryHandleCarouselStage("forward")) {
      event.preventDefault();
      touchStartY = null;
      return;
    }
    if (delta < -TOUCH_THRESHOLD && tryHandleCarouselStage("backward")) {
      event.preventDefault();
      touchStartY = null;
      return;
    }
    if (delta > TOUCH_THRESHOLD && currentIndex < screens.length - 1) {
      event.preventDefault();
      startAnimation(currentIndex + 1);
      touchStartY = null;
    } else if (delta < -TOUCH_THRESHOLD && currentIndex > 0) {
      event.preventDefault();
      startAnimation(currentIndex - 1);
      touchStartY = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartY = null;
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyDown, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

  updateCarouselStage();
  setOffset(currentIndex);
  updateNav();
  updateStageState();
})();
