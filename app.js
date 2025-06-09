'use strict';

// Card
const card = {
    suits: ["Clubs", "Diamonds", "Hearts", "Spades"],
    values: ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
};

const deck = [];

card.suits.forEach(suit => {
    card.values.forEach(value => {
        deck.push({ value, suit });
    });
});

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function draw() {
    return deck.pop();
}

function pointValue(card) {
    if (typeof card.value === 'number') {
        return card.value;
    } else if (card.value === 'A') {
        return 11;
    } else {
        return 10;
    }
}

// Player
const players = {
    'you': {
        hand: [],
        score: 0
    },
    'dealer': {
        hand: [],
        score: 0
    }
};

shuffle();

function createCard(player, card) {
    return `<div class="card">
                <span class="value">${card.value}</span>
                <span class="suit">${card.suit}</span>
            </div>`;
}


const player = document.querySelector('#player');
const dealer = document.querySelector('#dealer');
const result = document.querySelector('#result');

document.addEventListener('click', function (event) {
    event.target.closest('.draw') && (function () {
        const card = draw();

        players.you.hand.push(card);
        players.you.score += pointValue(card);

        player.innerHTML += createCard(players.you, card);

        if (players.you.score > 21) {
            result.innerHTML += "You busted! <br>";
        }
    })();
    event.target.closest('.stand') && (function () {
        while (players.dealer.score < 17) {
            const card = draw();
            players.dealer.hand.push(card);
            players.dealer.score += pointValue(card);

            dealer.innerHTML += createCard(players.dealer, card);
        }

        if (players.you.score > 21) {
            result.innerHTML += "You busted! <br>";
        } else if (players.dealer.score > 21 || players.you.score > players.dealer.score) {
            result.innerHTML += "You win! <br>";
        } else if (players.you.score < players.dealer.score) {
            result.innerHTML += "Dealer wins! <br>";
        } else {
            result.innerHTML += "It's a tie! <br>";
        }
    })();
    event.target.closest('.reset') && (function () {
        players.you.hand = [];
        players.you.score = 0;
        players.dealer.hand = [];
        players.dealer.score = 0;

        player.innerHTML = '';
        dealer.innerHTML = '';
        result.innerHTML = '';

        shuffle();
    })();
});
