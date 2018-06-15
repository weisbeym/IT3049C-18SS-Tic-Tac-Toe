"use strict";

const winScreen = document.getElementById("winScreen");
const replayButton = document.getElementById("replayButton");
const winners = document.getElementById("winner");
console.log(replayButton);

// Get a reference to our canvas element through the DOM API
const canvas =document.querySelector('canvas');
canvas.width = 700;
canvas.height = 700;

// From our selected canvas element, get a 2d drawing context
const c = canvas.getContext("2d");

const lineColor = "#ddd";

const playerX = "X";
const playerO = "O";
let winner = "";

const boardState = [
  [null, null, null], // Row 1
  [null, null, null], // Row 2
  [null, null, null] // Row 3
];

let playerTurn = "X";
let row;
let cell;

let mouse = {
  x: undefined,
  y: undefined
}

function hasValue(row,cell) {
  if(boardState[row][cell] != null) {
    return true;
  }
  return false;
};

function drawEmptyBoard() {
  playerTurn = playerX;
  winner = '';

  c.clearRect(0, 0, canvas.width, canvas.height);

  boardState.forEach(row => {
    row.forEach(cell => {
      cell = null; // Reset each value to null
    });
  });

  c.strokeStyle = lineColor;
  c.lineWidth = 10;

  // Vertical 1
  c.beginPath();
  c.lineCap = 'round';
  c.moveTo(200, 0);
  c.lineTo(200, 600);
  c.stroke();

  // Vertical 2
  c.beginPath();
  c.moveTo(400, 0);
  c.lineTo(400, 600);
  c.stroke();

  // Horizontal 1
  c.beginPath();
  c.moveTo(0, 200);
  c.lineTo(600, 200);
  c.stroke();

  // Horizontal 2
  c.beginPath();
  c.moveTo(0, 400);
  c.lineTo(600, 400);
  c.stroke();
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

  if (between(200, x, 400) && between(0, y, 200)) {
    return 1;
  }

  if (between(400, x, 600) && between(0, y, 200)) {
    return 2;
  }

  if(between(0, x, 200) && between(200, y, 400)){
    return 3;
  }

  if (between(200, x, 400) && between(200, y, 400)) {
    return 4;
  }

  if (between(400, x, 600) && between(200, y, 400)) {
    return 5;
  }

  if (between(0, x, 200) && between(400, y, 600)) {
    return 6;
  }

  if (between(200, x, 400) && between(400, y, 600)) {
    return 7;
  }

  if (between(400, x, 600) && between(400, y, 600)) {
    return 8;
  }

  return -1;
}

function updatePlayerTurn() {
  if (playerTurn === playerX) {
    return (playerTurn = playerO);
  }

  playerTurn = playerX;
}

function drawPlayOnSquare(squareIdx) {
  let x;
  let y;

  switch(squareIdx) {
    case 0:
      x = 0;
      y = 0;
      row = 0;
      cell = 0;
      console.log('found coordinates ' + x +' '+ y);
      break;

    case 1:
      x = 200;
      y = 0;
      row = 0;
      cell = 1;
      break;

    case 2:
      x = 400;
      y = 0;
      row = 0;
      cell = 2;
      break;
    
    case 3:
      x = 0;
      y = 200;
      row = 1;
      cell = 0;
      break;
    
    case 4:
      x = 200;
      y = 200;
      row = 1;
      cell = 1;
      break;

    case 5:
      x = 400;
      y = 200;
      row = 1;
      cell = 2;
      break;

    case 6:
      x = 0;
      y = 400;
      row = 2;
      cell = 0;
      break;

    case 7:
      x = 200;
      y = 400;
      row = 2;
      cell = 1;
      break;

    case 8:
      x = 400;
      y = 400;
      row = 2;
      cell = 2;
      break;
    }
    console.log(boardState[row][cell]);
    console.log(row + ", " + cell);

  if(!hasValue(row, cell)) {

    if(playerTurn === playerX) {
      boardState[row][cell] = playerX;
      console.log(boardState);

      c.strokeStyle = "#f1be32";
      c.beginPath();
      c.moveTo(x + 50, y  + 50);
      c.lineTo(x + 150, y + 150);
      c.stroke();
      c.closePath();
      
      c.strokeStyle = "#f1be32";
      c.beginPath();
      c.moveTo(x + 150, y + 50);
      c.lineTo(x + 50, y + 150);
      c.stroke();
      c.closePath();

    } else if (playerTurn === playerO) {
      boardState[row][cell] = playerO;
      
      c.strokeStyle = "#01bBC2";
      c.beginPath();
      c.arc(x + 100, y + 100, 40, 0, Math.PI * 2, false);
      c.stroke();
    }
  } else {
      alert('Choose an empty square!');
  }
}

function boardHasWinner() {
  // X win conditions
  if(boardState[0][0] == playerX && boardState[0][1] == playerX && boardState[0][2] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[0][0] == playerX && boardState[1][1] == playerX && boardState[2][2] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[0][0] == playerX && boardState[1][0] == playerX && boardState[2][o] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[0][1] == playerX && boardState[1][1] == playerX && boardState[2][1] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[0][2] == playerX && boardState[1][1] == playerX && boardState[2][0] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[0][2] == playerX && boardState[1][2] == playerX && boardState[2][2] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[1][0] == playerX && boardState[1][1] == playerX && boardState[1][2] == playerX) {
    winner = "player X won!";
    return true;
  }

  if(boardState[2][0] == playerX && boardState[2][1] == playerX && boardState[2][2] == playerX) {
    winner = "player X won!";
    return true;
  }

  // O win conditions 
  if(boardState[0][0] == playerO && boardState[0][1] == playerO && boardState[0][2] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[0][0] == playerO && boardState[1][1] == playerO && boardState[2][2] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[0][0] == playerO && boardState[1][0] == playerO && boardState[2][o] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[0][1] == playerO && boardState[1][1] == playerO && boardState[2][1] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[0][2] == playerO && boardState[1][1] == playerO && boardState[2][0] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[0][2] == playerO && boardState[1][2] == playerO && boardState[2][2] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[1][0] == playerO && boardState[1][1] == playerO && boardState[1][2] == playerO) {
    winner = "player O won!";
    return true;
  }

  if(boardState[2][0] == playerO && boardState[2][1] == playerO && boardState[2][2] == playerO) {
    winner = "player O won!";
    return true;
  }


  return false;
}

function isBoardFilled() {
  let count = 0;

  for(let i = 0; i < boardState.length; i++) {
    for(let z = 0; z < boardState.length; z++) {
      if(boardState[i][z] != null) {
        count++;
      }
    }
  }
  if(count > 9) {
    return true;
  }
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
    return alert('Click a valid space on the board!'); // -1 means an area of the canvas was click which we are not tracking
  }

  drawPlayOnSquare(clickedSquareIdx);

  if (boardHasWinner()) {
    const a = document.createTextNode(winner);
    winners.appendChild(a);
    winScreen.classList.remove("hidden");
  }

  // Check for tie. If there is tie, follow same proceedure from win condition
  if (isBoardFilled()) {
    if(!boardHasWinner()) { 
      winner = "it's a tie!";
      const a = document.createTextNode(winner);
      winners.appendChild(a);
      winScreen.classList.remove("hidden");
    }
  }

  // If there is no winner, update the playerTurn and continue on
  updatePlayerTurn();
});

// When the page loads, draw our empty board
window.addEventListener("load", drawEmptyBoard);

// resets the board if the users want to play again
replayButton.addEventListener("click", function() {
  winScreen.classList.add("hidden");
  winners.removeChild(a);
  drawEmptyBoard();
});

