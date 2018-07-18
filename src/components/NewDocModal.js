import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalBasicExample = () => {
  return (
  <Modal trigger={<Button id="newDoc">New Document</Button>} basic size='small' closeIcon>
    <Header icon='file alternate icon' content='Create a new document...'/>
    <Modal.Content>

    </Modal.Content>
    <Modal.Actions>
      <div className="modalContainer">
        <div className="modalTitleInput ui input">
          <input type="text" placeholder="Add a title"/>
        </div>
        <br/>
        <div className="modalCollabInput ui left icon input">
          <input type="text" placeholder="Invite collaborators"/>
          <i className="users icon"></i>
        </div>
        <br/>
        <Button className="ui grey button">Create</Button>
      </div>

    </Modal.Actions>
  </Modal>
  );
}

export default ModalBasicExample
