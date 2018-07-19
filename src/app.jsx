import React from 'react';
import MyEditor from './components/MyEditor'
import LoginPage from './components/LoginPage'
import DocumentsPortal from './components/DocumentsPortal'
import RegistrationPage from './components/RegistrationPage'
import io from 'socket.io-client'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'LoginPage',
      currentUserId: '',
      currentUsername: '',
      currentDocId: '',
      currentDocTitle: ''
    };
    this.redirect = this.redirect.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.setDocInfo = this.setDocInfo.bind(this);
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  setUserId(id, username) {
    this.setState({
      currentUserId: id,
      currentUsername: username
    })
  }

  setDocInfo(id, title) {
    this.setState({
      currentDocId: id,
      currentDocTitle: title
    })
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === "LoginPage" ? <LoginPage redirect={this.redirect} setUserId={this.setUserId}/> : null}
        {this.state.currentPage === "MyEditor" ? <MyEditor redirect={this.redirect} currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId} docTitle={this.state.currentDocTitle} docId={this.state.currentDocId}/> : null}
        {this.state.currentPage === "DocumentsPortal" ? <DocumentsPortal redirect={this.redirect} setDocInfo={this.setDocInfo} currentUserId={this.state.currentUserId}/> : null}
        {this.state.currentPage === "RegistrationPage" ? <RegistrationPage redirect={this.redirect} /> : null}
      </div>);
  }
}
