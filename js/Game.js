import { Deck } from './Deck.js';
import { Player } from './Player.js';

export class Game {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();

        this.player = new Player("Oyuncu");
        this.dealer = new Player("Krupiye");
    }

    oyuncuKartCek() {
        const kart = this.player.draw(this.deck);
        return kart;
    }
}
