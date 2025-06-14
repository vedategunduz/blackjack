/**
 * @file Kart sınıfı
 */
export class Card {
  /**
   * @param {'A'|2|3|…|'K'} value
   * @param {'♣'|'♦'|'♥'|'♠'} suit
   */
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}
