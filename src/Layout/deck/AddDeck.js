import React, {useState} from 'react'
import {createDeck} from "../../utils/api/index"
import {useHistory, Switch, Link, Route} from "react-router-dom"

function AddDeck() {
  const [newDeck, setNewDeck] = useState({name:"",descriptions:""})
  const history = useHistory()
  const handleSubmitButton = async (e)=>{
    e.preventDefault()
    const response = await createDeck(newDeck)
    history.push(`/decks/${response.id}`)
  }
const handleChangeButton = (e)=> {
  setNewDeck({...newDeck, [e.target.name]: e.target.value})
}

  return (
    <div>
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Create Deck</li>
        </ol>
      </nav>
      <form onSubmit={handleSubmitButton}>
          <label>Name:</label>
          <input name="name" id="name" type="text" value={newDeck.name} onChange={handleChangeButton}/>
          <label>Description:</label>
          <textarea name="description" type="textarea" id="description" onChange={handleChangeButton} description={newDeck.description}/>
          <Link to="/">Cancel</Link>
          <button type="submit" onClick={handleSubmitButton}>Submit</button>
      </form>
    </div>
  )
}

export default AddDeck