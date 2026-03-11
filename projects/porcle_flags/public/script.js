import { createFragment, ELEMENTS } from "./dom.js";

const fetchCountries = async (continent = "all") => {
  const res = await fetch(`/countries/${continent}`);
  return await res.json();
};

// TEMP : Can be transfered to backend later;
const CURRENT = { target: null };

const addListenerToCountries = () => {
  const main = document.querySelector("main");
  main.addEventListener("click", (e) => {
    const target = e.target.closest(".card");
    if (CURRENT.target) {
      removeTargetFromCountry(parseInt(CURRENT.target.dataset.id));
    }

    targetCountry(parseInt(target.dataset.id));
    updateFormInput()
  });

};

const revealName = (target, name) => {
  target.querySelector(".text-container").innerText = name;
};

const updateFormInput = () => {
  const input = document.querySelector("header form input");
  input.value = "";
  input.focus();
};

const removeTargetFromCountry = (id) => {
  const target = document.querySelector(`[data-id="${id}"]`);
  target.classList.remove("target");
}

const targetCountry = (id) => {
  const target = document.querySelector(`[data-id="${id}"]`);
  if (target.classList.contains("done")) return targetCountry(id + 1)
  CURRENT.target = target;
  target.classList.add("target");
}

const markDone = (target) => {
  target.classList.add("done")
}

const updateForCorrectAnswer = (target, name) => {
  revealName(target, name);
  markDone(target)
  removeTargetFromCountry(parseInt(target.dataset.id));
  targetCountry(parseInt(target.dataset.id) + 1);
  updateFormInput();
};

const addListenerToForm = () => {
  const form = document.querySelector("header form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const input = formData.get("input");

    const body = JSON.stringify({
      input,
      currentId: parseInt(CURRENT.target.dataset.id),
    });

    fetch("/guess", { method: "post", body })
      .then((res) => res.json())
      .then(({ isCorrect, name }) => {
        if (isCorrect) updateForCorrectAnswer(CURRENT.target, name);
      });
  });
};

const { SECTION, DIV, IMG } = ELEMENTS;

const createCountryCard = ({ name, id, src }) => {
  const template = [
    SECTION,
    { class: "card", "data-id" : id },
    [DIV, { class: "img-container" }, [IMG, { src, alt: name }, ""]],
    [DIV, { class: "text-container" }, ""],
  ];
  return createFragment(template);
};

const createElements = (countries) => {
  const main = document.querySelector("main");
  main.append(...countries.map(createCountryCard));

  document.body.appendChild(main);
};

const main = async () => {
  const countries = await fetchCountries();
  createElements(countries);

  addListenerToCountries();
  addListenerToForm();
};

window.onload = main;
