import React, { Component } from 'react';
import { Button, Icon, Modal, Header } from 'semantic-ui-react'

export default class DocumentsPortal extends React.Component {

  // const ModalBasicExample = () => (
  //   <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
  //     <Header icon='archive' content='Create a new document...'/>
  //     <Modal.Content>
  //       <p>
  //         Add inputs to make a new Doc
  //       </p>
  //     </Modal.Content>
  //     <Modal.Actions>
  //       <Button basic color='red' inverted>
  //         <Icon name='remove' /> No
  //       </Button>
  //       <Button color='green' inverted>
  //         <Icon name='checkmark' /> Yes
  //       </Button>
  //     </Modal.Actions>
  //   </Modal>
  // )


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
              <Button id="newDoc" onMouseDown={(e) => {
              console.log("Does this work?")
            }} className="ui primary button">New Document</Button>
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
