import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { Boards } from '../api/boards'

import HeaderToolbar from './components/Header-Toolbar'
import Board from './views/Board'
import NoBoard from './views/No-Board'
import TaskModal from './modals/Task-Modal'

// The whole App
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBoardIndex: 0,

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
  _handleTaskModalChange(isOpen, taskId, boardId, columnId) {
    console.log('opening modal : ', isOpen, taskId, boardId, columnId);
    this.setState({
      modals: {
        task:{
          isOpen,
          target: { taskId, boardId, columnId }
        }
      }
    })
  }

  render() {
    console.log("here are the boards : ", this.props.boards);
    return (
      <div className="app-container">
        <HeaderToolbar
          currentBoardIndex={this.state.currentBoardIndex}
        />

        { this.props.hasBoards ?
            <Board
              key={this.props.boards[this.state.currentBoardIndex]._id}
              board={this.props.boards[this.state.currentBoardIndex]}
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