export class Players {
  constructor() {
    this.symbols = ["X", "O"];
    this.currIndex = 0;
  }

  play(board, index) {
    board[index] = this.symbols[this.currIndex];
    this.currIndex = 1 - this.currIndex;
  }
}
