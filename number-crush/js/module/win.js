// display 'you lose!' message
function showWinMessage(tiles, changeChecker) {
  let goal = "2048";
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].innerText === goal) {
      let popup = document.querySelector("#info");
      popup.innerHTML = `<h2>you win!</h2>`;
      displayCrowns(tiles, goal);
      clearInterval(changeChecker);
    }
  }

  function displayCrowns(tiles, goal) {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].innerText !== goal) {
        tiles[i].innerHTML = '<i class="fas fa-crown crown"></i>';
      }
    }
  }
}

export { showWinMessage };
