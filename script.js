

const playerFactory = (name, symbol) => {
    // data:
    const pName = name
    const pSymbol = symbol
    
    // functions:
    const getName = () => pName
    const getSymbol = () => pSymbol

    return {getName, getSymbol}
}

// module pattern
let gameboard = (() => {
    let p1 = playerFactory('Silas', 'X')
    let p2 = playerFactory('Computer', 'O')
    const playerIndicator = document.querySelector('h2')
    // let board = [ [null,null,null],[null,null,null],[null,null,null] ]
    // const board = Array(9).fill(null)
    const board = document.querySelectorAll('.grid')
    let currPlayer = p1
    const init = () => {
        // set up indication of which player starts:
        playerIndicator.innerHTML = `${currPlayer.getName()}'s turn to place a ${currPlayer.getSymbol()}`

        // reset the board and add event handlers:
        board.forEach(el => {
            el.innerHTML = ''
            el.addEventListener('click', onMove)
        });
    }

    // function playerHasWon(symbol){
    const playerHasWon = (symbol) => (
            (symbol === board[0].innerHTML && board[0].innerHTML === board[1].innerHTML && board[1].innerHTML === board[2].innerHTML) || // row 0
            (symbol === board[3].innerHTML && board[3].innerHTML === board[4].innerHTML && board[4].innerHTML === board[5].innerHTML) || // row 1
            (symbol === board[6].innerHTML && board[6].innerHTML === board[7].innerHTML && board[7].innerHTML === board[8].innerHTML) || // row 2

            (symbol === board[0].innerHTML && board[0].innerHTML === board[3].innerHTML && board[3].innerHTML === board[6].innerHTML) || // col 0
            (symbol === board[1].innerHTML && board[1].innerHTML === board[4].innerHTML && board[4].innerHTML === board[7].innerHTML) || // col 1
            (symbol === board[2].innerHTML && board[2].innerHTML === board[5].innerHTML && board[5].innerHTML === board[8].innerHTML) || // col 2

            (symbol === board[0].innerHTML && board[0].innerHTML === board[4].innerHTML && board[4].innerHTML === board[8].innerHTML) || // hor 0
            (symbol === board[2].innerHTML && board[2].innerHTML === board[4].innerHTML && board[4].innerHTML === board[6].innerHTML)    // hor 0
        )

    function onMove(e) {
        const coordinate = parseInt(this.getAttribute('data-id'))

        if (board[coordinate].innerHTML !== '') {
            console.log(`invalid move, tile ${coordinate} already has be played.`)
            return
        }

        // update gameboard
        this.innerHTML = currPlayer.getSymbol()
        
        // check to see if they won
        if (playerHasWon(currPlayer.getSymbol())) {
            console.log(`Player ${currPlayer.getName()} has won!`)
            playerIndicator.innerHTML = `${currPlayer.getName()} has won, refresh to play again...`

            board.forEach(el => {
                el.classList.add('done')
                el.classList.remove('hover')
                el.removeEventListener('click', onMove)
            })
            return
        }

        // update player state
        currPlayer = (currPlayer === p1) ? p2 : p1
        
        // update page to reflect whos turn it is.
        playerIndicator.innerHTML = `${currPlayer.getName()}'s turn to place a ${currPlayer.getSymbol()}`
        console.log(`gameboard, click on ${this.getAttribute('data-id')}`)
    }



    init()
    return {playerHasWon, onMove}
})();
