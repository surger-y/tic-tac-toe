const prompt = require('prompt-sync')();

const GRID = [];
const COLS = 3;
const ROWS = 3;
const USED = [];

let END_STATE = true;
let selected;
let random;

const RANDOMIZE = () => {
  random = Math.floor(Math.random() * 9 ) + 1;
  if (USED.includes(random)) {
    RANDOMIZE();
  }
  USED.push(random);
}
 

const promptUser = () => {
  console.log("Your Turn");
  let userInput = prompt('Please enter a number between 1-9 : ');
  selected = parseFloat(userInput);
 if (isNaN(userInput) || userInput < 1 || userInput > 9 || USED.includes(selected)) {
    console.log('Invalid input.');
    promptUser();
  }
  USED.push(selected);
}

const drawGrid = () => { 
  let value = 1;
  for (let i = 0; i < COLS; i++) {
    GRID.push([]);
    for (let j = 0; j < ROWS; j++) {
      GRID[i].push(value);
      value++;
    }
    console.log(GRID[i]);
  }
}

const updateGrid = () => {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (GRID[i].includes(selected)) {
        const selectedIndex = GRID[i].indexOf(selected);
	GRID[i][selectedIndex] = 'X';
      } 
    } 
    console.log(GRID[i]);
  }
}

const updateGridComp = () => {
  console.log("Computer's Turn");
  RANDOMIZE();
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (GRID[i].includes(random)) {
	const selectedIndex = GRID[i].indexOf(random);
        GRID[i][selectedIndex] = 'O'; 
      }
    } 
    console.log(GRID[i]);
  }
}


const declareWinner = (winner) => {
 if (winner === 'X') {
  console.log('You Win!');
  END_STATE = false;
 
 } else {
  console.log('You Lose :(');
  END_STATE = false;

 }
}

const checkForWinner = (token) => {

  if (GRID[0][0] === token && GRID[0][1] === token && GRID[0][2] === token) {
    declareWinner(token);
  } else if (GRID[1][0] === token && GRID[1][1] === token && GRID[1][2] === token) {
    declareWinner(token);
  } else if (GRID[2][0] === token && GRID[2][1] === token && GRID[2][2] === token) {
    declareWinner(token);
  } else if (GRID[0][0] === token && GRID[1][0] === token && GRID[2][0] === token) {
    declareWinner(token);
  } else if (GRID[0][1] === token && GRID[1][1] === token && GRID[2][1] === token) {
    declareWinner(token);
  } else if (GRID[0][2] === token && GRID[1][2] === token && GRID[2][2] === token) {
    declareWinner(token);
  } else if (GRID[0][0] === token && GRID[1][1] === token && GRID[2][2] === token) {
    declareWinner(token);
  } else if (GRID[0][2] === token && GRID[1][1] === token && GRID[2][0] === token) {
    declareWinner(token);
  }  

}


const playGame = () =>{ 
  for (let i = 0; i < 5; i++) {
    promptUser();
    updateGrid();
    checkForWinner('X');
    if (END_STATE === false) {break;};
    if (i === 4){break;}; 
    updateGridComp();
    checkForWinner('O');
    if (END_STATE === false) {break;};
  }
  if (END_STATE === true) {
    console.log("It's a Draw!");
  }
}

drawGrid();
playGame();

