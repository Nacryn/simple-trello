import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

import { Boards } from './boards'

export const Tasks = new Mongo.Collection('tasks')


Meteor.methods({
  'tasks.insert'(task) {
    check(task.title, String)
    
    // Create the task in its collection first
    const newTaskId = Tasks.insert({
      title: task.title,
      description: task.description,
      createdAt: new Date(),
      owner: 'TBA',
      username: 'TBA',
      boardId: task.boardId,
      columnId: task.columnId,
      completed: false,
    })

    // Build a version of the task with onl the info displayed on the board
    // Used for Data Fan-out
    // const minifiedBoardVersion = {
    //   _id: newTaskId,
    //   title: task.title,
    //   description: task.description
    // }
    
    // Then save the downsized version into the board / column for fast access
    // console.log("task column id : ", task.columnId);
    // Boards.update(
    //   task.boardId,
    //   {
    //     $push: { "columns.$[elem].tasks" : minifiedBoardVersion }
    //   },
    //   {
    //     arrayFilter: [ { "elem._id ": task._id } ]
    //   }
    // )
  },

  'tasks.update'(taskId, task) {
    check(task.title, String)
    check(task.description, String)
    
    // Edit the task
    Tasks.update(
      taskId,
      {
        $set: {
          title: task.title,
          description: task.description,
        }
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String)

    Tasks.remove(taskId)
  },

  'tasks.setCompleted'(taskId, setCompleted) {
    check(taskId, String)
    check(setCompleted, Boolean)

    Tasks.update(
      taskId,
      {
        $set: { completed: setCompleted }
      }
    )
  },

  // TODO : Improve how we find the next (or the previous) column in which to move
  'tasks.moveColumn'(taskId, direction) {
    check(taskId, String)
    check(direction, String)

    // Get the task to find its location
    const task = Tasks.findOne(taskId)
    // Find the board in which the task is
    const board = Boards.findOne(task.boardId)

    // Find the next column to move to (according to left or right)
    // TODO : Improve this hack
    const indexCurrColumn = board.columns.findIndex( (elem) => elem._id == task.columnId )
    let newIndex = ('left' == direction) ? indexCurrColumn - 1 : indexCurrColumn + 1
    // Make it cyclic, if we go past the borders, resume on the other side
    if (newIndex < 0)
      newIndex = board.columns.length - 1
    else if (newIndex > board.columns.length - 1)
      newIndex = 0

    // Update the task with the new columnId
    const newColumnId = board.columns[newIndex]._id
    Tasks.update(taskId, { $set: { columnId: newColumnId } })
    Boards.update(task.boardId, { $set: { lastUpdated: new Date() }})
  }
})