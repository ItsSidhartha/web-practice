function areEqual(a, b, c) {
  if (a === "") {
    return false;
  }
  return a === b ? a === c : a === b;
}

function checkRows(board) {
  let col = 0;
  for (let row = 0; row < 3; row++) {
    if (
      areEqual(
        board[col],
        board[col + 1],
        board[col + 2],
      )
    ) {
      return true;
    }
    col = col + 3;
  }
  return false;
}

function checkCols(board) {
  let row = 0;
  for (let col = 0; col < 9; col += 3) {
    if (
      areEqual(
        board[row],
        board[row + 3],
        board[row + 6],
      )
    ) {
      return true;
    }
    row = row + 1;
  }
  return false;
}

function checkDiagons(board) {
  const isDiagonal1Equal = areEqual(
    board[0],
    board[4],
    board[8],
  );
  const isDiagonal2Equal = areEqual(
    board[2],
    board[4],
    board[6],
  );
  return isDiagonal1Equal || isDiagonal2Equal;
}

export class Game {
  constructor() {
    this.board = new Array(9).fill("");
    this.players = ["Player1", "Player2"];
    this.symbols = ["X", "O"];
    this.currIndex = 0;
  }

  play(index) {
    if (this.board[index]) return;
    this.board[index] = this.symbols[this.currIndex];
    this.currIndex = 1 - this.currIndex;
  }

  isWon() {
    return checkRows(this.board) || checkCols(this.board) ||
      checkDiagons(this.board);
  }

  isDraw() {
    return !this.board.includes("");
  }

  isGameOver() {
    return this.isDraw() || this.isWon();
  }

  status() {
    return {
      isGameOver: this.isGameOver(),
      isDraw: this.isDraw(),
      isWon: this.isWon(),
    };
  }

  reset() {
    this.board = this.board.fill("");
  }
}
