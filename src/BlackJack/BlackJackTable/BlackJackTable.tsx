import { Card, DeckOfCards } from "../../API/DeckOfCards";
import React from "react";
import { BlackJackHand } from "./BlackJackHand/BlackJackHand";
import "./BlackJackTable.css"


interface IBlackJackTableProps {
    NumberOfPlayers: number;
}

interface IBlackJackTableState {
    DealerHand: Card[];
    PlayerHand: Card[];
    Deck: DeckOfCards;
    PlayerWinCount: number;
    DealerWinCount: number;
    Winner: Winner;
}

enum Winner {
    GameOn, 
    PlayerWins, 
    DealerWins,
    PlayerBlackJack,
    DealerBlackJack
}

export class BlackJackTable extends React.Component<IBlackJackTableProps,IBlackJackTableState> {
    constructor(props: Readonly<IBlackJackTableProps>) {
        super(props);
        var deck = new DeckOfCards();
        var dealerHand: Card[] = [];
        var playerHand: Card[] = [];
        this.AddCardToHand(deck, dealerHand);
        this.AddCardToHand(deck, playerHand);
        this.state = {
            DealerHand: dealerHand, 
            PlayerHand: playerHand, 
            Deck: deck, 
            PlayerWinCount: 0, 
            DealerWinCount: 0,
            Winner: Winner.GameOn
        };
    }

    render(){
        return <div> 
            <div className="poker-table">
                <span className="boldtext">Dealer</span>
                <BlackJackHand IsDealer={true} Cards={this.state.DealerHand}></BlackJackHand>
                <span className="boldtext">Player</span>
                <BlackJackHand IsDealer={false} Cards={this.state.PlayerHand}></BlackJackHand>
                <button onClick={this.hitMe} disabled={this.state.Winner !== Winner.GameOn}>Hit Me!</button>
                <button onClick={this.stay}  disabled={this.state.Winner !== Winner.GameOn}>Stay</button>
                <button onClick={this.playAgain}>Play Again</button>
            </div>
            <div className="scoreboard">
                <span className="boldtext">Scoreboard</span>
                <div><span>Dealer has won: </span>{this.state.DealerWinCount}</div>
                <div><span>Player has won: </span>{this.state.PlayerWinCount}</div>
                {this.state.Winner !== Winner.GameOn && <div>{this.WinnerDisplay()}</div>}
            </div>
        </div>
    }

    private WinnerDisplay(): string{
        switch(this.state.Winner){
            case Winner.PlayerBlackJack:
                return "Blackjack! You won!";
            case Winner.DealerBlackJack:
                return "Blackjack! You lost.";
            case Winner.PlayerWins:
                return "Congratulations! You won!";
            case Winner.DealerWins:
                return "Sorry, you lost.";
        }
        return "";
    }

    private AddCardToHand(deck: DeckOfCards, hand: Card[]): Card[] {
        var newCard = deck.drawCard();
        if (newCard){
            hand.push(newCard);
        }
        return hand;
    }

    hitMe = () => {
        // Add card for player first
        this.setState({PlayerHand: this.AddCardToHand(this.state.Deck, this.state.PlayerHand)}, () => {
            if (!this.hasPlayerWonOrBusted()) {
                let dealerTotal = this.countCards(this.state.DealerHand);
                if (dealerTotal < 17) {
                    this.setState({DealerHand: this.AddCardToHand(this.state.Deck, this.state.DealerHand)}, () => {
                        this.hasDealerWonOrBusted();
                    })     
                }
            }          
            
        })
        
    }

    private hasPlayerWonOrBusted(): boolean {
        var playertotal = this.countCards(this.state.PlayerHand);
        if (playertotal === 21) {
            this.setState({Winner: Winner.PlayerBlackJack, PlayerWinCount: this.state.PlayerWinCount + 1});
            return true;
        }
        else if (playertotal > 21){
            this.setState({Winner: Winner.DealerWins, DealerWinCount: this.state.DealerWinCount + 1});
            return true;
        }
        return false;
    }

    private hasDealerWonOrBusted(): boolean {
        var dealerTotal = this.countCards(this.state.DealerHand);
        if (dealerTotal === 21) {
            this.setState({Winner: Winner.DealerBlackJack, DealerWinCount: this.state.DealerWinCount + 1});
            return true;
        }
        else if (dealerTotal > 21){
            this.setState({Winner: Winner.PlayerWins, PlayerWinCount: this.state.PlayerWinCount + 1});
            return true;
        }
        return false;
    }

    stay = () => {
        this.setState({DealerHand: this.AddCardToHand(this.state.Deck, this.state.DealerHand)}, 
        ()  => { this.hasDealerWonOrBusted();});  
    }

    playAgain = () => {
        var deck = new DeckOfCards();
        var dealerHand: Card[] = [];
        var playerHand: Card[] = [];
        this.AddCardToHand(deck, dealerHand);
        this.AddCardToHand(deck, playerHand);
        this.setState({DealerHand: dealerHand, PlayerHand: playerHand, Deck: deck, Winner: Winner.GameOn});  
    }


    public countCards(hand: Card[]): number {
        return hand.map(item => item.CardValue).reduce((prev, next) => prev + next);
    }
}

