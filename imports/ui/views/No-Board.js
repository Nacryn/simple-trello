import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import '../../styles/board.css'

export default class NoBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardTitle: ''
    }
  }

  handleChange = variable => event => {
    this.setState({
      [variable]: event.target.value
    }) 
  }
  
  handleAddClick(event) {
    event.preventDefault()
    // Create the board
    Meteor.call('boards.insert', this.state.boardTitle, "Test de description")
    // Clear the field
    ReactDOM.findDOMNode(this.refs.inputBoardTitle).value = ''
  }

  render() {
    return (
      <div className="no-board-container">
        <div className="no-board-message">Aucun tableau disponible :(</div>
        <div className="add-board-container">
          <TextField
            id="input-boardTitle"
            ref="inputBoardTitle"
            label="Nom du tableau"
            value={this.state.boardTitle}
            onChange={this.handleChange('boardTitle')}
            margin="normal"
            variant="outlined"
          />

          <Button className="add-board" variant="contained" onClick={this.handleAddClick.bind(this)}>Créer un tableau</Button>
        </div>
      </div>
    )
  }
}