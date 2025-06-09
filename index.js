// index.js
import { Game } from './js/Game.js';

const oyun = new Game();


document.addEventListener('click', function (event) {
    event.target.closest('.draw') && (function () {
        console.log(oyun.oyuncuKartCek());
    })();
});
