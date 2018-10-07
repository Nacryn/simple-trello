import React, { Component } from 'react'

export default class TaskModal extends Component {
  handleCloseModal() {
    this.props.handleTaskModal(false, null)
  }

  render() {
    if ( ! this.props.isOpen ) {
      return null
    }

    return (
      <div className="task-modal-container">
        <div className="task-modal">
          <form>
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
          </form>
          
          <button onClick={this.handleCloseModal.bind(this)}>X</button>
        </div>
      </div>
    )
  }
}