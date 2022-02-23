import React, {useState, useEffect}from 'react'
import {Link, Route, useHistory, useParams, Switch} from "react-router-dom"
import {updateCard, readDeck, readCard} from "../../utils/api/index"
import CardsForm from '../forms/CardsForm'


function EditCard() {
  const [card, setCard] = useState({front:"", back: "", deckId:""})
  const [deck, setDeck] = useState([])
  const {deckId, cardId} = useParams()
  const history = useHistory()
  
  
  useEffect(()=>{
    const abortController = new AbortController()
    const getCard = async ()=>{
      const response = await readCard(cardId, abortController.signal)
      setCard(()=>response)
    }
    getCard()
    return ()=> abortController.abort()
  },[cardId])
  useEffect(()=>{
    const abortController = new AbortController()
    const getDeck = async ()=>{
      const response = await readDeck(deckId, abortController.signal)
      setDeck(()=>response)
    }
    getDeck()
    return ()=> abortController.abort()
  },[deckId])
  const handleSubmitButton = async(e)=>{
    e.preventDefault()
    await updateCard(card)
    history.push(`/decks/${deck.id}`)
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
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>
      <CardsForm handleSubmitButton={handleSubmitButton} card={card} handleChangeBackButton={handleChangeBackButton} handleChangeFrontButton={handleChangeFrontButton}/>
    </div>
  )
}

export default EditCard