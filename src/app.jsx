import React from 'react';
import MyEditor from './components/MyEditor'
import io from 'socket.io-client'
import LoginPage from './components/LoginPage'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'LoginPage',
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
      </div>);
  }
}
