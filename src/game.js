import { Deck } from './deck.js';
import { Hand } from './hand.js';

/**
 * @file Oyun akışı
 */
export class Game {
  constructor() {
    this.deck   = new Deck();
    this.player = new Hand();
    this.dealer = new Hand();
    this.isOver = false;
  }

  start() {
    this.isOver = false;
    this.deck.reset();
    this.deck.shuffle();
    this.player = new Hand();
    this.dealer = new Hand();
    this.player.add(this.deck.draw());
    this.dealer.add(this.deck.draw());
  }

  drawPlayer() {
    if (this.isOver) return;
    this.player.add(this.deck.draw());
    if (this.player.score > 21) this.isOver = true;
  }

  stand() {
    if (this.isOver) return;
    while (this.dealer.score < 17) {
      this.dealer.add(this.deck.draw());
    }
    this.isOver = true;
  }

  getResult() {
    if (this.player.score > 21)            return 'You busted!';
    if (this.dealer.score > 21)            return 'Dealer busted! You win!';
    if (this.player.score > this.dealer.score) return 'You win!';
    if (this.player.score < this.dealer.score) return 'Dealer wins!';
    return "It's a tie!";
  }
}
