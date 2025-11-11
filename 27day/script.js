const cards = document.querySelectorAll('.card');
let flippedCard = false;
let firstCard, secondCard;

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

function flipCard() {
    // कार्ड पलटने पर 'flipped' class जोड़ो
    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    flippedCard = false;

    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }, 1000);
}
