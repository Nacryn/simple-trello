import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import '../../styles/task'

export default class Task extends Component {

  handleEditTask() {
    this.props.openTaskModal(true, this.props.task._id)
  }

  handleLeftClick() {
    console.log('let us move LEFT');
    Meteor.call('tasks.moveColumn', this.props.task._id, 'left')
  }

  handleRightClick() {
    console.log('let us move RIGHT');
    Meteor.call('tasks.moveColumn', this.props.task._id, 'right')
  }

  render() {
    return (
      <div className="task-container">
        <div className="task-content" onClick={this.handleEditTask.bind(this)}>
          <div className="task-title">{this.props.task.title}</div>
          <div className="task-description">{this.props.task.description}</div>
        </div>
        <div className="task-action-bar">
          <IconButton className="action-move-left" aria-label="Déplacer à gauche" onClick={this.handleLeftClick.bind(this)}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <IconButton className="action-move-right" aria-label="Déplacer à droite" onClick={this.handleRightClick.bind(this)}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    )
  }
}