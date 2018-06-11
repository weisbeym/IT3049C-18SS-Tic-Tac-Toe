"use strict";
// Get a reference to our canvas element through the DOM API
const canvas = document.getElementById("canvas");

// From our selected canvas element, get a 2d drawing context
const ctx = canvas.getContext("2d");

const playerX = "X";
const playerO = "O";

const boardState = [
  [null, null, null], // Row 1
  [null, null, null], // Row 2
  [null, null, null] // Row 3
];

let playerTurn = "X";

function drawEmptyBoard() {
  playerTurn = playerX;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boardState.forEach(row => {
    row.forEach(cell => {
      cell = null; // Reset each value to null
    });
  });

  // Vertical 1
  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 600);
  ctx.stroke();

  // Vertical 2
  ctx.beginPath();
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 600);
  ctx.stroke();

  // Horizontal 1
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(600, 200);
  ctx.stroke();

  // Horizontal 2
  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.stroke();
}

// Origin: https://stackoverflow.com/a/15137553/2281093
function between(min, p, max) {
  let result = false;

  if (min < max) {
    if (p > min && p < max) {
      result = true;
    }
  }

  if (min > max) {
    if (p > max && p < min) {
      result = true;
    }
  }

  if (p == min || p == max) {
    result = true;
  }

  return result;
}

function getClickedSquare(x, y) {
  /**
   * In this implementation of the game we are indexing
   * the squares starting with 0 and ending with 8, like so:
   * 0 | 1 | 2
   * ---------
   * 3 | 4 | 5
   * ---------
   * 6 | 7 | 8
   */
  if (between(0, x, 200) && between(0, y, 200)) {
    return 0;
  }

  // TODO: Create conditions for other squares

  return -1;
}

function updatePlayerTurn() {
  if (playerTurn === playerX) {
    return (playerTurn = playerO);
  }

  playerTurn = playerX;
}

function drawPlayOnSquare(squareIdx) {
  // TODO: Implement drawing function
  /**
   * You'll need to have either have conditions for each of the possible
   * conditions or come up with a way to calculate the coords fro the squareIdx.
   *
   * TIP: You can use the "playerTurn" variable to write out the current players
   * game piece
   * */
}

function boardHasWinner() {
  // TODO: Implement this function to return boolean if winner exists
  return false;
}

function isBoardFilled() {
  // TODO: Implement this function to return boolean game board is filled

  /* NOTE: This function assumes it will only be called after boardHasWinner(),
   * so we are not checking the win conditions again, we are just saying if the
   * board is filled and since there are no winners, then we can determine the game
   * is tied.
   */
  return false;
}

canvas.addEventListener("click", function(event) {
  // Extract the x,y coordinates from the click event on the canvas
  const { x, y } = event;

  console.log(x, y);

  // Figure out which square was clicked
  const clickedSquareIdx = getClickedSquare(x, y);

  console.log(`Clicked square ${clickedSquareIdx}`);

  if (clickedSquareIdx === -1) {
    return; // -1 means an area of the canvas was click which we are not tracking
  }

  // TODO: Check boardState to make sure the play is possible (the space is not already occupied)

  // TODO: If valid play, update the boardState

  // TODO: Draw player's move on canvas in the square
  drawPlayOnSquare(clickedSquareIdx);

  /* TODO: Check if latest play triggers a win condition. If so, alert the players who won
   * and provide option to restart the game
   */
  if (boardHasWinner()) {
    return;
  }

  // TODO: Check for tie. If there is tie, follow same proceedure from win condition
  if (isBoardFilled()) {
    return;
  }

  // If there is no winner, update the playerTurn and continue on
  updatePlayerTurn();
});

// When the page loads, draw our empty board
window.addEventListener("load", drawEmptyBoard);