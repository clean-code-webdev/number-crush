import * as createBoard from "./module/create-board.js";
import * as setTilesAttributes from "./module/tile-attribute.js";
import * as lose from "./module/loses.js";
import * as color from "./module/colors.js";
import * as win from "./module/win.js";

createBoard.createBoard();

function playingNotPossible() {
  if (window.innerWidth < 1200) {
    document.body.innerHTML = `
    <div id="not-available">
      <h2>Notice! <br> This game is a demo of JavaScript code and does not focus on CSS. To play it, please, open it on a pc or mac.</h2>
    </div>`;
    return;
  }
}

function init() {
  if (window.innerWidth < 1200) {
    playingNotPossible();
    return;
  }

  let playerStats = {
    name: "ricardo",
    loses: false,
    wins: 0,
  };

  let board = document.querySelectorAll("#board");
  let tiles = document.querySelectorAll(".tile");

  createBoard.populateTiles(tiles);

  setTilesAttributes.setTilesAttributes(tiles);

  let changeChecker = setInterval(() => {
    color.updateFontColor(tiles);
    lose.checkIfLoses(tiles, playerStats, changeChecker);
    win.showWinMessage(tiles, changeChecker);
  }, 0);
}

init();
