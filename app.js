'use strict';

const card = {
    suits: ["♣", "♦", "♥", "♠"],
    values: ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
};

let deck = [];

function initDeck() {
    deck = [];
    card.suits.forEach(suit => {
        card.values.forEach(value => {
            deck.push({ value, suit });
        });
    });
}

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function draw() {
    return deck.pop();
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    hand.forEach(card => {
        if (typeof card.value === 'number') {
            score += card.value;
        } else if (card.value === 'A') {
            score += 11;
            aces++;
        } else {
            score += 10;
        }
    });

    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

const players = {
    'you': { hand: [], score: 0 },
    'dealer': { hand: [], score: 0 }
};

let gameStarted = false;

function createCard(card) {
    return `<div class="card">
                <div class="value">${card.value}</div>
                <div class="suit">${card.suit}</div>
            </div>`;
}

const playerEl = document.querySelector('#player');
const dealerEl = document.querySelector('#dealer');
const resultEl = document.querySelector('#result');
const playerScoreEl = document.querySelector('#player-score');
const dealerScoreEl = document.querySelector('#dealer-score');

function updateUI() {
    playerEl.innerHTML = players.you.hand.map(createCard).join('');
    dealerEl.innerHTML = players.dealer.hand.map(createCard).join('');
    playerScoreEl.innerText = `Score: ${players.you.score}`;
    dealerScoreEl.innerText = `Score: ${players.dealer.score}`;
}

startGame();

function startGame() {
    gameStarted = true;
    initDeck();
    shuffle();

    players.you.hand = [draw()];
    players.dealer.hand = [draw()];

    players.you.score = calculateScore(players.you.hand);
    players.dealer.score = calculateScore(players.dealer.hand);

    resultEl.innerHTML = '';
    updateUI();
}

function standLogic() {
    while (players.dealer.score < 17) {
        players.dealer.hand.push(draw());
        players.dealer.score = calculateScore(players.dealer.hand);
    }

    updateUI();

    if (players.you.score > 21) {
        resultEl.innerHTML = "You busted!";
    } else if (players.dealer.score > 21 || players.you.score > players.dealer.score) {
        resultEl.innerHTML = "You win!";
    } else if (players.you.score < players.dealer.score) {
        resultEl.innerHTML = "Dealer wins!";
    } else {
        resultEl.innerHTML = "It's a tie!";
    }

    gameStarted = false;
}

document.addEventListener('click', function (event) {
    if (!gameStarted) startGame();

    if (event.target.closest('.draw')) {
        players.you.hand.push(draw());
        players.you.score = calculateScore(players.you.hand);
        updateUI();

        if (players.you.score > 21) {
            resultEl.innerHTML = "You busted!";
            gameStarted = false;
        } else if (players.you.score === 21) {
            standLogic(); // otomatik stand
        }
    }

    if (event.target.closest('.stand')) {
        standLogic();
    }

    if (event.target.closest('.reset')) {
        players.you.hand = [];
        players.dealer.hand = [];
        players.you.score = 0;
        players.dealer.score = 0;
        gameStarted = false;
        resultEl.innerHTML = '';
        playerEl.innerHTML = '';
        dealerEl.innerHTML = '';
        playerScoreEl.innerText = 'Score: 0';
        dealerScoreEl.innerText = 'Score: 0';
    }
});
