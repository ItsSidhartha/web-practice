const createBtnELement = () => {
  const btn = document.createElement("button");
  btn.textContent = "Click me";
  return btn
}

const createElement = (person) => {
  const para = document.createElement("p");
  para.textContent = person.name;
  return para;
}

const draw = (people, container = document.body) => {
  container.innerHTML = ""
  people.forEach(person => {
    const element = createElement(person);
    container.appendChild(element);
  });
}

const postDataAndDraw = (body, container) => {
  fetch("/add", { method: "post", body })
    .then((x) => x.json())
    .then(x => draw(x, container));
}

window.onload = () => {
  const container = document.querySelector(".container");
  const form = document.querySelector("form");
  const data = fetchAndDraw()
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const body = JSON.stringify(data)
    postDataAndDraw(body, container)
  })
};
