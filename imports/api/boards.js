import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Boards = new Mongo.Collection('boards')

Meteor.methods({
  'boards.insert'(title, description) {
    check(title, String)
    check(description, String)

    // TODO : add check user

    Boards.insert({
      title,
      description,
      createdAt: new Date(),
      columns: [],
      owner: 'TBA',
      username: 'TBA'
    })
  },

  'boards.addColumn'(boardId, title) {
    check(boardId, String)
    
    // Create new column with received data
    let newColumn = {
      title,
      createdAt: new Date(),
      tasks: []
    }

    // Find the board and push the new column inside
    const board = Boards.findOne(boardId)
    let currentColumns = board.columns
    currentColumns.push(newColumn)

    // Update the board
    Boards.update(boardId, { $set: {columns: currentColumns} })
  },

  'boards.remove'(boardId) {
    check(boardId, String)
    Boards.remove(boardId)
  }
})