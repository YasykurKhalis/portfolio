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

function initCenterFadeAnimation(sectionSelector: string, elementsSelector: string): void {
  const section = document.querySelector<HTMLElement>(sectionSelector);

  if (!section) return;

  const animatedElements = section.querySelectorAll<HTMLElement>(elementsSelector);
  let animationFrame = 0;

  const updateOpacity = (): void => {
    animationFrame = 0;

    const sectionBounds = section.getBoundingClientRect();
    const sectionCenter = sectionBounds.top + sectionBounds.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const comfortZone = window.innerHeight * 0.15;
    const fadeDistance = window.innerHeight * 0.55;
    const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
    const opacity = Math.max(
      0,
      1 - Math.max(0, distanceFromCenter - comfortZone) / fadeDistance,
    );

    animatedElements.forEach((element) => {
      element.style.opacity = opacity.toString();
    });
  };

  const requestOpacityUpdate = (): void => {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(updateOpacity);
    }
  };

  window.addEventListener("scroll", requestOpacityUpdate, { passive: true });
  window.addEventListener("resize", requestOpacityUpdate);
  updateOpacity();
}

function initScrollAnimations(): void {
  initCenterFadeAnimation(
    ".bio-scroll-animate",
    ":scope > img, :scope > div",
  );
  initCenterFadeAnimation(
    ".education-scroll-animate",
    ":scope > h1, .education-timeline, .education-item",
  );
}

document.addEventListener("DOMContentLoaded", initScrollAnimations);
