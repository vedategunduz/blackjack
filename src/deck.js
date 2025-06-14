import { Card } from './card.js';

/**
 * @file Deste yönetimi
 */
export class Deck {
  constructor() {
    this.suits  = ['♣','♦','♥','♠'];
    this.values = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
    this.cards  = [];
    this.reset();
  }

  reset() {
    this.cards = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        this.cards.push(new Card(value, suit));
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
