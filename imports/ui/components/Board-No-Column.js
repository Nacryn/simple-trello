import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import '../../styles/board-column.css'

export default class BoardNoColumn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titre: ''
    }
  }

  handleChange = variable => event => {
    this.setState({
      [variable]: event.target.value
    }) 
  }

  handleAddColumn(event) {
    event.preventDefault()
    // Create the board
    Meteor.call('boards.addColumn', this.props.board._id, this.state.titre)
    // Clear the field
    ReactDOM.findDOMNode(this.refs.inputTitle).value = ''
  }

  render() {
    return (
      <div className="no-columns">
        <div className="no-columns-message">Aucune colonne dans ce tableau !</div>
        <div className="add-column-container">
          <TextField
            id="input-title"
            ref="inputTitle"
            label="Titre"
            value={this.state.titre}
            onChange={this.handleChange('titre')}
            margin="normal"
            variant="outlined"
          />
          
          <Button variant="contained" onClick={this.handleAddColumn.bind(this)}>Ajouter une colonne</Button>
        </div>
      </div>
    )
  }
}