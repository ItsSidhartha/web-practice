export class Countries {
  #countries;
  constructor(countries) {
    this.#countries = countries;
    this.correct = 0;
    this.length = this.#countries.length;
  }

  #normalize(text) {
    return text.split(/[-_ ]/).join("").toLowerCase();
  }

  validate(id, input) {
    const isCorrect = this.find(id).names.some(
      (name) => this.#normalize(name) === this.#normalize(input),
    );

    if (isCorrect) this.correct++;
    return isCorrect;
  }

  find(id) {
    return this.#countries.find((country) => country.id === id);
  }

  fetchAll() {
    return structuredClone(this.#countries);
  }
}
