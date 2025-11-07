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

  const updateStageState = () => {
    document.body.classList.toggle("on-secondary", currentIndex > 0);
    document.body.dataset.stageIndex = String(currentIndex);
  };

  wrapper.style.setProperty("--scroll-screen-count", screens.length);
  wrapper.style.setProperty("--scroll-offset", "0vw");
  let currentIndex = 0;
  let isAnimating = false;
  let touchStartY = null;

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
    if ((event.key === "ArrowRight" || event.key === "PageDown") && currentIndex < screens.length - 1) {
      event.preventDefault();
      startAnimation(currentIndex + 1);
    } else if ((event.key === "ArrowLeft" || event.key === "PageUp") && currentIndex > 0) {
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

  setOffset(currentIndex);
  updateNav();
  updateStageState();
})();
