import React, { Component } from 'react'

import Task from './Task'

export default class BoardColumn extends Component {

  handleAddTask(event) {
    const payload = {
      boardId: this.props.boardId,
      columnId: "test"
    }
    
    this.props.openTaskModal(true, null)
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