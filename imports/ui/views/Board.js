import react, { Component } from 'react'

export default class Board extends Component {

  renderColumns() {
    // Print the board's columns
    return this.props.board.columns.map((column) => {
      return (
        <BoardColumn
          key={column.key}
          tasks={column.tasks}
        />
      )
    })
  }

  render() {
    return (
      <div className="board-container">
        { this.props.board.columns ? 
          <ul>
            {this.renderColumns()}
          </ul>
          :
          <div className="no-columns">Aucune colonnes dans ce tableau</div>
        }
      </div>
    )
  }
}