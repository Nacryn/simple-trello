// USER PANEL
//
// This whole component will hold the sign-in / sign-out process, and display the user's informations

import React, { Component } from 'react'

import '../../styles/user-panel.css'

export default class UserPanel extends Component {
  render() {
    return (
      <div className="user-panel-container">
        {/* This should be replaced by the name of the logged user */}
        <div className="user-panel-name">Utilisateur</div>
      </div>
    )
  }
}