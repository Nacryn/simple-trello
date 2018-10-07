import { Mongo } from "meteor/mongo"

export const Tasks = new Mongo.Collection('tasks')

Meteor.methods({
  'tasks.insert'(task) {
    check(task.title, String)
    
    Tasks.insert({
      title: task.title,
      description: task.description,
      createdAt: new Date(),
      owner: 'TBA',
      username: 'TBA',
      boardId: task.boardId,
      column: task.currentColumn
    })
  }
})