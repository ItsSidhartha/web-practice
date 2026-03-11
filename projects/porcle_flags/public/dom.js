export const createFragment = ([tag, attributes, ...contents]) => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value),
  );

  if (contents.length === 1 && !Array.isArray(contents[0])) {
    element.textContent = contents[0].toString();
    return element;
  }

  const children = contents.map(createFragment);

  element.append(...children);
  return element;
};

export const ELEMENTS = {
  SECTION: "section",
  MAIN: "main",
  DIV: "div",
  IMG: "img",
  BUTTON: "button",
  P: "p",
};
