(function () {
  const pills = Array.from(document.querySelectorAll(".compra-pill"));
  if (!pills.length) return;

  const finalizeBtn = document.querySelector("[data-finalizar]");
  const activePill = document.querySelector(".compra-pill--ativo");
  let selectedTarget = activePill && activePill.dataset.target ? activePill.dataset.target : null;

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("compra-pill--ativo"));
      pill.classList.add("compra-pill--ativo");
      selectedTarget = pill.dataset.target || null;
    });
  });

  if (finalizeBtn) {
    finalizeBtn.addEventListener("click", (event) => {
      if (!selectedTarget) return;
      event.preventDefault();
      window.location.href = selectedTarget;
    });
  }
})();
