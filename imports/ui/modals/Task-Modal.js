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
      target: rawTarget,
      labelAction: 'Ajouter'
    }
  }

  handleCloseModal() {
    this.state.target = rawTarget
    this.props.handleTaskModal(false, null)
  }

  handleDelete() {
    Meteor.call('tasks.remove', this.state.target._id)
    console.log('DELETE task');
    this.handleCloseModal()
  }

  handleComplete() {
    Meteor.call('tasks.setCompleted', this.state.target._id, true)
    console.log('COMPLETE task');
    this.handleCloseModal()
  }

  handleSubmit(event) {
    event.preventDefault()

    // Gather form information to build the task to add / edit
    let upsertTask = {
      title: ReactDOM.findDOMNode(this.refs.inputTitle).value.trim(),
      description: ReactDOM.findDOMNode(this.refs.inputDescription).value.trim(),
    }

    // If we already have an ID, make an edit
    if (this.state.target._id) {
      Meteor.call('tasks.update', this.state.target._id, upsertTask)
      console.log('UPDATE task : ', upsertTask)
    }
    // Else, make a create
    else {
      upsertTask.boardId = ReactDOM.findDOMNode(this.refs.inputBoardId).value.trim()
      upsertTask.columnId = ReactDOM.findDOMNode(this.refs.inputColumn).value.trim()

      Meteor.call('tasks.insert', upsertTask)
      console.log('INSERT task : ', upsertTask)
    }

    this.clearForm()
    this.handleCloseModal()
  }

  clearForm() {
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
      this.state.labelAction = 'Mettre à jour'
    }
    else {
      this.state.target.boardId = this.props.target.boardId
      this.state.target.columnId = this.props.target.columnId
      this.state.labelAction = 'Ajouter'
    }

    return (
      <div className="task-modal-container">
        <div className="task-modal">
          <div className="task-modal-title">
            <span>Ajouter une tâche</span>
            <button onClick={this.handleCloseModal.bind(this)}>X</button>
          </div>

          <div className="task-modal-content">
            <form id="new-task-form" onSubmit={this.handleSubmit.bind(this)}>
              <input
                type="text"
                ref="inputTitle"
                placeholder="Titre"
                defaultValue={this.state.target.title}
              />
              <input
                type="text"
                ref="inputDescription"
                placeholder="Description"
                defaultValue={this.state.target.description}
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

              <button type="submit" form="new-task-form">{this.state.labelAction}</button>
            </form>

            <div className="task-modal-quick-actions">
              <div className="task-modal-delete" onClick={this.handleDelete.bind(this)}>X</div>
              <div className="task-modal-complete" onClick={this.handleComplete.bind(this)}>V</div>
            </div>
          </div>
          
          
          
        </div>
      </div>
    )
  }
}