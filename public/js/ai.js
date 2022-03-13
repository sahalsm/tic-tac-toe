const boxes = Array.from(document.getElementsByClassName("box"));
const statusText = document.getElementById("statusText");
const refresh = document.getElementById("restartbutton");
const audio = new Audio("button-50.mp3");
const win = new Audio("Ta Da-SoundBible.com-1884170640.mp3");
const defeat = new Audio("game-show-wrong-answer-fail-01-sound-effect-11737061.mp3");
const spaces = [null, null, null, null, null, null, null, null, null];
const ai = "O";
const human = "X";
let currentPlayer = human;
let res;
//Board drawing
const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      styleString += "border-bottom: 3px solid red;";
    }
    if (index > 5) {
      styleString += "border-top: 3px solid red;";
    }
    if (index % 3 === 0) {
      styleString += "border-right: 3px solid red;";
    }
    if (index % 3 == 2) {
      styleString += "border-left: 3px solid red;";
    }
    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};
//When box is clicked
const boxClicked = (e) => {
  audio.play();
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    res = playerHasWon(); //Checks if the player has won or checks the status of the game
    if (res == -1) {
      statusText.innerText = `LOST`;
      defeat.play();
      return;
    }
    if (res == 1) {
      statusText.innerText = `WIN`;
      win.play();
      return;
    }
    if (res == 0) {
      statusText.innerText = `TIE`;
      defeat.play();
      return;
    }
    if (currentPlayer == human) {
      //change current player from human to AI
      currentPlayer = ai;
      let bestScore = Infinity;
      let bestMove;
      for (let index = 0; index < spaces.length; index++) {
        if (spaces[index] == null) {
          spaces[index] = ai;
          let score = minmax(spaces, 0, false);
          spaces[index] = null;
          if (score < bestScore) {
            bestScore = score;
            bestMove = index;
            //console.log(index);
          }
        }
      }
      boxes.forEach((box, index) => {
        if (index == bestMove) {
          const bv = document.getElementById("" + bestMove + "");
          bv.click();
          return;
        }
      });
    } else {
      currentPlayer = human;
    }
  }
};
//minimax algorithm
const minmax = (spaces, isMaximizing) => {
  let result = playerHasWon();
  if (result != null) {
    return result;
  }
  // AI move
  if (isMaximizing) {
    let bestScore = Infinity;
    for (let index = 0; index < spaces.length; index++) {
      if (spaces[index] == null) {
        spaces[index] = ai;
        let score = minmax(spaces, false);
        spaces[index] = null;
        if (score < bestScore) {
            bestScore = score;
        }
      }
    }
    return bestScore;
  } else { //Human move in minimax
    let bestScore = -Infinity;
    for (let index = 0; index < spaces.length; index++) {
      if (spaces[index] == null) {
        spaces[index] = human;
        let score = minmax(spaces, true);
        spaces[index] = null;
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
};
//Refresh button clear the board
refresh.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  statusText.innerText = `Let's Play`;
  currentPlayer = human;
  totalMove = 0;
});
//function to check status returns (0:tie 1 :win -1 :lost)
function winCheck(a, b, c) {
  if (a == b && b == c && a != null) {
    return true;
  }
}
const playerHasWon = () => {
  let winner = null;
  // Horizontal
  if (winCheck(spaces[0], spaces[1], spaces[2])) {
    winner = spaces[0];
  }
  if (winCheck(spaces[3], spaces[4], spaces[5])) {
    winner = spaces[3];
  }
  if (winCheck(spaces[6], spaces[7], spaces[8])) {
    winner = spaces[6];
  }
  // Vertical
  if (winCheck(spaces[0], spaces[3], spaces[6])) {
    winner = spaces[6];
  }
  if (winCheck(spaces[1], spaces[4], spaces[7])) {
    winner = spaces[1];
  }
  if (winCheck(spaces[2], spaces[5], spaces[8])) {
    winner = spaces[2];
  }
  // Diagonal
  if (winCheck(spaces[0], spaces[4], spaces[8])) {
    winner = spaces[0];
  }
  if (winCheck(spaces[2], spaces[4], spaces[6])) {
    winner = spaces[2];
  }
  let available = 9;
  for (let index = 0; index < spaces.length; index++) {
    if (spaces[index] != null) {
      available -= 1;
    }
  }
  if (winner == null && available == 0) {
    return "0";
  }
  if (winner != null) {
    if (winner == human) {
      return "1";
    }
    if (winner == ai) {
      return "-1";
    }
  }
};


drawBoard();