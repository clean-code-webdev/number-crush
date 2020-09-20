function createBoard() {
  let board = document.querySelector("#board");

  for (let i = 0; i < 25; i++) {
    // create a div for the tile
    let tile = document.createElement("div");

    // add class to each tile
    tile.className = "tile";

    // add id to each tile
    tile.id = `tile-${i + 1}`;

    // append tile to board
    board.appendChild(tile);
  }
}

// populate each tile with a random number
function populateTiles(tiles) {
  // numbers to be used when populating tiles
  const tileNumbers = [2, 4, 8];

  tiles.forEach((tile) => {
    tile.innerText =
      tileNumbers[Math.floor(Math.random() * tileNumbers.length)];
  });
}

export { createBoard, populateTiles };
