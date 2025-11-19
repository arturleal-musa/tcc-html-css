(function () {
  const pills = Array.from(document.querySelectorAll(".compra-pill"));
  if (!pills.length) return;

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("compra-pill--ativo"));
      pill.classList.add("compra-pill--ativo");
    });
  });
})();
