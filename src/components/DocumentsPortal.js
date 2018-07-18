import React, { Component } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react'
import ModalBasicExample from './NewDocModal.js'

export default class DocumentsPortal extends React.Component {

  render() {
    return(
      <div className='container'>
        <div className='container' id="docPortalHeader">
          <div className="topnav">
            <h2 id='docPortalTitle'>Documents Portal</h2>
          </div>
          <Button id="homeButton" animated='vertical'>
            <Button.Content hidden>Logout</Button.Content>
            <Button.Content visible>
              <Icon name='sign out alternate icon' />
            </Button.Content>
          </Button>
        </div>


        <br />
        <div className='container' id='container3'>
          <div className="toolbar2">
            <div className="createDoc">
              <ModalBasicExample/>
            </div>
            <div className="shareableDoc">
              <Button id="shareableDoc" onMouseDown={(e) => {
              console.log("Does this work?")
            }} className="ui primary button">Create Shareable Document</Button>
            </div>
          </div>

          <div className='docsList'>
            <div className='docsListHeader'>
              <h3 id='docsListH3'>My Documents</h3>
            </div>
            <br />
            <div className='docsListList'>
              <u1>
                <li><a href='#'>Document 1</a></li>
                <li><a href='#'>Document 2</a></li>
              </u1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
