import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { Boards } from '../api/boards'

import HeaderToolbar from './components/Header-Toolbar'
import Board from './views/Board'
import NoBoard from './views/No-Board'
import TaskModal from './components/Task-Modal'

// The whole App
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBoard: 0,

      modals: {
        task: {
          isOpen: false,
          target: {
            taskId: null,
            boardId: null,
            column: null
          }
        }
      }
    }

    this._handleTaskModalChange = this._handleTaskModalChange.bind(this)
  }

  // Update the local state to open the modal and display the selected task
  _handleTaskModalChange(isOpen, taskId, boardId, column) {
    console.log('opening modal : ', isOpen, taskId, boardId, column);
    this.setState({
      modals: {
        task:{
          isOpen,
          target: { taskId, boardId, column }
        }
      }
    })
  }

  render() {
    console.log("here are the boards : ", this.props.boards);
    return (
      <div className="container">
        <HeaderToolbar />
        { this.props.hasBoards ?
            <Board
              key={this.props.boards[this.state.currentBoard]._id}
              board={this.props.boards[this.state.currentBoard]}
              openTaskModal={this._handleTaskModalChange}
            />
          :
            <NoBoard />
        }
        <TaskModal
          ref="taskmodal"
          isOpen={this.state.modals.task.isOpen}          // Is opened or not (thank you captain obvious)
          target={this.state.modals.task.target}          // Task to display
          handleTaskModal={this._handleTaskModalChange}   // Allow to affect the shared state about its display status
        />
      </div>
    )
  }
}

export default withTracker(() => {
  const boards = Boards.find({}).fetch()
  const hasBoards = (boards.length) ? true : false

  return {
    boards,
    hasBoards
  }
}) (App)