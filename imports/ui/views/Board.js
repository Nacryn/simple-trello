import React, { Component } from 'react'

import BoardColumn from '../components/Board-Column'
import BoardNoColumn from '../components/Board-No-Column';

export default class Board extends Component {

  handleAddMoreColumnClick(event) {
    event.preventDefault()
    Meteor.call('boards.addColumn', this.props.board._id, "so many tests")
  }

  renderColumns() {
    // Print the board's columns
    return this.props.board.columns.map((column) => {
      return (
        <BoardColumn
          boardId={this.props.board._id}
          key={column.title}
          tasks={column.tasks}
          openTaskModal={this.props.openTaskModal}
        />
      )
    })
  }

  render() {
    return (
      <div className="board-container">
        { (0 < this.props.board.columns.length) ? 
          <div className="column-container">
            <ul>
              {this.renderColumns()}
            </ul>
            <button className="add-one-more-column" onClick={this.handleAddMoreColumnClick.bind(this)}>+++</button>
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