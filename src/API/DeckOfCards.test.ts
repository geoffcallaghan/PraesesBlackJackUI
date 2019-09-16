import { DeckOfCards, Suit } from "./DeckOfCards"

var deck = new DeckOfCards();

test('should have 52 cards', () => {
        expect(deck.Cards).toHaveLength(52);
  })

test('should have 13 cards of each suit', () => {
    expect(deck.Cards.filter((card) => card.CardSuit === Suit.Clubs)).toHaveLength(13);
    expect(deck.Cards.sort((card) => card.CardNumber).filter((card) => card.CardSuit === Suit.Hearts)).toHaveLength(13);
    expect(deck.Cards.filter((card) => card.CardSuit === Suit.Diamonds)).toHaveLength(13);
    expect(deck.Cards.filter((card) => card.CardSuit === Suit.Spades)).toHaveLength(13);
})

test('Hearts should have the correct 13 cards', () => {
    var hearts = deck.Cards.filter((card) => card.CardSuit === Suit.Hearts);
    for(let i = 1; i <= 13; i++){
        expect(hearts.filter((card) => card.CardNumber === i)).toHaveLength(1);
    }
})

test('Spades should have the correct 13 cards', () => {
    var hearts = deck.Cards.filter((card) => card.CardSuit === Suit.Spades);
    for(let i = 1; i <= 13; i++){
        expect(hearts.filter((card) => card.CardNumber === i)).toHaveLength(1);
    }
})

test('Diamonds should have the correct 13 cards', () => {
    var hearts = deck.Cards.filter((card) => card.CardSuit === Suit.Diamonds);
    for(let i = 1; i <= 13; i++){
        expect(hearts.filter((card) => card.CardNumber === i)).toHaveLength(1);
    }
})

test('Clubs should have the correct 13 cards', () => {
    var hearts = deck.Cards.filter((card) => card.CardSuit === Suit.Clubs);
    for(let i = 1; i <= 13; i++){
        expect(hearts.filter((card) => card.CardNumber === i)).toHaveLength(1);
    }
})

test('If there are no cards left, DrawCard should return undefined', () => {
    for (var i = 0; i < 52; i++){
        deck.drawCard();
    }
    expect(deck.drawCard()).toBeUndefined();
})