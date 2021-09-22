// Game variables that can be changed according to user
// Will create a deck by combining the possibilities between the two arrays
const ELEMENTS = ['🔥', '🌊', '🌪️', '⛰️'];
const VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default class Deck {
  constructor(cards = createDeck()) {
    this.cards = cards;
  }
  // Return how many cards are left
  get numberOfCards() {
    return this.cards.length;
  }
  // Shuffle the Deck
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
  // Remove the top card
  pop() {
    return this.cards.shift();
  }
  // Move the card to a deck
  push(card) {
    this.cards.push(card);
  }
}

class Card {
  constructor(element, value) {
    (this.element = element), (this.value = value);
  }
  // Returns the given Card's HTML div for display use
  getHTML() {
    const cardDiv = document.createElement('div');
    cardDiv.innerText = this.element;
    cardDiv.classList.add('card');
    cardDiv.dataset.value = `${this.value} ${this.element}`;
    return cardDiv;
  }
}
// Creates a deck from the elements and values
// Can be changed at the top
let createDeck = () => {
  return ELEMENTS.flatMap((element) => {
    return VALUES.map((value) => {
      return new Card(element, value);
    });
  });
};
