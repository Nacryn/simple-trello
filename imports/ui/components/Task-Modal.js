import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Tasks from '../../api/tasks'

export default class TaskModal extends Component {
  handleCloseModal() {
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

    return (
      <div className="task-modal-container">
        <div className="task-modal">
          <form id="new-task-form" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="inputTitle"
              placeholder="Titre"
            />
            <input
              type="text"
              ref="inputDescription"
              placeholder="Description"
            />

            <input
              type="text"
              ref="inputBoardId"
              value={this.props.target.boardId}
            />

            <input
              type="text"
              ref="inputColumn"
              value={this.props.target.column}
            />

            <button type="submit" form="new-task-form">Ajouter</button>
          </form>
          
          <button onClick={this.handleCloseModal.bind(this)}>X</button>
        </div>
      </div>
    )
  }
}