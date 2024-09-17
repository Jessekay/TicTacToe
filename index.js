const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; // 3x3 board

  const getBoard = () => board;

  const placeMarker = (index, marker) => {
      if (index >= 0 && index < board.length && board[index] === "") {
          board[index] = marker;
          return true;
      }
      return false;
  };

  const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, placeMarker, resetBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const Game = (() => {
  let player1, player2;
  let currentPlayer;
  let isGameOver = false;

  const startGame = (p1Name, p2Name) => {
      player1 = Player(p1Name, "X");
      player2 = Player(p2Name, "O");
      currentPlayer = player1;
      Gameboard.resetBoard();
      isGameOver = false;
  };

  const playTurn = (index) => {
      if (!isGameOver && Gameboard.placeMarker(index, currentPlayer.marker)) {
          checkWinner();
          if (!isGameOver) switchPlayer();
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
          if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
              isGameOver = true;
              console.log(`${currentPlayer.name} wins!`);
          }
      });

      if (!board.includes("") && !isGameOver) {
          isGameOver = true;
          console.log("It's a draw!");
      }
  };

  const getCurrentPlayer = () => currentPlayer;

  return { startGame, playTurn, getCurrentPlayer };
})();

const DisplayController = (() => {
  const gameBoardElement = document.querySelector('.game-board');

  const renderBoard = () => {
      const board = Gameboard.getBoard();
      gameBoardElement.innerHTML = ''; // Clear previous board rendering

      board.forEach((cell, index) => {
          const cellElement = document.createElement('div');
          cellElement.classList.add('cell');
          cellElement.textContent = cell;
          cellElement.addEventListener('click', () => handleClick(index)); // Add click event
          gameBoardElement.appendChild(cellElement);
      });
  };

  const handleClick = (index) => {
      Game.playTurn(index); // Make the move
      renderBoard(); // Re-render the board after the move
  };

  return { renderBoard };
})();

Game.startGame("Alice", "Bob");
DisplayController.renderBoard();

