const createButton = (type, currType) => {
  const btn = document.createElement("button");
  btn.textContent = type;
  if (type === currType) {
    btn.classList.add("current");
    btn.classList.add(currType);
  }
  btn.classList.add("option");
  btn.id = type;
  return btn;
}

export const createSidebar = (allTypes, currType) => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  const buttons = allTypes.map(type => createButton(type, currType));
  sidebar.append(...buttons);
  return sidebar;
}