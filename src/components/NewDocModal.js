import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalBasicExample = () => {
  return (
  <Modal trigger={
    <Button id="newDoc" animated='fade' className="ui primary button">
    <Button.Content visible>New Document</Button.Content>
    <Button.Content hidden>
      <Icon name='plus' />
    </Button.Content>
    </Button>
  } basic size='small' closeIcon>
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
        <Button className="ui blue button">Create</Button>
      </div>

    </Modal.Actions>
  </Modal>
  );
}

export default ModalBasicExample
