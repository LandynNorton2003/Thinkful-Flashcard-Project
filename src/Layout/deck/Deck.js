import React, { useEffect, useState } from 'react'
import {deleteCard, readDeck, deleteDeck} from "../../utils/api/index"
import {useParams, useHistory, useRouteMatch, Link, Switch, Route} from "react-router-dom"


function Deck() {
  const [deck, setDeck] = useState([])
  const {cardId, setCardId} = useState(0)
  const {id, name, description, cards} = deck
  const {url} = useRouteMatch()
  const history = useHistory()
  const {deckId} = useParams()
  useEffect(()=>{
    const abortController = new AbortController()
    const getDeck = async ()=>{
      const response = await readDeck(deckId, abortController.signal)
      setDeck(()=>response)
    }
    getDeck()
    return ()=> abortController.abort()
  },[deckId])

  const handleDeckDeleteButton = async ()=> {
    if(window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")){
      await deleteDeck(id)
      history.push("/")
    }else{
      history.go(0)
    }
  }
  const handleCardDeleteButton = async ()=>{
    if(window.confirm("Are you sure you want to delete this card? You will not be able to recover it")){
      await deleteCard(cardId)
      history.go(0)
    }else{
      history.go(0)
    }
  }
  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ol>
      </nav>
      <div>
        <div>
          <h3>{name}</h3>
        </div>
        <p>{description}</p>
        <div>
          <Link to={`/decks/${id}/edit`}>Edit</Link>
          <Link to={`/decks/${id}/study`}>Study</Link>
          <Link to={`/decks/${id}/cards/new`}>Add Cards</Link>
          <button onClick={handleDeckDeleteButton} value={id}>Delete</button>
        </div>
      </div>
      <div>
        <h2>Cards</h2>
      </div>
      {cards?.map((card,index)=>(
        <div key={index}>
          <div>
          <p>{card.front}</p>
          </div>
          <div>
            <p>{card.back}</p>
          </div>
          <div>
            <Link to={`${url}/cards/${card.id}/edit`}>Edit</Link>
            <button onClick={()=>{
              setCardId(card.id)
              handleCardDeleteButton()
              
            }} value={card.id}>Delete</button>
          </div>
        </div>
  ))}
    </div>
  )
}

export default Deck