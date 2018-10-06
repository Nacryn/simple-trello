import React, { Component } from 'react'

export default class Task extends Component {
  render() {
    console.log('received :', this.props);
    return (
      <div className="container">
        <div className="task-title">{this.props.task.title}</div>
      </div>
    )
  }
}