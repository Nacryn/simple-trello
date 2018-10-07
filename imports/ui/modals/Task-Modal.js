import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

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
      target: Object.assign({}, rawTarget),
      labelAction: 'Ajouter'
    }
  }

  handleTargetChange = variable => event => {
    // Little hack to merge the prop instead of replacing the whole content
    let updatedTarget = this.state.target
    updatedTarget[variable] = event.target.value
    this.setState({
      target: updatedTarget
    })
  }

  handleCloseModal() {
    console.log('raw target = ', rawTarget);
    this.state.target = Object.assign({}, rawTarget)
    this.props.handleTaskModal(false, null)
    console.log(this.state);
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
      title: this.state.target.title,
      description: this.state.target.description,
    }

    // If we already have an ID, make an edit
    if (this.state.target._id) {
      Meteor.call('tasks.update', this.state.target._id, upsertTask)
      console.log('UPDATE task : ', upsertTask)
    }
    // Else, make a create
    else {
      upsertTask.boardId = this.state.target.boardId
      upsertTask.columnId = this.state.target.columnId

      Meteor.call('tasks.insert', upsertTask)
      console.log('INSERT task : ', upsertTask)
    }

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
            <IconButton aria-label="Fermer" onClick={this.handleCloseModal.bind(this)}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="task-modal-content">
            <form id="new-task-form" onSubmit={this.handleSubmit.bind(this)}>
              <TextField
                id="input-Title"
                ref="inputTitle"
                label="Titre de la tâche"
                value={this.state.target.title}
                onChange={this.handleTargetChange('title')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="input-Description"
                ref="inputDescription"
                label="Description de la tâche"
                value={this.state.target.description}
                onChange={this.handleTargetChange('description')}
                margin="normal"
                variant="outlined"
              />

              <Button className="task-modal-validate" variant="contained" type="submit" form="new-task-form">{this.state.labelAction}</Button>
            </form>

            <div className="task-modal-quick-actions">
              <IconButton aria-label="Effacer" onClick={this.handleDelete.bind(this)}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Completer" onClick={this.handleComplete.bind(this)}>
                <DoneIcon />
              </IconButton>
            </div>
          </div>
          
          
          
        </div>
      </div>
    )
  }
}