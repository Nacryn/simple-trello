import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class NoBoard extends Component {
  handleAddClick(event) {
    event.preventDefault()

    // Find inputed name
    const title = ReactDOM.findDOMNode(this.refs.textInput).value.trim()
    // Create the board
    Meteor.call('boards.insert', title, "Test de description")
    // Clear the field
    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  render() {
    return (
      <div className="no-board-container">
        Désolé, mais il n'existe aucun tableau à l'heure actuelle.
        <br/>
        <input
          type="text"
          ref="textInput"
          placeholder="Nom du tableau"
        />
        <button className="add-board" onClick={this.handleAddClick.bind(this)}>Ajouter un panneau</button>
      </div>
    )
  }
}