import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Boards } from '../api/boards'

import HeaderToolbar from './components/Header-Toolbar'
import Board from './views/Board'
import NoBoard from './views/No-Board'
import BoardColumn from './components/Board-Column'

// The whole App
class App extends Component {
  constructor(props) {
    super(props)
    
    // TODO : Improve the way we handle the current selected board (REDUX !!!)
    this.state = {
      currentBoard: 0
    }
  }

  render() {
    return (
      <div className="container">
        <HeaderToolbar />
        { this.props.currentBoard ?
            <Board
              key={this.props.currentBoardId}
              board={this.props.currentBoard}
            />
          :
            <NoBoard />
        }
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    boards: Boards.find({}).fetch(),
  }
}) (App)