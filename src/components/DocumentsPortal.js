import React, { Component } from 'react';
import { Button, Icon, Modal, Header } from 'semantic-ui-react'

export default class DocumentsPortal extends React.Component {

  const ModalBasicExample = () => (
    <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
      <Header icon='archive' content='Create a new document...'/>
      <Modal.Content>
        <p>
          Add inputs to make a new Doc
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )


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
          <Button id="newDoc" onMouseDown={(e) => {
          console.log("Does this work?")
          <div class='ui basic modal'></div>
        }} className="ui primary button">New Document</Button>
        </div>

        <div className='docsList'>
          <h3>My Documents</h3>
          <u1>
            <li><a href='#'>Document 1</a></li>
            <li><a href='#'>Document 2</a></li>
          </u1>
        </div>

        <div>
          this.ModalBasicExample()
        </div>



      </div>
    )
  }
}
