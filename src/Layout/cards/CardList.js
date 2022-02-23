import React, {useState} from 'react'
import {Link, useParams, useHistory} from "react-router-dom"


function CardList({cards}) {
    const [front, setFront] = useState(true)
    const [current, setCurrent] = useState(0)
    const history = useHistory()
    const {deckId} = useParams()

    const handleNextButton = () =>{
        if(current === cards.length-1){
        window.confirm("Click OK to restart the deck, or CANCEL to return to the homepage.") ? setCurrent(0) : history.push("/")
    }else{
        setCurrent(current + 1)
        setFront(!front)
    }}
    const handleFlip = ()=>{
        setFront(!front)
    }
    if (cards.length > 2){
        return (
            <div>
                <div>
                    <h3>Card {current + 1} of {cards.length}</h3>
                    <p>{front ? cards[current].front : cards[current].back}</p>]
                    <button onClick={handleFlip}>Flip</button>
                    {front ? null : (
                        <button onClick={handleNextButton}>Next</button>
                    )}
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <div>
                    <h3>Not Enough Cards</h3>
                    <p>You need at keast 3 cards to study. There are {cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
                </div>
            </div>
        )
    }
}

export default CardList