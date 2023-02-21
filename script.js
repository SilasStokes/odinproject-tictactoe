const playerFactory = (name, symbol) => {
  // data:
  const pName = name;
  const pSymbol = symbol;

  // functions:
  const getName = () => pName;
  const getSymbol = () => pSymbol;

  return { getName, getSymbol };
};

// module pattern
let gameboard = (() => {
  let p1 = playerFactory("Silas", "X");
  let p2 = playerFactory("Computer", "O");
  const playerIndicator = document.querySelector("h2");
  // let board = [ [null,null,null],[null,null,null],[null,null,null] ]
  // const board = Array(9).fill(null)
  const board = document.querySelectorAll(".grid");
  let currPlayer = p1;
  const init = () => {
    // set up indication of which player starts:
    playerIndicator.innerHTML = `${currPlayer.getName()}'s turn to place a ${currPlayer.getSymbol()}`;

    // reset the board and add event handlers:
    board.forEach((el) => {
      el.innerHTML = "";
      el.addEventListener("click", onMove);
    });
  };

  function isGameOver() {
    // Check for horizontal wins
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i].innerHTML !== "" &&
        board[i].innerHTML === board[i + 1].innerHTML &&
        board[i + 1].innerHTML === board[i + 2].innerHTML
      ) {
        return [i, i+1, i +2]
        // return true;
      }
    }

    // Check for vertical wins
    for (let i = 0; i < 3; i++) {
      if (
        board[i].innerHTML !== "" &&
        board[i].innerHTML === board[i + 3].innerHTML &&
        board[i + 3].innerHTML === board[i + 6].innerHTML
      ) {
        return [i, i + 3, i + 6]
        return true;
      }
    }

    // Check for diagonal wins
    if (board[0].innerHTML !== "" && board[0].innerHTML === board[4].innerHTML && board[4].innerHTML === board[8].innerHTML) {
      return [0, 4, 8]
    }

    if (board[2].innerHTML !== "" && board[2].innerHTML === board[4].innerHTML && board[4].innerHTML === board[6].innerHTML) {
      return [6, 4, 2]
    }
    

    let empty = true
    // Check if the board is full
    board.forEach(el => {
      if (el.innerHTML === '')
        empty = false
    });
    if (empty){
      return [-1]
    }

    // this doesn't work because board is a nodeList not an array
    // if (board.every((cell) => cell !== "")) {
    //   return [-1];
    // }

    // If none of the above conditions are met, the game is not over
    return [];
  }

  function onMove(e) {
    const coordinate = parseInt(this.getAttribute("data-id"));

    if (board[coordinate].innerHTML !== "") {
      console.log(`invalid move, tile ${coordinate} already has be played.`);
      return;
    }

    // update gameboard
    this.innerHTML = currPlayer.getSymbol();

    // check to see if they won
    const win_coordinates = isGameOver()

    if (win_coordinates.length !== 0) {
      board.forEach((el) => {
        el.classList.add("done");
        el.classList.remove("hover");
        el.removeEventListener("click", onMove);
      });

      if (win_coordinates.length === 3 ) { // there was a winnner:
        console.log(`Player ${currPlayer.getName()} has won!`);
        playerIndicator.innerHTML = `${currPlayer.getName()} has won, refresh to play again...`;
        const win = ['W', 'I', 'N']
        for (let i = 0; i < 3; i ++) {
          board[win_coordinates[i]].classList.remove("done")
          board[win_coordinates[i]].classList.add("winner")
          board[win_coordinates[i]].innerHTML = win[i]

        }

      } else {
        console.log(`Tie Game!!`);
        playerIndicator.innerHTML = `Tie Game! Refresh to play again...`;

      }
      return
    }

    // update player state
    currPlayer = currPlayer === p1 ? p2 : p1;

    // update page to reflect whos turn it is.
    playerIndicator.innerHTML = `${currPlayer.getName()}'s turn to place a ${currPlayer.getSymbol()}`;
    console.log(`gameboard, click on ${this.getAttribute("data-id")}`);
  }

  init();
  return {};
})();
