const page = (board, currPlayer, symbol) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <title>TIC-TAC-TOE</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 50px;
      background-color: ghostwhite;
    }

    .board {
      width: 306px;
      height: 306px;
      display: flex;
      flex-wrap: wrap;
    }

    .cell {
      height: 100px;
      width: 100px;
      background-color: skyblue;
      border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 65px;
    }

    a {
      text-decoration: none;
      color: black;
    }

    .current-player {
      font-size: 30px;
      word-spacing: 5px;
    }
  </style>
</head>
<body>
  <header>
    <h1>TIC-TAC-TOE</h1>
  </header>
  <div class="board">
    <a href="1">
      <div class="cell">${board[0]}</div>
    </a>
    <a href="2">
      <div class="cell">${board[1]}</div>
    </a>
    <a href="3">
      <div class="cell">${board[2]}</div>
    </a>
    <a href="4">
      <div class="cell">${board[3]}</div>
    </a>
    <a href="5">
      <div class="cell">${board[4]}</div>
    </a>
    <a href="6">
      <div class="cell">${board[5]}</div>
    </a>
    <a href="7">
      <div class="cell">${board[6]}</div>
    </a>
    <a href="8">
      <div class="cell">${board[7]}</div>
    </a>
    <a href="9">
      <div class="cell">${board[8]}</div>
    </a>
  </div>
  <div class="current-player">${currPlayer}'s Turn - ${symbol}</div>
</body>
</html>`;

const gameOverPage = (board, msg) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <title>TIC-TAC-TOE</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 50px;
      background-color: ghostwhite;
    }

    .board {
      background-color: beige;
      width: 306px;
      height: 306px;
      display: flex;
      flex-wrap: wrap;
    }

    .cell {
      height: 100px;
      width: 100px;
      background-color: skyblue;
      border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 65px;
    }

    a {
      text-decoration: none;
      color: black;
    }

    .result {
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .result h2 {
      font-size: 40px;
      margin: 0;
      padding: 5px;
    }

    .result p {
      font-size: 27px;
      margin: 0;
      padding: 5px;
    }
      .result a {
      font-size: 25px;
      border: 2px solid skyblue;
      padding: 5px;
      margin-top: 5px;
      border-radius: 4px;
      transition: 0.3s;
    }

    .result a:hover {
      background-color: skyblue;
      transition: 0.3s;
    }
  </style>
</head>
<body>
  <header>
    <h1>TIC-TAC-TOE</h1>
  </header>
  <div class="board">
      <div class="cell">${board[0]}</div>    
      <div class="cell">${board[1]}</div>    
      <div class="cell">${board[2]}</div>    
      <div class="cell">${board[3]}</div>    
      <div class="cell">${board[4]}</div>    
      <div class="cell">${board[5]}</div>    
      <div class="cell">${board[6]}</div>    
      <div class="cell">${board[7]}</div>    
      <div class="cell">${board[8]}</div> 
    </div>

  <div class="result">
    <h2>Game Over</h2>
    <p>${msg}</p>
    <a href="/play-again">Play Again</a>
  </div>
</body>
</html>`;

export const createPage = (game) => {
  const status = game.status();
  console.log(status);
  
  if (status.isGameOver) {
    const msg = status.isWon
      ? `${game.players[1 - game.currIndex]} WON`
      : "DRAW";
    return gameOverPage(game.board, msg);
  }
  const currPlayer = game.players[game.currIndex];
  const symbol = game.symbols[game.currIndex];
  return page(game.board, currPlayer, symbol);
};
