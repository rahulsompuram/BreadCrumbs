import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const AddSharedDocModal = () => {
  return (
  <Modal trigger={
    <Button id="shareableDoc" animated='fade' className="ui primary button">
      <Button.Content visible>
        Add Shared Document
      </Button.Content>
      <Button.Content hidden>
        <Icon name='plus' />
      </Button.Content>
    </Button>
  } basic size='small' closeIcon>
    <Header icon='file alternate icon' content='Add shareable document...'/>
    <Modal.Content>

    </Modal.Content>
    <Modal.Actions>
      <div className="modalContainer">
        <div className="modalTitleInput ui input">
          <input type="text" placeholder="Enter shareable ID"/>
        </div>
        <br/>
        <div className="modalTitleInput ui input">
          <input type="password" placeholder="Enter document password"/>
        </div>
        <br/>
        <Button className="ui blue button">Add</Button>
      </div>
    </Modal.Actions>
  </Modal>
  );
}

export default AddSharedDocModal;
