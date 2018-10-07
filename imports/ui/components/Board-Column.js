import React, { Component } from 'react'

import Task from './Task'

import '../../styles/board-column.css'

export default class BoardColumn extends Component {

  handleAddTask(event) {
    event.preventDefault()
    console.log(this.props);
    this.props.openTaskModal(true, null, this.props.boardId, this.props.column._id)
  } 

  renderTasks() {
    return this.props.column.tasks.map((task) => {
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
      <div className="board-column-container">
        <div className="board-column-title">{this.props.column.title}</div>
        { this.renderTasks() }
        <button className="board-column-add" onClick={this.handleAddTask.bind(this)}>++</button>
      </div>
    )
  }
}