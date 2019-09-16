export enum Suit {
    Hearts,
    Diamonds,
    Spades,
    Clubs

}

export class DeckOfCards  {
    MaxCards: number = 52;
    Cards: Card[] = [];

    constructor() {
        const initCards: number[] = [];
        for (let i = 0; i < this.MaxCards; i++){
            initCards.push(i);
        }
        this.shuffleArray(initCards);
        initCards.map((card) => this.Cards.push(new Card(card)));
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     */
    shuffleArray(array: number[]) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    public drawCard(): Card | undefined {
        var cardsLeft = this.remainingCards();
        if (cardsLeft === 0)
            return undefined;
        var cardToDraw = Math.floor(Math.random() * cardsLeft);
        var card = this.Cards.filter((card) => !card.AlreadyDrawn)[cardToDraw];
        card.AlreadyDrawn = true;
        console.log("Dealer drew " + card.CardNumber + " of " + Suit[card.CardSuit]);
        return card;
    }

    public remainingCards(): number {
        return this.Cards.filter((card) => !card.AlreadyDrawn).length;
    }
}

export class Card {
    constructor(cardNumber:number){
        this.CardNumber = (cardNumber % 13) + 1;
        this.CardSuit = Math.floor((cardNumber/13));
        console.log(this.CardNumber + " of " + Suit[this.CardSuit]);
        this.AlreadyDrawn = false;

        this.CardValue = this.CardNumber > 10 ? 10 : this.CardNumber;

    }
    CardNumber: number;
    CardSuit: Suit;
    AlreadyDrawn: boolean;
    CardValue: number;
}