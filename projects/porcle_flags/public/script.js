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
    updateFormInput();
  });
};

const revealName = (target, name, cls) => {
  const textContainer = target.querySelector(".text-container");
  textContainer.innerText = name;
  textContainer.classList.add(cls);
};

const updateFormInput = () => {
  const input = document.querySelector("header form input");
  input.value = "";
  input.focus();
};

const removeTargetFromCountry = (id) => {
  const target = document.querySelector(`[data-id="${id}"]`);
  target.classList.remove("target");
};

const targetCountry = (id) => {
  const target = document.querySelector(`[data-id="${id}"]`);
  if (target.classList.contains("done")) return targetCountry(id + 1);
  CURRENT.target = target;
  target.classList.add("target");
};

const markDone = (target) => {
  target.classList.add("done");
};

const updateForCorrectAnswer = (target, name) => {
  revealName(target, name, "green");
  markDone(target);
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

const { SECTION, DIV, IMG, P, BUTTON } = ELEMENTS;

const createCountryCard = ({ name, id, src }) => {
  const template = [
    SECTION,
    { class: "card", "data-id": id },
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

const createReport = (report) => {
  const scoreTemplate = [
    P,
    { class: "score" },
    `Score: ${report.correct}/${report.total}`,
  ];

  const retryBtnTemplate = [BUTTON, { id: "retry-button" }, "Retry"];
  return [createFragment(scoreTemplate), createFragment(retryBtnTemplate)];
};

const renderReport = (report) => {
  const header = document.querySelector("header");
  const [score, retryBtn] = createReport(report);
  header.replaceChildren(score, retryBtn);
  retryBtn.onclick = () => window.location.reload();
};

const revealAllNames = async () => {
  const cards = document.querySelectorAll(".card");
  await fetch("/countries/all")
    .then((res) => res.json())
    .then((countries) => {
      cards.forEach((card) => {
        const id = parseInt(card.dataset.id);
        const { names } = countries.find((country) => country.id === id);
        revealName(card, names[0], "red");
      });
    });
};

const startTimer = () => {
  const timer = document.querySelector("#timer");
  const minutesElement = timer.querySelector("#minutes");
  const secondsElement = timer.querySelector("#seconds");
  minutesElement.textContent = "20";
  secondsElement.textContent = "00";

  const id = setInterval(async () => {
    const curSec = parseInt(secondsElement.textContent);
    const curMin = parseInt(minutesElement.textContent);
    if (curSec === 1 && curMin === 0) {
      clearInterval(id);
      await revealAllNames();
      await fetch("/report")
        .then((res) => res.json())
        .then(renderReport);
      return;
    }

    if (curSec === 0) {
      secondsElement.textContent = 59;
      minutesElement.textContent = (parseInt(minutesElement.textContent) - 1)
        .toString()
        .padStart("0", 2);
    }

    secondsElement.textContent = (parseInt(secondsElement.textContent) - 1)
      .toString()
      .padStart("0", 2);
  }, 1000);
};

const main = async () => {
  const countries = await fetchCountries();
  createElements(countries);
  startTimer();
  addListenerToCountries();
  addListenerToForm();
};

window.onload = main;
