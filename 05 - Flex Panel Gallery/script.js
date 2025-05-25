const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  // Check if the clicked panel is already open
  const isOpen = this.classList.contains("open");

  // Close all panels
  panels.forEach((panel) => {
    panel.classList.remove("open", "open-active");
  });

  // If the clicked panel was not open, open it
  if (!isOpen) {
    this.classList.add("open");
  }
}

function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    // Only toggle 'open-active' for the panel that is currently open
    if (this.classList.contains("open")) {
      this.classList.toggle("open-active");
    }
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
