const d = document;

d.addEventListener("DOMContentLoaded", () => {
  let $cells = d.querySelectorAll(".cell"),
    $restart = d.querySelector(".restart"),
    $status = d.querySelector(".status"),
    winConditions = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", " 7", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
    ],
    options = ["", "", "", "", "", "", "", "", ""],
    running = false,
    currentPlayer = "X";

  startGame();

  function startGame() {
    running = true;
    $status.textContent = `Turno del jugador ${currentPlayer}`;
    $cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    $restart.addEventListener("click", restarGame);
  }

  function cellClicked() {
    let position = this.getAttribute("data-number");
    if (options[position] !== "" || !running) {
      return;
    }

    checkCell(this, position);

    checkWinner();
  }

  function checkCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
  }

  function checkWinner() {
    let won = false;
    for (let i = 0; i < winConditions.length; i++) {
      let condition = winConditions[i];
      let posA = options[condition[0]];
      let posB = options[condition[1]];
      let posC = options[condition[2]];

      if (posA === "" || posB === "" || posC === "") {
        continue;
      }

      if (posA === posB && posB === posC) {
        won = true;
        break;
      }
    }

    if (won) {
      running = false;
      $status.textContent = `El ganador es el jugador ${currentPlayer}`;
    } else if (!options.includes("")) {
      running = false;
      $status.textContent = `Empate!`;
    } else {
      changePlayer();
    }
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    $status.textContent = `Turno del jugador ${currentPlayer}`;
  }

  function restarGame() {
    running = true;
    (options = ["", "", "", "", "", "", "", "", ""]), (currentPlayer = "X");
    $status.textContent = `Turno del jugador ${currentPlayer}`;
    $cells.forEach((cell) => (cell.textContent = ""));
  }
});
