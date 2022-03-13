const boxes = Array.from(document.getElementsByClassName("box"));
const statusText = document.getElementById("statusText");
const refresh = document.getElementById("restartbutton");
const audio = new Audio("button-50.mp3");
const win = new Audio("Ta Da-SoundBible.com-1884170640.mp3");
const defeat = new Audio(
  "game-show-wrong-answer-fail-01-sound-effect-11737061.mp3"
);

const spaces = [null, null, null, null, null, null, null, null, null];
const serverresponse = [];
const o_text = 0;
const x_text = 0;
let totalMove = 0;
let currentPlayer = o_text;
let winner;
let click = 0;
let nexrplayer;
setInterval(() => {
  getdata();
  drawBoard();
}, 500);

function getdata() {
  $.ajax({
    type: "GET",
    url: "dbget.php",
    success: function (response) {
      $.each(response, function (key, value) {
        nextplayer = value["nextplayer"];
        click = value["click"];
        serverresponse[0] = value["index0"];
        serverresponse[1] = value["index1"];
        serverresponse[2] = value["index2"];
        serverresponse[3] = value["index3"];
        serverresponse[4] = value["index4"];
        serverresponse[5] = value["index5"];
        serverresponse[6] = value["index6"];
        serverresponse[7] = value["index7"];
        serverresponse[8] = value["index8"];
      });
      for (var i in serverresponse) {
        if (serverresponse[i] == 0 || serverresponse[i] == 1) {
          spaces[i] = serverresponse[i];
          let bv = document.getElementById("" + i + "");
          bv.innerText = serverresponse[i];
        }
        if (serverresponse[i] != 0 && serverresponse[i] != 1) {
          let bb = document.getElementById("" + i + "");
          bb.innerText = "";
          spaces[i] = null;
        }
      }
      if (playerHasWon()) {
        if (currentPlayer == o_text) {
          win.play();
          click = 0;
          statusText.innerText = `YOU WON!`;
          return;
        }
        if (winner) {
          defeat.play();
          click = 0;
          statusText.innerText = `YOU LOST!`;
          return;
        }
      }
      if (click > 8) {
        click = 0;
        statusText.innerText = `It's a DRAW!`;
      }
    },
  });
}

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
    if (nextplayer == 0) {
      statusText.innerText = "Your turn!";
      box.addEventListener("click", boxClicked);
    } else {
      statusText.innerText = "Waiting for your opponent!";
      box.removeEventListener("click", boxClicked);
    }
  });
};
const boxClicked = (e) => {
  const id = e.target.id;
  if (!spaces[id]) {
    audio.play();
    spaces[id] = currentPlayer;
    $.ajax({
      type: "POST",
      url: "db.php",
      data: {
        checking: true,
        id: id,
        user: spaces[id],
      },
      success: function (response) {},
    });
    e.target.innerText = currentPlayer;
    if (playerHasWon()) {
      if (currentPlayer == o_text) {
        click = 0;
        statusText.innerText = `YOU WON!`;
        return;
      } else {
        click = 0;
        statusText.innerText = `YOU LOST!`;
        return;
      }
    }
    totalMove += 1;
    if (click > 8) {
      click = 0;
      statusText.innerText = `It's a DRAW!`;
    }
    if (currentPlayer == o_text) {
      currentPlayer = x_text;
    } else {
      currentPlayer = o_text;
    }
  }
};
const playerHasWon = () => {
  if (serverresponse[0] == currentPlayer) {
    if (
      serverresponse[1] == currentPlayer &&
      serverresponse[2] == currentPlayer
    ) {
      console.log("win top");
      return true;
    }
    if (
      serverresponse[3] == currentPlayer &&
      serverresponse[6] == currentPlayer
    ) {
      console.log("win left");
      return true;
    }
    if (
      serverresponse[4] == currentPlayer &&
      serverresponse[8] == currentPlayer
    ) {
      console.log("win diagonal");
      return true;
    }
  }
  if (serverresponse[8] == currentPlayer) {
    if (
      serverresponse[5] == currentPlayer &&
      serverresponse[2] == currentPlayer
    ) {
      console.log("win right");
      return true;
    }
    if (
      serverresponse[6] == currentPlayer &&
      serverresponse[7] == currentPlayer
    ) {
      console.log("win bottom");
      return true;
    }
  }
  if (serverresponse[4] == currentPlayer) {
    if (
      serverresponse[1] == currentPlayer &&
      serverresponse[7] == currentPlayer
    ) {
      console.log("win middle");
      return true;
    }
    if (
      serverresponse[3] == currentPlayer &&
      serverresponse[5] == currentPlayer
    ) {
      console.log("win center");
      return true;
    }
    if (
      serverresponse[2] == currentPlayer &&
      serverresponse[6] == currentPlayer
    ) {
      console.log("win diagonal");
      return true;
    }
  }

  if (serverresponse[0] == 1) {
    if (serverresponse[1] == 1 && serverresponse[2] == 1) {
      console.log("win top");
      currentPlayer = "opponent";
      return (winner = true);
    }
    if (serverresponse[3] == 1 && serverresponse[6] == 1) {
      console.log("win left");
      currentPlayer = "opponent";
      return (winner = true);
    }
    if (serverresponse[4] == 1 && serverresponse[8] == 1) {
      console.log("win diagonal");
      currentPlayer = "opponent";
      return (winner = true);
    }
  }
  if (serverresponse[8] == 1) {
    if (serverresponse[5] == 1 && serverresponse[2] == 1) {
      console.log("win right");
      currentPlayer = "opponent";
      return (winner = true);
    }
    if (serverresponse[6] == 1 && serverresponse[7] == 1) {
      console.log("win bottom");
      currentPlayer = "opponent";
      return (winner = true);
    }
  }
  if (serverresponse[4] == 1) {
    if (serverresponse[1] == 1 && serverresponse[7] == 1) {
      console.log("win middle");
      currentPlayer = "opponent";
      return (winner = true);
    }
    if (serverresponse[3] == 1 && serverresponse[5] == 1) {
      console.log("win center");
      currentPlayer = "opponent";
      return (winner = true);
    }
    if (serverresponse[2] == 1 && serverresponse[6] == 1) {
      console.log("win diagonal");
      currentPlayer = "opponent";
      return (winner = true);
    }
  }
};

refresh.addEventListener("click", () => {
  refresh();
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  function refresh() {
    $.ajax({
      type: "POST",
      url: "dbrefresh.php",
      data: {
        checking: true,
      },
      success: function (response) {
        getdata();
      },
    });
  }
  statusText.innerText = `Let's Play`;
  currentPlayer = o_text;
  totalMove = 0;
  serverresponse = [];
  click = 0;
});

drawBoard();
