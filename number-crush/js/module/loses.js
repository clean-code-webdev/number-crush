// alert 'you lose!' if plays === 0
function checkIfLoses(tiles, playerStats, changeChecker) {
  // plays possibilities
  let plays = 0;

  // count possible horizontal moves
  (() => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (
        tiles[i].id !== "tile-5" &&
        tiles[i].id !== "tile-10" &&
        tiles[i].id !== "tile-15" &&
        tiles[i].id !== "tile-20" &&
        tiles[i].id !== "tile-25"
      ) {
        if (tiles[i].innerText === tiles[i + 1].innerText) {
          plays++;
        }
      }
    }
  })();

  (() => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i].id.split("-")[1] < 21) {
        if (tiles[i].innerText === tiles[i + 5].innerText) {
          plays++;
        }
      }
    }
  })();

  // write possible moves
  (() => {
    let movesLeft = document.querySelector("#moves");

    // player still playing
    playerStats.loses = false;

    // player loses
    if (plays === 0) {
      playerStats.loses = true;
      // clear interval
      clearInterval(changeChecker);

      showLoseMessage();
    }

    movesLeft.innerText = "possible moves: " + plays * 2;
  })();
}

// display 'you lose!' message
function showLoseMessage() {
  let popup = document.querySelector("#info");
  popup.innerHTML = `<h2>you lose!</h2>`;
}

export { checkIfLoses };
