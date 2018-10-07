import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';

import BoardColumn from '../components/Board-Column'
import BoardNoColumn from '../components/Board-No-Column';

import '../../styles/board.css'

export default class Board extends Component {

  handleAddMoreColumnClick(event) {
    event.preventDefault()
    Meteor.call('boards.addColumn', this.props.board._id, "Nouvelle section")
  }

  renderColumns() {
    // Print the board's columns
    return this.props.board.columns.map((column) => {
      return (
        <BoardColumn
          className="column"
          key={column._id}
          column={column}
          boardId={this.props.board._id}
          openTaskModal={this.props.openTaskModal}
        />
      )
    })
  }

  render() {
    return (
      <div className="board-container">
        { (0 < this.props.board.columns.length) ? 
          <div className="columns-container">
            {this.renderColumns()}
            <IconButton aria-label="Add" className="add-one-more-column" onClick={this.handleAddMoreColumnClick.bind(this)}>
              <AddIcon />
            </IconButton>
          </div>
          :
          <BoardNoColumn
            board={this.props.board}
          />
        }
      </div>
    )
  }
}