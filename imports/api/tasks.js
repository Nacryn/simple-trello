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
      columnId: task.columnId
    })

    // Build a version of the task with onl the info displayed on the board
    // Used for Data Fan-out
    const minifiedBoardVersion = {
      _id: newTaskId,
      title: task.title,
      description: task.description
    }
    
    // Then save the downsized version into the board / column for fast access
    console.log("task column id : ", task.columnId);
    Boards.update(
      task.boardId,
      {
        $push: { "columns.$[].tasks" : minifiedBoardVersion }
      },
      {
        arrayFilter: [ { "elem.title ": "Test" } ]
      }
    )
  }
})