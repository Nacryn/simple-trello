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
          taskId: null
        }
      }
    }

    this._handleTaskModalChange = this._handleTaskModalChange.bind(this)
  }

  // Update the local state to open the modal and display the selected task
  _handleTaskModalChange(isOpen, taskId) {
    console.log('opening modal : ', isOpen, taskId);
    this.setState({modals:{task:{isOpen, taskId}}})
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
          isOpen={this.state.modals.task.isOpen}
          taskId={this.state.modals.task.taskId}
          handleTaskModal={this._handleTaskModalChange}
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