const card = {
    "values": ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
    "types": ["Clubs", "Diamonds", "Hearts", "Spades"]
}

let cards = [];
let selectedCards = [];

card.types.forEach(type => {
    card.values.forEach(val => {
        cards.push(`${type} ${val}`);
    });
});

let playerCardInfos = new Object();
let you = true;
const playerNames = ["You", "Courpier"];

playerNames.forEach(name => {
    playerCardInfos[name] = [];
});

function hit() {
    //  Kart çek
    const card = cards[random(0, cards.length)];
    const index = cards.indexOf(card);

    if (!selectedCards.includes(card) && cards.length > 0) {
        // Eğer çekilen kart daha önceden çekilmemiş ise
        // Çekilen kartı listeden çıkart
        cards.splice(index, 1);
        // Çekilen kartı kaydet
        selectedCards.push(card);
        if (you) {
            playerCardInfos.You.push(card);
        } else {
            playerCardInfos.Courpier.push(card);
        }
    }
    else if (cards.length > 0) {
        hit();
    }
    else {
        console.error("Yeni deste oluşturulması lazım.");
    }
    console.log(playerCardInfos);
}
console.log(cards);
// Random number generator
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;;
}