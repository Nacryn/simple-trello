import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class BoardNoColumn extends Component {
  
  handleAddColumn(event) {
    event.preventDefault()

    // Find inputed name
    const title = ReactDOM.findDOMNode(this.refs.inputTitle).value.trim()
    // Create the board
    Meteor.call('boards.addColumn', this.props.board._id, title)
    // Clear the field
    ReactDOM.findDOMNode(this.refs.inputTitle).value = ''
  }

  render() {
    return (
      <div className="no-columns">
        Aucune colonne dans ce tableau

        <input
          type="text"
          ref="inputTitle"
          placeholder="Entrer un titre"
        />
        
        <button onClick={this.handleAddColumn.bind(this)}>Ajouter une colonne</button>
      </div>
    )
  }
}