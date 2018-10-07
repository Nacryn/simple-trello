import React, { Component } from 'react'

import '../../styles/task'

export default class Task extends Component {

  handleEditTask() {
    this.props.openTaskModal(true, this.props.task._id)
  }

  handleLeftClick() {
    console.log('let us move LEFT');
  }

  handleRightClick() {
    console.log('let us move RIGHT');
  }

  render() {
    return (
      <div className="task-container">
        <div className="task-content" onClick={this.handleEditTask.bind(this)}>
          <div className="task-title">{this.props.task.title}</div>
          <div className="task-description">{this.props.task.description}</div>
        </div>
        <div className="task-action-bar">
          <div className="action-move-left" onClick={this.handleLeftClick.bind(this)}> |-- </div>
          <div className="action-move-right" onClick={this.handleRightClick.bind(this)}> --| </div>
        </div>
      </div>
    )
  }
}