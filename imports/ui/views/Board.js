import React, { Component } from 'react'

import BoardColumn from '../components/Board-Column'
import BoardNoColumn from '../components/Board-No-Column';

export default class Board extends Component {

  renderColumns() {
    // Print the board's columns
    return this.props.board.columns.map((column) => {
      return (
        <BoardColumn
          tasks={column.tasks}
        />
      )
    })
  }

  render() {
    return (
      <div className="board-container">
        { (0 < this.props.board.columns.length) ? 
          <ul>
            {this.renderColumns()}
          </ul>
          :
          <BoardNoColumn
            board={this.props.board}
          />
        }
      </div>
    )
  }
}