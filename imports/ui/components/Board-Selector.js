import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button';

import { Boards } from '../../api/boards'

import '../../styles/board-selector.css'

class BoardSelector extends Component {

  handleDeleteBoard() {
    console.log(this.props.boards, this.props.currentBoardIndex);
    console.log('combination : ', this.props.boards[this.props.currentBoardIndex]);
    Meteor.call('boards.remove', this.props.boards[this.props.currentBoardIndex]._id)
    console.log('DELETE board');
  }

  render() {
    return (
      <div className="board-selector-container">
        <div className="board-selector-title">Project W</div>
        <Button variant="fab" mini aria-label="Delete" className="board-selector-delete" onClick={this.handleDeleteBoard.bind(this)}>
          <DeleteIcon />
        </Button>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    boards : Boards.find({}).fetch()
  }
}) (BoardSelector)