// tile being grabbed
let tileBeingGrabbed = {
  numberOfTheTileBeingDragged: 0,
  idOfTheCurrentlyGrabbedTile: 0,
};

let targetTile;
let tileToBeDropped;

function allowDrop(ev) {
  ev.preventDefault();
  targetTile = ev.target.id;
}

function drag(ev) {
  tileBeingGrabbed.numberOfTheTileBeingDragged = parseInt(ev.target.innerText);
  tileBeingGrabbed.idOfTheCurrentlyGrabbedTile = ev.target.id;

  removeAttributes();

  tileMoves();

  tileToBeDropped = tileBeingGrabbed.idOfTheCurrentlyGrabbedTile;
}

// check which tile is being dragged and sets attributes to the neighbor
function tileMoves() {
  let tileNumber = parseInt(
    tileBeingGrabbed.idOfTheCurrentlyGrabbedTile.split("-")[1]
  );

  /* ----- HORIZONTAL MOVE ----- */

  // tiles from 2 to 24
  if (tileNumber >= 2 && tileNumber <= 24) {
    moveTile("right", tileNumber);
    moveTile("left", tileNumber);
  }

  // horizontal move - tile 1
  if (tileNumber === 1) {
    moveTile("right", tileNumber);
  }

  // horizontal move - tile 25
  if (tileNumber === 25) {
    moveTile("left", tileNumber);
  }

  /* ----- VERTICAL MOVE ----- */

  // tiles from 6 to 24
  if (tileNumber >= 6 && tileNumber <= 20) {
    moveTile("up", tileNumber);
    moveTile("down", tileNumber);
  }

  // tiles from 1 to 5
  if (tileNumber >= 1 && tileNumber <= 5) {
    moveTile("down", tileNumber);
  }

  // tiles from 21 to 25
  if (tileNumber >= 21 && tileNumber <= 25) {
    moveTile("up", tileNumber);
  }
}

// set attributes to the neighbor tiles
function moveTile(el, tileNumber) {
  let tile = document.querySelector(`#tile-${tileNumber - 1}`);

  el === "right"
    ? (tile = document.querySelector(`#tile-${tileNumber + 1}`))
    : el === "left"
    ? (tile = document.querySelector(`#tile-${tileNumber - 1}`))
    : el === "down"
    ? (tile = document.querySelector(`#tile-${tileNumber + 5}`))
    : (tile = document.querySelector(`#tile-${tileNumber - 5}`));

  tile.setAttribute("ondrop", "drop(event)");
  tile.setAttribute("ondragover", "allowDrop(event)");
}

function drop(ev) {
  ev.preventDefault();

  forbideTilesToCombine(tileToBeDropped, targetTile, tileBeingGrabbed, ev);
}

// keeps opposite corner tiles from being allowed to combine
function forbideTilesToCombine(
  tileToBeDropped,
  targetTile,
  tileBeingGrabbed,
  ev
) {
  let theTileToBeDroppedElement = document.querySelector(`#${tileToBeDropped}`)
    .innerText;
  let TargetTileElement = document.querySelector(`#${targetTile}`).innerText;

  // prevent ilegal move
  let innerTextOfTheTileToBeDropped = tileToBeDropped.split("-")[1];
  let innerTextOfTheTargetTile = targetTile.split("-")[1];

  // set tiles that should not be combined
  const matches = [
    [5, 6],
    [10, 11],
    [15, 16],
    [20, 21],
  ];

  if (
    matches.some(
      ([a, b]) =>
        innerTextOfTheTileToBeDropped == a && innerTextOfTheTargetTile == b
    ) ||
    matches.some(
      ([a, b]) =>
        innerTextOfTheTargetTile == a && innerTextOfTheTileToBeDropped == b
    )
  ) {
    //--- ilegal move
    //--- keep tile from changing value
    ilegalMove(
      tileToBeDropped,
      theTileToBeDroppedElement,
      targetTile,
      TargetTileElement
    );
  } else {
    legalMove(tileBeingGrabbed, ev);
  }
}

// --- legal move
// ---changing tile value
function legalMove(tileBeingGrabbed, ev) {
  let tileGrabbed = document.querySelector(
    `#${tileBeingGrabbed.idOfTheCurrentlyGrabbedTile}`
  );

  if (
    parseInt(ev.target.innerText) ===
    tileBeingGrabbed.numberOfTheTileBeingDragged
  ) {
    ev.target.innerText =
      parseInt(ev.target.innerText) +
      tileBeingGrabbed.numberOfTheTileBeingDragged;

    // populate tile with newly created number
    tileGrabbed.innerText = document
      .querySelector("#next-number")
      .innerText.split(" ")[2];

    document.querySelector("#next-number").innerText =
      "next number: " + nextNumber();
  }
}

// fix ilegal movement
// keep tile from changing value
function ilegalMove(
  tileToBeDropped,
  theTileToBeDroppedElement,
  targetTile,
  TargetTileElement
) {
  document.querySelector(
    `#${tileToBeDropped}`
  ).innerText = theTileToBeDroppedElement;
  document.querySelector(`#${targetTile}`).innerText = TargetTileElement;
}

// set next number
function nextNumber() {
  let numbers = [2, 4, 8];
  return numbers[Math.floor(Math.random() * 3)];
}

// remove attributes from every tiles
function removeAttributes() {
  let tiles = document.querySelectorAll(".tile");

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].removeAttribute("ondrop");
    tiles[i].removeAttribute("ondragover");
  }
}
