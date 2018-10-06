import React, { Component } from 'react'

import HeaderToolbar from './components/Header-Toolbar'
import BoardColumn from './components/Board-Column'

// The whole App
export default class App extends Component {

  renderColumns() {
    // Get board columns
    const columns = [
      {
        key: "Colonne 1",
        tasks: [{
          id: "1",
          title: "hello"
        },
        {
          id: "2",
          title: "Rebonjour"
        }]
      },
      {
        key: "Colonne 2",
        tasks: [{
          id: "4",
          title: "Zero"
        },
        {
          id: "5",
          title: "Testing some more"
        }]
      },
    ]

    // Get related tasks
    return columns.map((column) => {
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
      <div className="container">
        <HeaderToolbar />
        <div className="board">
          {this.renderColumns()}
        </div>
      </div>
    )
  }
}