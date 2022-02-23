import React, {useEffect, useState} from 'react'
import {readDeck} from "../../utils/api/index"
import {Link, useParams} from "react-router-dom"
import CardList from './CardList'


function Study() {
  const {deckId} = useParams()
  const [deck,setDeck] = useState({})

  useEffect(()=>{
    const abortController = new AbortController()
    const deck = async ()=>{
      const currentDeck = await readDeck(deckId, abortController.signal)
      setDeck(()=> currentDeck)
      return ()=> abortController.abort()
    }
    deck()
  },[deckId])
  if (Object.keys(deck).length){
    return(
      <div>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </nav>
        <div>
          <h1>{deck.name}: Study</h1>
        </div>
        <CardList  cards={deck.cards}/>
      </div>
    )
  }else{
    return(
      <div>
        Loading...
      </div>
    )
  }
}

export default Study