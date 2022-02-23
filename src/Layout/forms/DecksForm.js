import React from 'react'
import {Switch, Link, Route, useHistory} from "react-router-dom"


function DecksForm({handleSubmitButton, handleChangeNameButton, handleChangeDescriptionButton, deck={}}) {
  const history = useHistory()
  const showName = ()=>{
    return deck.name ? deck.name : ""
  }
  const showDescription = ()=>{
    return deck.description ? deck.description : ""
  }


  return (
    <div>
      <form>
        <label>
          Deck Name
        </label>
        <input type="text" value={showName()} onChange={handleChangeNameButton}/>
        <label>Deck Description </label>
        <textarea required value={showDescription()} onChange={handleChangeDescriptionButton}></textarea>
        <button onClick={()=>{history.go(-1)}}>Cancel</button>
        <button onClick={handleSubmitButton}>Submit</button>
      </form>
    </div>
  )
}

export default DecksForm