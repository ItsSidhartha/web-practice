export const createFragment = (tag, attrbutes, ...contents) => {
  const element = document.createElement(tag);
  Object.entries(attrbutes).forEach(([attrbute, value]) => {
    element.setAttribute(attrbute, value);
  });

  if (contents.length === 1 && typeof contents[0] === "string") {
    element.textContent = contents;
    return element;
  }

  const children = contents.map((content) => createFragment(...content));
  element.append(...children);
  return element;
}