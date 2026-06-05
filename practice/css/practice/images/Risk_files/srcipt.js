const mockData = {
  india: {
    ownerId: 1,
    troopCount: 1,
    neighbours: new Set([2, 3, 4]),
  },
  china: {
    ownerId: 2,
    troopCount: 1,
    neighbours: new Set([1, 3, 4]),
  },
};

const territories = [
  document.querySelector("#india"),
  document.querySelector("#china"),
];

territories.forEach((t) => {
  t.dataset.owner = mockData[t.id].ownerId;
});
