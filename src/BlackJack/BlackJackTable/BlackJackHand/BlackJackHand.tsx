import { Card } from "../../../API/DeckOfCards";
import React from "react";
import { BlackJackCard } from "../BlackJackCard";
import "./BlackJackHand.css"

interface IBlackJackHandProps {
    IsDealer: boolean;
    Cards?: Card[];    
}

export const BlackJackHand: React.FC<IBlackJackHandProps> = (props) => {
    
    if (props.Cards && props.Cards.length > 0){
        let cardTotal = props.Cards.map(item => item.CardValue).reduce((prev, next) => prev + next)

        return <div  className="hand">
                {props.Cards.map((card) => {
                return <BlackJackCard Card={card} IsVisible={true}></BlackJackCard>
            })}
            <span>Total: {cardTotal.toString()}</span>
        </div>
        
    }
    else{
        return <div>
            <span>No cards have been dealt</span>
        </div>
    }
    
}

