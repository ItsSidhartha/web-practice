import { createFragment, ELEMENTS } from "./dom.js";
import { renderElements, renderReport } from "./render.js";

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

const endGame = async () => {
  await revealAllNames();
  await fetch("/report")
    .then((res) => res.json())
    .then(renderReport);
};

const decrementTimer = (secElement, minElement) => {
  if (Number(secElement.textContent) === 0) {
    secElement.textContent = "59";
    minElement.textContent = (parseInt(minElement.textContent) - 1)
      .toString()
      .padStart(2, "0");
    return;
  }

  secElement.textContent = (parseInt(secElement.textContent) - 1)
    .toString()
    .padStart(2, "0");
};

const startTimer = (secElement, minElement) => {
  const id = setInterval(async () => {
    decrementTimer(secElement, minElement);
    const currSec = Number(secElement.textContent);
    const currMin = Number(minElement.textContent);

    const isTimeUp = currSec === 0 && currMin === 0;

    if (isTimeUp) {
      clearInterval(id);
      endGame();
    }
  }, 1000);
  
  return id;
};

const setTimer = () => {
  const timer = document.querySelector("#timer");
  const minElement = timer.querySelector("#minutes");
  const secElement = timer.querySelector("#seconds");
  minElement.textContent = "20";
  secElement.textContent = "00";
  startTimer(secElement, minElement);
};

const resumeGame = (container, target) => {
  const input = container.querySelector("input");
  input.disabled = false;
  const enterBtn = container.querySelector("#enter");
  enterBtn.disabled = false;
  pauseTimer();
  target.textContent = "Pause";
  target.id = "pause-button";
};

const pauseGame = (container, target) => {
  const input = container.querySelector("input");
  input.disabled = true;
  const enterBtn = container.querySelector("#enter");
  enterBtn.disabled = true;
  resumeTimer();
  target.textContent = "Resume";
  target.id = "resume-button";
};

const ACTIONS = {
  "pause-button": pauseGame,
  "resume-button": resumeGame,
  "give-up-button": endGame,
};

const addListenerToHeader = () => {
  const header = document.querySelector("header");
  header.addEventListener("click", (e) => {
    const action = e.target.id;
    const handler = ACTIONS[action];
    if (handler) handler(header, e.target);
  });
};

const main = async () => {
  const countries = await fetchCountries();
  renderElements(countries);
  setTimer();
  addListenerToHeader();
  addListenerToCountries();
  addListenerToForm();
};

window.onload = main;
