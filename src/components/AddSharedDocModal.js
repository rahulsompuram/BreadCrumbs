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
        <div className="modalSharedIdInput ui input">
          <input type="text" placeholder="Insert shareable ID"/>
        </div>
        <br/>
        <Button className="ui blue button">Add</Button>
      </div>

    </Modal.Actions>
  </Modal>
  );
}

export default AddSharedDocModal;
