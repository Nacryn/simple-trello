import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Boards } from '../api/boards'

import HeaderToolbar from './components/Header-Toolbar'
import Board from './views/Board'
import NoBoard from './views/No-Board'

// The whole App
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBoard: 0
    }
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
            />
          :
            <NoBoard />
        }
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