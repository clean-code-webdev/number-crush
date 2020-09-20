function setTilesAttributes(tiles) {
  tiles.forEach((tile) => {
    tile.setAttribute("draggable", "true");
    tile.setAttribute("ondragstart", "drag(event)");
  });
}

export { setTilesAttributes };
