// update tiles font color
function updateFontColor(tiles) {
  const clr = {
    2: "yellow",
    4: "blue",
    8: "white",
    16: "red",
    32: "green",
    64: "pink",
    128: "purple",
    256: "orange",
    512: "cyan",
    1024: "darkblue",
    2048: "darkred",
  };

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].style.color = clr[parseInt(tiles[i].innerText)];
  }
}

export { updateFontColor };
