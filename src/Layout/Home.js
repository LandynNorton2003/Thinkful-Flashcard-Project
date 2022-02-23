import React, {useState, useEffect} from 'react'
import {Route, Link, Switch, Router} from "react-router-dom"
import { deleteCard, listDecks } from "../utils/api/index"
import DeckList from './deck/DeckList'

function Home() {
  const [decks, setDecks] = useState([])  

  useEffect(()=>{
      const abortController = new AbortController()
      const getDeck = async()=> {
          const fetchData = await listDecks()
          setDecks(fetchData)
      }
      getDeck()
      return ()=> abortController.abort()
  },[])  

  return (
    <div>
        <div>
            <Link to="decks/new">
                Create Deck
            </Link>
        </div>
        <div>
            {decks.map((deck)=>(
                <DeckList deck={deck} key={deck.id}/>
            ))}
        </div>
    </div>
  )
}

export default Home