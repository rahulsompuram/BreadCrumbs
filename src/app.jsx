import React from 'react';
<<<<<<< HEAD
import MyEditor from './components/MyEditor'
import io from 'socket.io-client'
=======
import LoginPage from './components/LoginPage'
>>>>>>> 1639637864ac7daeec8bff615ce0489b4aa3a5e1

export default class App extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      currentPage: 'MyEditor',
      connecting: true,
    };
=======
    this.state = { currentPage: 'LoginPage' };
>>>>>>> 1639637864ac7daeec8bff615ce0489b4aa3a5e1
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:1337')
    this.socket.on('connect', () => this.setState({connecting: null}))
    this.socket.on('disconnect', () => this.setState({connecting: true}))

    //put this into LoginPage onClick button
    this.socket.emit('login', {username: 'demi', password: 'test'}, (res) => {
      console.log('status', res)
    })
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
