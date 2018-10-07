import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Tasks } from '../../api/tasks'

import '../../styles/task-modal.css'

const rawTarget = {
  title: '',
  description: '',
  boardId: '',
  columnId: ''
}

export default class TaskModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      target: rawTarget
    }
  }
  handleCloseModal() {
    this.state.target = rawTarget
    this.props.handleTaskModal(false, null)
  }

  handleSubmit(event) {
    event.preventDefault()

    // Build the new task according to the fields
    const newTask = {
      title: ReactDOM.findDOMNode(this.refs.inputTitle).value.trim(),
      description: ReactDOM.findDOMNode(this.refs.inputDescription).value.trim(),
      boardId: ReactDOM.findDOMNode(this.refs.inputBoardId).value.trim(),
      columnId: ReactDOM.findDOMNode(this.refs.inputColumn).value.trim(),
    }

    // Add the task to the db
    Meteor.call('tasks.insert', newTask)
    console.log('inserted task : ', newTask);

    // Clear form
    ReactDOM.findDOMNode(this.refs.inputTitle).value = ''
    ReactDOM.findDOMNode(this.refs.inputDescription).value = ''
  }

  render() {
    if ( ! this.props.isOpen ) {
      return null
    }

    if ( this.props.target.taskId ) {
      const task = Tasks.findOne(this.props.target.taskId)
      this.state.target = task
    }
    else {
      this.state.target.boardId = this.props.target.boardId
      this.state.target.columnId = this.props.target.columnId
    }

    return (
      <div className="task-modal-container">
        <div className="task-modal">
          <div className="task-modal-title">
            <span>Ajouter une tâche</span>
            <button onClick={this.handleCloseModal.bind(this)}>X</button>
          </div>
          <form id="new-task-form" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="inputTitle"
              placeholder="Titre"
              value={this.state.target.title}
            />
            <input
              type="text"
              ref="inputDescription"
              placeholder="Description"
              value={this.state.target.description}
            />

            <input
              type="text"
              ref="inputBoardId"
              value={this.state.target.boardId}
            />

            <input
              type="text"
              ref="inputColumn"
              value={this.state.target.columnId}
            />

            <button type="submit" form="new-task-form">Ajouter</button>
          </form>
          
          
        </div>
      </div>
    )
  }
}