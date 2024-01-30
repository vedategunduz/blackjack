// Kart değerleri ve türleri tanımlanıyor
const card = {
    values: ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
    types: ["Clubs", "Diamonds", "Hearts", "Spades"]
};

// Çekilebilecek kartlar ve seçilen kartlar için boş diziler oluşturuluyor
let cards = [];
let selectedCards = [];

// Oyuncuların kart bilgilerini tutacak nesne oluşturuluyor
const playerCardInfos = {};

// Oyuncu isimleri tanımlanıyor
const playerNames = ["You", "Courpier"];

// Her oyuncu için boş bir kart listesi oluşturuluyor
playerNames.forEach(name => {
    playerCardInfos[name] = [];
});

// Oyuncuya kart çekme işlemi
function hit(player) {
    // Kart çekiliyor
    const randomIndex = random(0, cards.length);
    const cardDrawn = cards[randomIndex];

    // Eğer çekilen kart daha önce çekilmediyse
    if (!selectedCards.includes(cardDrawn) && cards.length > 0) {
        // Çekilen kartı listeden çıkar
        cards.splice(randomIndex, 1);
        // Çekilen kartı kaydet
        selectedCards.push(cardDrawn);
        playerCardInfos[player].push(cardDrawn);
    } else if (cards.length > 0) {
        // Eğer çekilen kart daha önce çekildiyse, tekrar kart çek
        hit(player);
    } else {
        console.error("Yeni deste gerekiyor.");
    }
    // Oyuncu kart bilgilerini konsola yazdır
    console.log(playerCardInfos);
}

// Rastgele sayı üreteci fonksiyonu
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Kart deste oluşturma
card.types.forEach(type => {
    card.values.forEach(val => {
        cards.push(`${type} ${val}`);
    });
});
