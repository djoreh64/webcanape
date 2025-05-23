const updateBorders = () => {
  const list = document.querySelector(".goods__list");
  if (!(list instanceof HTMLUListElement)) return;

  const items = Array.from(list.children).filter(
    (с) => с instanceof HTMLLIElement
  );

  const computedStyle = window.getComputedStyle(list);
  const columnValues = computedStyle.gridTemplateColumns
    .split(" ")
    .filter((v) => v.trim().length > 0);
  const columns = columnValues.length;

  if (columns === 0) return;

  const totalItems = items.length;
  const lastRowStart = totalItems - (totalItems % columns || columns);

  items.forEach((item) => {
    const link = item.querySelector(".goods__link");
    if (link instanceof HTMLAnchorElement)
      link.classList.remove("no-bottom-border", "last-in-row");
  });

  items.forEach((item, index) => {
    const link = item.querySelector(".goods__link");
    if (!(link instanceof HTMLAnchorElement)) return;

    const isLastInRow =
      (index + 1) % columns === 0 ||
      (index === totalItems - 1 && totalItems % columns !== 0);
    if (isLastInRow) link.classList.add("last-in-row");

    const isInLastRow = index >= lastRowStart;
    if (isInLastRow) link.classList.add("no-bottom-border");
  });
};

window.addEventListener("resize", updateBorders);
updateBorders();
