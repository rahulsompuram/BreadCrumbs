import React, { Component } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react'
import ModalBasicExample from './NewDocModal.js'

export default class DocumentsPortal extends React.Component {

  render() {
    return(
      <div>

        <h1 className='docPortal'>Documents Portal</h1>

        <div className="logoutButton">
          <Button className="ui icon button">
            <i className="sign out alternate icon"></i>
          </Button>
        </div>

        <div className="createDoc">
          <ModalBasicExample/>
        </div>


        <div className='docsList'>
          <h3>My Documents</h3>
          <ul>
            <li><a href='#'>Document 1</a></li>
            <li><a href='#'>Document 2</a></li>
          </ul>
        </div>


      </div>
    )
  }
}
