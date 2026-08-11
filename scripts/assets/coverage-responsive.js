(() => {
  const scrollKeys = new Set(["ArrowLeft", "ArrowRight", "Home", "End"]);

  document.addEventListener("keydown", (event) => {
    const region = event.target.closest?.(".portfolio-coverage-scroll");

    if (!region || !scrollKeys.has(event.key)) return;

    event.preventDefault();

    if (event.key === "Home") {
      region.scrollLeft = 0;
      return;
    }

    if (event.key === "End") {
      region.scrollLeft = region.scrollWidth;
      return;
    }

    const direction = event.key === "ArrowRight" ? 1 : -1;
    region.scrollLeft += direction * Math.max(80, region.clientWidth * 0.8);
  });
})();
