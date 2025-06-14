/**
 * @file El yönetimi ve skor
 */
export class Hand {
  constructor() {
    this.cards = [];
  }

  add(card) {
    this.cards.push(card);
  }

  get score() {
    let total = 0, aces = 0;
    for (const c of this.cards) {
      if (typeof c.value === 'number') total += c.value;
      else if (c.value === 'A') { total += 11; aces++; }
      else total += 10;
    }
    while (total > 21 && aces > 0) {
      total -= 10; aces--;
    }
    return total;
  }
}
