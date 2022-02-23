import React, {useState, useEffect} from 'react'
import {readDeck, updateDeck} from "../../utils/api/index"
import {Switch, Link, useHistory, useParams} from "react-router-dom"
import DeckForm from "../forms/DecksForm"

function EditDeck() {
  const history = useHistory()
  const {deckId} = useParams()
  const [deck, setDeck] = useState({id: 0, name:"", description:""})

  useEffect(()=>{
    const abortController = new AbortController()
    const getDeck = async()=>{
      const response = await readDeck(deckId, abortController.signal)
      setDeck(()=>response)
    }
    getDeck()
    return ()=> abortController.abort()
  },[deckId])

  const handleSubmitButton = async (e)=>{
    e.preventDefault()
    const response = await updateDeck(deck)
    history.push(`/decks/${response.id}`)
  }

  const handleChangeNameButton = (e) =>{
    setDeck({...deck, name:e.target.value})
  }

  const handleChangeDescriptionButton = (e) =>{
    setDeck({...deck, description:e.target.value})
  }

  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ol>
        <h3>Edit Deck</h3>
        <DeckForm handleSubmitButton={handleSubmitButton} deck={deck} handleChangeDescriptionButton={handleChangeDescriptionButton} handleChangeNameButton={handleChangeNameButton}/>
      </nav>
    </div>
  )
}

export default EditDeck