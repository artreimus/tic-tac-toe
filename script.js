const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const promptUser = document.querySelector("#prompt-user");
const playerOneDisplay = document.querySelector("#player-one-display");
const playerTwoDisplay = document.querySelector("#player-two-display");
const winningMessageElement = document.getElementById("winnerMessage");
const winningMessageText = document.querySelector("[data-winner-message]");
const restartButton = document.getElementById("restartBtn");
let circleTurn;

class Player {
  constructor(name) {
    this.name = name;
  }
}

promptUser.addEventListener("submit", (e) => {
  e.preventDefault();

  const playerOne = document.querySelector("#player-one-name").value;
  const playerTwo = document.querySelector("#player-two-name").value;

  //Validate forms
  if (playerOne === "" || playerTwo === "") {
    //Get  form values
  } else {
    const playerOneObject = new Player(playerOne);
    const playerTwoObject = new Player(playerTwo);
    //Display the players' names
    playerOneDisplay.innerHTML = playerOneObject.name;
    playerTwoDisplay.innerHTML = playerTwoObject.name;

    //Hide prompt
    promptUser.classList.remove("show");
    startGame();
  }
});

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardClass();
  winningMessageElement.classList.remove("show");
}

restartButton.addEventListener("click", startGame);

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  //Place marks in cell
  placeMark(cell, currentClass);

  //Check for winner / draws
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    setBoardClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${
      circleTurn ? playerTwoDisplay.innerHTML : playerOneDisplay.innerHTML
    } Wins!`;
    console.log(playerOneDisplay.innerHTML);
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setBoardClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
