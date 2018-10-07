import React, { Component } from 'react'

import Task from './Task'

import { Tasks } from '../../api/tasks'

import '../../styles/board-column.css'

export default class BoardColumn extends Component {

  handleAddTask(event) {
    event.preventDefault()
    this.props.openTaskModal(true, null, this.props.boardId, this.props.column._id)
  } 

  handleColumnDelete() {
    Meteor.call('boards.removeColumn', this.props.boardId, this.props.column._id)
    console.log("DELETE one column");
  }

  renderTasks() {
    const relatedTasks = Tasks.find({ columnId: this.props.column._id }).fetch()
    return relatedTasks.map((task) => {
      return (
        <Task
          key={task._id}
          task={task}
          openTaskModal={this.props.openTaskModal}
        />
      )
    })
  }

  render() {
    return (
      <div className="board-column-container">
        <div className="board-column-title">
          <div className="board-column-title-content">{this.props.column.title}</div>
          <div className="board-column-title-delete" onClick={this.handleColumnDelete.bind(this)}>X</div>
        </div>
        { this.renderTasks() }
        <button className="board-column-add" onClick={this.handleAddTask.bind(this)}>++</button>
      </div>
    )
  }
}