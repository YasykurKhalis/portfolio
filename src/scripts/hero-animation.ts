export function initHeroAnimation(): void {
  const elements = document.querySelectorAll<HTMLElement>(".hero-animate");

  elements.forEach((el) => {
    const delay = parseInt(el.dataset.delay ?? "0", 10);

    setTimeout(() => {
      el.classList.remove("opacity-0", "translate-y-8");
      el.classList.add("opacity-100", "translate-y-0");
    }, delay);
  });
}

document.addEventListener("DOMContentLoaded", initHeroAnimation);
