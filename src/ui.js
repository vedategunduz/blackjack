import { Game } from './game.js';

/**
 * @file UI güncellemeleri ve event handling
 */
export class UI {
  constructor() {
    this.game = new Game();
    this.playerEl = document.querySelector('#player');
    this.dealerEl = document.querySelector('#dealer');
    this.resultEl = document.querySelector('#result');
    this.scoreEls = {
      player: document.querySelector('#player-score'),
      dealer: document.querySelector('#dealer-score'),
    };
    this.bindButtons();
    this.update();
  }

  bindButtons() {
    document.querySelector('.draw')
      .addEventListener('click', () => { this.game.drawPlayer(); this.update(); });
    document.querySelector('.stand')
      .addEventListener('click', () => { this.game.stand(); this.update(); });
    document.querySelector('.reset')
      .addEventListener('click', () => { this.game.start(); this.update(); });
  }

  createCardEl(card) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<div class="value">${card.value}</div>
                     <div class="suit">${card.suit}</div>`;
    return div;
  }

  update() {
    // Eğer oyun başlamadıysa başlat
    if (!this.game.player.cards.length) this.game.start();

    // Eller
    this.playerEl.innerHTML = '';
    this.game.player.cards.forEach(c => this.playerEl.appendChild(this.createCardEl(c)));
    this.dealerEl.innerHTML = '';
    this.game.dealer.cards.forEach(c => this.dealerEl.appendChild(this.createCardEl(c)));

    // Skorlar
    this.scoreEls.player.innerText = `Score: ${this.game.player.score}`;
    this.scoreEls.dealer.innerText = `Score: ${this.game.dealer.score}`;

    // Sonuç
    this.resultEl.innerText = this.game.isOver ? this.game.getResult() : '';
  }
}

// DOM hazır olunca
window.addEventListener('DOMContentLoaded', () => {
  new UI();
});
