import React from 'react';
import MyEditor from './components/MyEditor'
import io from 'socket.io-client'
import LoginPage from './components/LoginPage'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'LoginPage',
      connecting: true,
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:1337')
    this.socket.on('connect', () => this.setState({connecting: null}))
    this.socket.on('disconnect', () => this.setState({connecting: true}))

  }

  clickLogin = () => {
    this.socket.emit('login', {username: 'demi', password: 'demi'}, (res) => {
      console.log('status', res)
    })
    console.log('here')
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === "LoginPage" ? <LoginPage clickLogin={this.clickLogin} /> : null}
      </div>);
  }
}
