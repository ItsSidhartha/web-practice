import { createFragment, ELEMENTS } from "./dom.js";

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

export const renderElements = (countries) => {
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

export const renderReport = (report) => {
  const header = document.querySelector("header");
  const [score, retryBtn] = createReport(report);
  header.replaceChildren(score, retryBtn);
  retryBtn.onclick = () => window.location.reload();
};
