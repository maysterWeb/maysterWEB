const symbols = ['♓', '♒', '♑', '♐'];
const cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesCard = 0;

function createBoard() {
    const gameBoard = document.getElementById('game');

    for (let i = 0; i < symbols.length; i++) {
        for (let j = 0; j < 2; j++) {
            const card = document.createElement('div');
            card.classList.add('kartochka');
            card.dataset.id = symbols[i];
            card.innerHTML = `<span class="symbol">${symbols[i]}</span>`;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        }
    }

    shuffleCards();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    matchesCard++;
    if (matchesCard === symbols.length) {
        alert('ти виграв.');
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

createBoard();