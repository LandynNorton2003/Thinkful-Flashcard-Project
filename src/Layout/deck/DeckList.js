import React from 'react'
import {Route, Router, Switch, Link, useHistory} from "react-router-dom"
import {deleteDeck} from "../../utils/api/index"


function DeckList({deck}) {
  const history = useHistory()
  const {name,description,cards,id} = deck
  const  deleteHandler = async ()=> {
    if(window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")){
        await deleteDeck(id)
        history.go(0)}else{
            history.go(0)}
  }  


  return (
    <div>
        <div>
            <div>
                <h5>{name}</h5>
                <p>{cards.length} cards</p>
            </div>
            <p>{description}</p>
            <div>
                <Link to={`/decks/${id}`}>
                    View
                </Link>
                <Link to={`/decks/${id}/study`}>Study</Link>
                <button onClick={deleteHandler} value={id} name="delete">Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeckList