import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import '../../styles/board.css'

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
        <div className="no-board-message">Aucun tableau disponible</div>
        <div className="add-board-container">
          <input
            type="text"
            ref="textInput"
            placeholder="Nom du tableau"
          />
          <button className="add-board" onClick={this.handleAddClick.bind(this)}>Créer un tableau</button>
        </div>
      </div>
    )
  }
}