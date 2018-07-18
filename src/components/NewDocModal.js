import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class NewDocModal extends React.Component {
  constructor(){
    super()
    this.state = {
      title: "",
      collaboratorList: []
    }
  }

  onChangeTitle = (e) => {this.setState({ title: e.target.value })}

  onClickCreate = () => {

  }

  render() {
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
            <input type="text" value={this.state.title} onChange={this.onChangeTitle} placeholder="Add a title"/>
          </div>
          <br/>
          <div className="modalTitleInput ui input">
            <input type="password" placeholder="Document password"/>
          </div>
          <br/>
          <div className="modalTitleInput ui input">
            <input type="password" placeholder="Repeat document password"/>
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
}
