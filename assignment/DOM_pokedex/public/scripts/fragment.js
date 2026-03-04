export const createFragment = (tag, attrbutes, ...content) => {
  const element = document.createElement(tag);
  Object.entries(attrbutes).forEach(([attrbute, value]) => {
    element.setAttribute(attrbute, value);
  });

  if (content.length === 1 && typeof content[0] === "string") {
    element.textContent = content;
    return element;
  }

  const children = content.map((c) => createFragment(...c));
  element.append(...children);
  
  return element;
}