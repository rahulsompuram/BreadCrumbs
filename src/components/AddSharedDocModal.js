import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'


class AddSharedDocModal extends React.Component  {
  constructor() {
    super();
    this.state = {
      shareableId: '',
      password: '',
      open: false
    }
  }

  checkShareableInfo() {
    fetch('http://localhost:1337/shareable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shareableId: this.state.shareableId,
        currentUserId: this.props.currentUserId,
        password: this.state.password,
      })
    })
    .then((res) => {
      return res.json()
    })
    .then(responseJSON => {
      if (responseJSON.message === "Success") {
        this.props.addShareable(responseJSON.doc);
        this.setState({open: false})
      } else {
        this.setState({open: false})
      }
    })
    .catch(err => console.log("Modal error", err))
  }

  render() {
        return (
          <Modal open={this.state.open} trigger={
            <Button id="shareableDoc" onClick={() => this.setState({open: true})} animated='fade' className="ui primary button">
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
                <input type="text" placeholder="Enter shareable ID" onChange={(event) => this.setState({shareableId: event.target.value})} value={this.state.shareableId}/>
              </div>
              <br/>
              <div className="modalTitleInput ui input">
                <input type="password" placeholder="Enter document password" onChange={(event) => this.setState({password: event.target.value})} value={this.state.password}/>
              </div>
              <br/>
              <Button className="ui blue button" onClick={() => this.checkShareableInfo()}>Add</Button>
            </div>
          </Modal.Actions>
        </Modal>
      );
    }
}

export default AddSharedDocModal;
