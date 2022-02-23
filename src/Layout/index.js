import React, {useState, useEffect} from "react"
import Header from "./Header"
import NotFound from "./errors/NotFound"
import {Routes, Route, Switch, Link, useRouteHistory} from "react-router-dom"
import DeckList from "./deck/DeckList"
import Deck from "./deck/Deck"
import CardList from "./cards/CardList"
import AddCard from "./cards/AddCard"
import EditCard from "./cards/EditCard"
import Study from "./cards/Study"
import AddDeck from "./deck/AddDeck"
import EditDeck from "./deck/EditDeck"
import CardsForm from "./forms/CardsForm"
import DecksForm from "./forms/DecksForm"
import Home from "./Home"

function Layout() {
  

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route> 
          <Route path="/decks/new">
            <AddDeck/>
          </Route>
          <Route  exact path="/decks/:deckId">
            <Deck/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
              <AddCard/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
