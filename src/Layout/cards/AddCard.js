import React, {useState, useEffect} from 'react'
import {createCard, readDeck} from "../../utils/api/index"
import {useParams, Link, Route, Switch} from "react-router-dom"
import CardsForm from "../forms/CardsForm"
function AddCard() {
const [card, setCard] = useState({front: "", back:"", deckId: ""})
const [deck, setDeck] = useState([])
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
const handleSubmitButton = async (e)=>{
  e.preventDefault()
  setCard({...card, deckId: deckId})
  await createCard(deckId, card)
  setCard({front: "", back:"", deckId:""})
}

const handleChangeFrontButton = (e)=>{
  setCard({...card, front: e.target.value})
}

const handleChangeBackButton = (e)=>{
  setCard({...card, back: e.target.value})
}

  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li>Add Card</li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <CardsForm card={card} handleSubmitButton={handleSubmitButton} handleChangeBackButton={handleChangeBackButton} handleChangeFrontButton={handleChangeFrontButton}></CardsForm>
    </div>
  )
}

export default AddCard