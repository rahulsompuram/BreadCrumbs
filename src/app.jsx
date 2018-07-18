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
      currentPage: 'DocumentsPortal',
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === "LoginPage" ? <LoginPage redirect={this.redirect} /> : null}
        {this.state.currentPage === "MyEditor" ? <MyEditor redirect={this.redirect} /> : null}
        {this.state.currentPage === "DocumentsPortal" ? <DocumentsPortal redirect={this.redirect} /> : null}
        {this.state.currentPage === "RegistrationPage" ? <RegistrationPage redirect={this.redirect} /> : null}
      </div>);
  }
}
