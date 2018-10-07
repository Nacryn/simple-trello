import React, { Component } from 'react'

import Task from './Task'

export default class BoardColumn extends Component {

  handleAddTask(event) {
    event.preventDefault()
    console.log(this.props);
    this.props.openTaskModal(true, null, this.props.boardId, this.props.columnId)
  } 

  renderTasks() {
    return this.props.tasks.map((task) => {
      return (
        <Task
          key={task._id}
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
        <button onClick={this.handleAddTask.bind(this)}>++</button>
      </div>
    )
  }
}