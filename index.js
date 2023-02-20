// robot is minus, when simulatign the best move for robot minimise
// player opposite

class Board {

  constructor() {
    this.movesLeft = 9;
    this.grid = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
  }
  // outputs a grid in a pretty format given a 3*3 array
  output(givenGrid) {
    console.log("________");
    for (let row = 0; row < 3; row++) {
      let myLine = "";
      for (let column = 0; column < 3; column++) {

        switch (givenGrid[row][column]) {
          case 1:
            myLine += "0";
            break;
          case 2:
            myLine += "X";
            break;
          default:
            myLine += " ";
            break;
        }
        myLine += "|";
      }
      console.log("|" + myLine);
    }
    console.log("-------");
  }
  // takes in x and y coordinates with an origin in the bottom left, makes the origin the top left, and adds it to grid
  // Then It will run the findBestMove method to find the best move the AI can take, and makes the move on its behalf.
  move(y, x) {
    if (this.grid[2 - x][y] == 0) {
      this.grid[2 - x][y] = 1;

      console.log("Your move:");
      this.output(this.grid);
      var hasGameEnded = this.isGameOver(this.grid);

      if (hasGameEnded !== 0) {
        console.log("Game over!");
      } else {

        this.grid = this.findBestMove(this.grid);
        console.log("My move:");
        this.output(this.grid);

        var hasGameEnded = this.isGameOver(this.grid);
        if (hasGameEnded !== 0) {
          console.log("Game over!");
        }

      }
    }
    this.movesLeft -= 2;
  }
  isGameOver(givenGrid) {
    let player = 1;
    let robot = 2;
    // check columns
    for (let column = 0; column < 3; column++) {
      let winner = givenGrid[0][column];

      if (givenGrid[1][column] === winner && givenGrid[2][column] === winner) {
        if (winner === player) {
          return 10;
        } else if (winner === robot) {
          return -10;
        }
      }
    }
    // check rows
    for (let row = 0; row < 3; row++) {
      let winner = givenGrid[row][0];

      if (givenGrid[row][1] === winner && givenGrid[row][2] === winner) {
        if (winner === player) {
          return 10;
        } else if (winner === robot) {
          return -10;
        }
      }
    }
    // Check Diagonal

    let winner = givenGrid[1][1];
    if (winner !== 0) {
      const wonDiagonalA = (givenGrid[0][0] === winner) && givenGrid[2][2] === (winner);
      const wonDiagonalB = (givenGrid[0][2] === winner) && (givenGrid[2][0] === winner);

      if (wonDiagonalB || wonDiagonalA) {

        if (winner === player) {
          return 10;
        } else {
          return -10;
        }
      }
    }


    if (!this.hasMovesLeft(givenGrid)) return -1;
    return 0;
  }

  miniMax(givenGrid, depth, isMaximising, alpha, beta) {
    let hasGameEnded = this.isGameOver(givenGrid);
    if (hasGameEnded !== 0) {

      if (hasGameEnded == -1) return 0;

      return hasGameEnded;
    }
    if (isMaximising) {
      let bestVal = -1000;

      for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
          // minimising
          if (givenGrid[row][column] !== 0) continue;
          givenGrid[row][column] = 1;

          let value = this.miniMax(givenGrid, depth + 1, false, alpha, beta);
          bestVal = Math.max(bestVal, value);

          alpha = Math.max(alpha, bestVal);
          if (beta <= alpha) break;
          givenGrid[row][column] = 0;
        }
      }
      return bestVal;
    } else { // Minimising

      let bestVal = 1000;
      for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
          // minimising
          if (givenGrid[row][column] !== 0) continue;

          givenGrid[row][column] = 2;
          let value = this.miniMax(givenGrid, depth + 1, !isMaximising, alpha, beta);

          bestVal = Math.min(bestVal, value);
          alpha = Math.min(alpha, bestVal);
          if (beta <= alpha) break;

          givenGrid[row][column] = 0;

        }
      }
      return bestVal;
    }

  }

  findBestMove(givenGrid) {
    let bestScore = 1000;
    let bestCol = -1;
    let bestRow = -1;

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (givenGrid[row][column] !== 0) continue;

        givenGrid[row][column] = 2;
        let value = this.miniMax(givenGrid, 0, true, -1000, 1000);
        if (value < bestScore) {
          bestScore = value;
          bestCol = column;
          bestRow = row;
        }
        givenGrid[row][column] = 0;

      }
    }

    givenGrid[bestRow][bestCol] = 2;
    return givenGrid;
  }
  hasMovesLeft(grid) {
    for (let row = 0; row < 3; row++)
      for (let column = 0; column < 3; column++)
        if (grid[row][column] === 0)
          return true;

    return false;
  }
}

// -------------------------------------
//      Main Code
// ------------------------------------

var myBoard = new Board();

myBoard.move(0, 0);
myBoard.move(1, 0);
myBoard.move(0, 2);
myBoard.move(1, 2);



