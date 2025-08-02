document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const movesDisplay = document.getElementById('moves');
    const restartButton = document.getElementById('restartButton');

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Example values
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let lockBoard = false; // Prevents multiple rapid clicks

    function initializeGame() {
        cards = [...cardValues, ...cardValues]; // Duplicate for pairs
        shuffle(cards);
        gameBoard.innerHTML = ''; // Clear existing cards
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        movesDisplay.textContent = moves;
        lockBoard = false;

        cards.forEach((value, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = value;
            cardElement.dataset.index = index;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = value; // Display value on front

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.textContent = '?'; // Or an icon

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardElement.appendChild(cardInner);

            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return; // Prevent clicking the same card twice

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.value === card2.dataset.value;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        flippedCards[0].removeEventListener('click', flipCard);
        flippedCards[1].removeEventListener('click', flipCard);
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedPairs++;
        resetBoard();

        if (matchedPairs === cardValues.length) {
            alert(`Congratulations! You won in ${moves} moves!`);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            resetBoard();
        }, 1000); // Unflip after 1 second
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false];
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame(); // Start the game on page load
});