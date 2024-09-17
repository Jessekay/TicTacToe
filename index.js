const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board; // return the current board state

  const placeMarker = (index, marker) => {
    if (index >= 0 && index < board.length && board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false; // Invalid move
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, placeMarker, resetBoard };
})();

//Player Object
const Player = (name, marker) => {
  return { name, marker };
};

//Game Object
const Game = (() => {
  let player1, player2;
  let currentPlayer;
  let isGameOver = false;

  const startGame = (p1Name, p2Name) => {
    player1 = Player(p1Name, "X");
    player2 = Player(p2Name, "O");
    currentPlayer = player1;
    Gameboard.resetBoard(); // Reset the board at the start
    isGameOver = false;
  };

  const playTurn = (index) => {
    if (!isGameOver && Gameboard.placeMarker(index, currentPlayer.marker)) {
      checkWinner(); // Check if there's a winner after the move
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    winningCombos.forEach((combo) => {
      if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
        isGameOver = true;
        console.log(`${currentPlayer.name} wins!`);
      }
    });

    if (!board.includes("") && !isGameOver) {
      isGameOver = true;
      console.log("It's a draw!");
    }
  };

  return { startGame, playTurn };
})();

const DisplayController = (() => {
  const renderBoard = () => {
    const board = Gameboard.getBoard();
    board.forEach((cell, index) => {
      console.log(`Cell ${index}: ${cell}`);
    });
  };

  const announceWinner = (winner) => {
    console.log(`${winner} is the winner!`);
  };
  return { renderBoard, announceWinner };
})();

Game.startGame('Alice', 'Bob');

Game.playTurn(0);

Game.playTurn(1);
