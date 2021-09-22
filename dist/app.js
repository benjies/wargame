import Deck from './deck.js';

// Value Keylist

const CARD_VALUE_MAP = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  0: 0,
};

// Variables, Selectors, Event Listener

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.text');

let playerDeck, computerDeck, inRound, stop;

document.addEventListener('click', () => {
  if (stop) {
    startGame();
    return;
  }
  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

// Begin the Game
startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidPoint));
  computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

// Clean up the game-field function
function cleanBeforeRound() {
  inRound = false;
  text.innerHTML = '';
  computerCardSlot.innerHTML = '';
  playerCardSlot.innerHTML = '';
  updateDeckCount();
}
// Update the DOM to reflect current cards
function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}
// Flip the card over to display current in play card
function flipCards() {
  inRound = true;
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = 'Win';
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = 'Lose';
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = 'Draw';
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }
  if (isGameOver(playerDeck)) {
    text.innerText = 'You lost!';
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = 'You won!';
    stop = true;
  }
}
// Check if the game is over
function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
// Check for winner of the round
function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}
