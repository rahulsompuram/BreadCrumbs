import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class NewDocModal extends React.Component {
  constructor(){
    super()
    this.state = {
      title: "",
      password: "",
      passwordRepeat: "",
      collaboratorStr: "",
      message: ""
    }
  }

  onChangeTitle = (e) => {this.setState({ title: e.target.value })}
  onChangePass = (e) => {this.setState({ password: e.target.value })}
  onChangePassRpt = (e) => {this.setState({ passwordRepeat: e.target.value })}
  onChangeCollab = (e) => {this.setState({ collaboratorStr: e.target.value })}

  onClickCreate = () => {
    if(this.state.password === this.state.passwordRepeat){
      fetch('http://localhost:1337/createDoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          password: this.state.password,
          collaboratorStr: this.state.collaboratorStr,
          owner: this.props.currentUserId
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.setDocInfo("", this.state.title)
          this.props.redirect('MyEditor')
        } else {
          this.setState({ message: res.message })
        }
      })
      .catch(err => console.log("New Doc Modal error", err))
    } else {
      this.setState({message: "Passwords do not match!"})
    }

  }

  render() {
    return (
    <Modal trigger={
      <Button id="newDoc" onClick={() => this.setState({open: true})} animated='fade' className="ui primary button">
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
            <input type="password" value={this.state.password} onChange={this.onChangePass} placeholder="Document password"/>
          </div>
          <br/>
          <div className="modalTitleInput ui input">
            <input type="password" value={this.state.passwordRepeat} onChange={this.onChangePassRpt} placeholder="Repeat document password"/>
          </div>
          <br/>
          <div className="modalCollabInput ui left icon input">
            <input type="text" value={this.state.collaboratorStr} onChange={this.onChangeCollab} placeholder="Invite collaborators"/>
            <i className="users icon"></i>
          </div>
          <br/>
          <Button onClick={this.onClickCreate} className="ui blue button">Create</Button>
          <br/>
          <text style={{color: 'red'}}>{this.state.message}</text>
        </div>

      </Modal.Actions>
    </Modal>
    );
  }
}
