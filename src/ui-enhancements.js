function createRipple(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement) || button.dataset.ripple === "off") {
    return;
  }

  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height);
  ripple.className = "button-ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  button.append(ripple);
  window.setTimeout(() => ripple.remove(), 520);
}

function updateScrolledState() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 16);
}

export function initInterfaceEnhancements() {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.documentElement.classList.toggle("reduce-motion", motionQuery.matches);
  motionQuery.addEventListener?.("change", () => {
    document.documentElement.classList.toggle("reduce-motion", motionQuery.matches);
  });

  document.querySelectorAll("button, .primary-button, .secondary-button").forEach((button) => {
    button.addEventListener("click", createRipple);
  });

  updateScrolledState();
  window.addEventListener("scroll", updateScrolledState, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    const openMenu = document.querySelector("#accountMenu:not(.hidden)");
    if (openMenu) {
      document.querySelector("#menuButton")?.click();
    }
  });
}
