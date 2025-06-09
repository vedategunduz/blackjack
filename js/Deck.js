import { Card } from "./Card.js";

export class Deck {
  constructor() {
    this.cards = [];
    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    for (let suit of suits) {
      for (let value of values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.pop();
  }
}
