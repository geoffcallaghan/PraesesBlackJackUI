import { Suit, Card } from "../../../API/DeckOfCards";
import React from "react";
import "./BlackJackCard.css"

export interface IBlackJackCardProps {
    Card: Card;
    IsVisible: boolean;
}

export const BlackJackCard: React.FC<IBlackJackCardProps> = (props) => {

    var cardFile = "";
    if (props.IsVisible){
        var cardNumber = props.Card.CardNumber;
        cardFile =  Suit[props.Card.CardSuit][0];
        switch(cardNumber){
            case 1:
                cardFile = "A" + cardFile;
                break;
            case 11:
                cardFile = "J" + cardFile;
                break;
            case 12:
                cardFile = "Q" + cardFile;
                break;
            case 13:
                cardFile = "K" + cardFile;
                break;
            default: 
                cardFile = cardNumber + cardFile;
        }
    }
    else{
        cardFile = "redback";
    }

    const graphImage = require('../../../Images/' + cardFile + '.jpg')
    let cardDisplay = props.Card.CardNumber + " of " + Suit[props.Card.CardSuit];
    return <div className="card">
        <img alt={cardDisplay} height="100px" src={graphImage}/>
    </div>
}