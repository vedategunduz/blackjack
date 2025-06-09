export class Player {
  constructor(ad) {
    this.ad = ad;
    this.hand = [];
  }

  draw(deck) {
    const card = deck.draw();
    this.hand.push(card);
    console.log(`${this.ad} drew ${card.name}`);
  }

  get total() {
    let total = 0;
    let aces = 0;

    for (const card of this.hand) {
      total += card.points;
      if (card.value === "A") aces++;
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  }
}
