import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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
          <IconButton className="board-column-title-delete" aria-label="Effacer" onClick={this.handleColumnDelete.bind(this)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="board-column-content">
          { this.renderTasks() }
          
          <Button variant="fab" mini color="primary" aria-label="Add" className="board-column-add" onClick={this.handleAddTask.bind(this)}>
            <AddIcon />
          </Button>
        </div>
      </div>
    )
  }
}