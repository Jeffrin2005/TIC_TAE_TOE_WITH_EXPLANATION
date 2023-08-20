/* 
let playerText = document.getElementById('playerText'): This line gets the element with the ID 'playerText' and assigns it to the variable playerText.
let restartBtn = document.getElementById('restartBtn'): This line gets the element with the ID 'restartBtn' and assigns it to the variable restartBtn.
let boxes = Array.from(document.getElementsByClassName('box')): This line gets all elements with the class name 'box', creates an array from them, and assigns it to the variable boxes.
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks'): This line gets the value of the CSS property '--winning-blocks' of the document.body element and assigns it to the variable winnerIndicator.
*/
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

/*
const O_TEXT = "O": This line defines a constant variable O_TEXT and assigns the value "O" to it.
const X_TEXT = "X": This line defines a constant variable X_TEXT and assigns the value "X" to it.
let currentPlayer = X_TEXT: This line defines a variable currentPlayer and assigns the value of X_TEXT to it, which is "X".
let spaces = Array(9).fill(null): This line creates an array of length 9, fills it with the value null, and assigns it to the variable spaces.
*/
const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

/*
The startGame function is an arrow function that adds an event listener to each element in the boxes array. The event listener listens for a 'click' event on each box element, and when a box is clicked, it calls the boxClicked function.

The purpose of this code is to set up the game by adding interactivity to the box elements. When a user clicks on a box, the boxClicked function will be called, which can then handle the game logic for what should happen when a box is clicked.

let playerText = document.getElementById('playerText'): This line is used to get a reference to the element with the ID 'playerText', which can then be used to manipulate the element in the code.
let restartBtn = document.getElementById('restartBtn'): This line is used to get a reference to the element with the ID 'restartBtn', which can then be used to manipulate the element in the code.
let boxes = Array.from(document.getElementsByClassName('box')): This line is used to get an array of all elements with the class name 'box', which can then be used to manipulate these elements in the code.
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks'): This line is used to get the value of the CSS custom property '--winning-blocks' of the document.body element, which can then be used in the code.
*/

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

/*
const id = e.target.id: This line gets the ID of the clicked box element from the event object e and assigns it to the constant variable id.
if(!spaces[id]): This line checks if the space in the spaces array at the index corresponding to the clicked box’s ID is empty (i.e., has not been clicked yet).
spaces[id] = currentPlayer: If the space is empty, this line assigns the value of currentPlayer to the space in the spaces array at the index corresponding to the clicked box’s ID.
e.target.innerText = currentPlayer: This line sets the text of the clicked box element to the value of currentPlayer.
if(playerHasWon() !==false): This line calls the playerHasWon function and checks if its return value is not false, which means that a player has won.
playerText.innerHTML = ${currentPlayer} has won!``: If a player has won, this line sets the HTML content of the playerText element to display a message indicating that the current player has won.
let winning_blocks = playerHasWon(): This line calls the playerHasWon function again and assigns its return value to the variable winning_blocks.
winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator): This line uses the Array.prototype.map() method to iterate over each element in the winning_blocks array, which represents the indices of the winning blocks, and sets their background color to the value of winnerIndicator.
return: This line exits the function early if a player has won.
currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT: If no player has won yet, this line uses a ternary operator to switch the value of currentPlayer between "X" and "O".
*/
function boxClicked(e) {
    const id = e.target.id
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}
/*
The winningCombos variable is an array of arrays, where each inner array represents a possible winning combination in a tic-tac-toe game.
Each inner array contains three numbers, which represent the indices of the spaces on the tic-tac-toe board that must be occupied by the same player in order to win.
For example, the first inner array [0,1,2] represents a winning combination where the spaces at indices 0, 1, and 2 are occupied by the same player. This corresponds to the top row of the tic-tac-toe board.
Similarly, the inner array [3,4,5] represents a winning combination where the spaces at indices 3, 4, and 5 are occupied by the same player, which corresponds to the middle row of the board.
This variable can be used in the game logic to check if a player has won by checking if any of the winning combinations are satisfied.
*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

/*
for (const condition of winningCombos): This line starts a for...of loop that iterates over each element in the winningCombos array. Each element is a possible winning combination, represented by an array of three numbers.
let [a, b, c] = condition: This line uses destructuring assignment to assign the values of the current condition array to the variables a, b, and c.
if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])): This line checks if the space at index a in the spaces array is not empty, and if the values at indices a, b, and c in the spaces array are all equal.
return [a,b,c]: If the condition is satisfied, this line returns an array containing the indices of the winning combination.
return false: If no winning combination is found after iterating over all elements in the winningCombos array, this line returns false.
*/
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
/*
The line of code restartBtn.addEventListener('click', restart) adds an event listener to the restartBtn element. The event listener listens for a 'click' event on the restartBtn element, and when it is clicked, it calls the restart function.
The purpose of this code is to add interactivity to the restartBtn element. When a user clicks on the restartBtn, the restart function will be called, which can then handle the game logic for restarting the game.
*/

restartBtn.addEventListener('click', restart)

/*
spaces.fill(null): This line uses the Array.prototype.fill() method to fill all elements in the spaces array with the value null, which represents an empty space on the tic-tac-toe board.
boxes.forEach( box => {...}): This line starts a forEach loop that iterates over each element in the boxes array, which represents the box elements on the page.
box.innerText = '': Inside the loop, this line sets the text content of each box element to an empty string, which clears any text that was previously displayed in the box.
box.style.backgroundColor='': This line sets the background color of each box element to an empty string, which removes any background color that was previously applied to the box.
playerText.innerHTML = 'Tic Tac Toe': This line sets the HTML content of the playerText element to display the text 'Tic Tac Toe'.
currentPlayer = X_TEXT: This line sets the value of the currentPlayer variable to X_TEXT, which represents the player who will make the first move.
The last line, startGame(), calls the startGame function, which adds event listeners to the box elements to make them interactive.
*/
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    playerText.innerHTML = 'Tic Tac Toe'
    currentPlayer = X_TEXT
}
startGame()