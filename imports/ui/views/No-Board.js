import React, { Component } from 'react'

export default class NoBoard extends Component {
  render() {
    return (
      <div className="no-board-container">
        Désolé, mais il n'existe aucun tableau à l'heure actuelle.
        <br/>
        Voulez vous en créer un ?
      </div>
    )
  }
}