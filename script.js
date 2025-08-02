document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            messageElement.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            messageElement.textContent = `It's a draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Current Player: ${currentPlayer}`;
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        messageElement.textContent = `Current Player: ${currentPlayer}`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    messageElement.textContent = `Current Player: ${currentPlayer}`;
});


const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const gameResultDisplay = document.getElementById('game-result');
const buttons = document.querySelectorAll('.choices button');

const choices = ['rock', 'paper', 'scissors'];

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const playerChoice = e.target.id;
    playerChoiceDisplay.textContent = capitalize(playerChoice);

    // Clear previous computer choice and result
    computerChoiceDisplay.textContent = '';
    gameResultDisplay.textContent = '';

    // Delay the computer's move by 0.5 seconds (500 ms)
    setTimeout(() => {
      const computerChoice = generateComputerChoice();
      computerChoiceDisplay.textContent = capitalize(computerChoice);

      determineWinner(playerChoice, computerChoice);
    }, 500);
  });
});


function generateComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(player, computer) {
  if (player === computer) {
    gameResultDisplay.textContent = "It's a tie!";
  } else if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    gameResultDisplay.textContent = "You win!";
  } else {
    gameResultDisplay.textContent = "You lose!";
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}



function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


