import React from 'react';
import LoginPage from './components/LoginPage'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 'LoginPage' };
    this.redirect = this.redirect.bind(this);
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === "LoginPage" ? <LoginPage /> : null}
      </div>);
  }
}
