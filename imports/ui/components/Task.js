import React, { Component } from 'react'

import '../../styles/task'

export default class Task extends Component {
  render() {
    console.log('received :', this.props);
    return (
      <div className="task-container">
        <div className="task-title">{this.props.task.title}</div>
      </div>
    )
  }
}