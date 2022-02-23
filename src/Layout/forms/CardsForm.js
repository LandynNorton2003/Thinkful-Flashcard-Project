import React from 'react'
import {useHistory} from "react-router-dom"


function CardsForm({handleSubmitButton, handleChangeFrontButton, handleChangeBackButton, card={}}) {
  const history = useHistory()
  function front(){
    return card.front ? card.front : ""
  }
  function back(){
    return card.back ? card.back : ""
  }
  return (
    <div>
      <form>
          <div>
            <label>Front</label>
            <textarea id="front" value={front()} onChange={handleChangeFrontButton}>
            </textarea>
          </div>
          <div>
            <label>Back</label>
            <textarea id="back" value={back()} onChange={handleChangeBackButton}></textarea>
          </div>
          <button onClick={()=>history.push("/")}>Done</button>
          <button type="submit" onClick={handleSubmitButton}>Save</button>
      </form>
    </div>
  )
}

export default CardsForm