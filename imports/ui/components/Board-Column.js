import React, { Component } from 'react'

import Task from './Task'

export default class BoardColumn extends Component {

  renderTasks() {
    return this.props.tasks.map((task) => {
      return (
        <Task
          key={task.id}
          task={task}
        />
      )
    })
  }

  render() {
    return (
      <div className="board-column">
        <div className="board-title"></div>
        <ul>
          { this.renderTasks() }
        </ul>
      </div>
    )
  }
}