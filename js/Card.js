export class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get name() {
    return `${this.value} of ${this.suit}`;
  }

  get points() {
    if (["J", "Q", "K"].includes(this.value)) return 10;
    if (this.value === "A") return 11;
    return parseInt(this.value);
  }
}
