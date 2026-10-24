const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsFinePointer && !prefersReducedMotion) {
  const cards = document.querySelectorAll(".interactive-card");
  let frame = 0;

  document.addEventListener("pointermove", (event) => {
    if (frame) {
      return;
    }

    frame = window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      frame = 0;
    });
  }, { passive: true });

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      card.style.setProperty("--card-x", `${x}px`);
      card.style.setProperty("--card-y", `${y}px`);

      if (card.classList.contains("project-card")) {
        const rotateY = ((x / bounds.width) - 0.5) * 7;
        const rotateX = (0.5 - (y / bounds.height)) * 7;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      }
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--card-x");
      card.style.removeProperty("--card-y");
      card.style.removeProperty("transform");
    });
  });
}
