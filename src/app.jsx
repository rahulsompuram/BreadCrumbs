import React from 'react';
import MyEditor from './components/MyEditor'
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'MyEditor',
      connecting: true,
    };
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
      <div>
        {this.state.currentPage === "MyEditor" ? <MyEditor /> : null}
      </div>);
  }
}
