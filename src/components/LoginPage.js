import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import io from 'socket.io-client'


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      connecting: true,
      message: ""
    };
    this.socket = ""
  }


  componentDidMount() {
    this.socket = io('http://localhost:1337')
    this.socket.on('connect', () => this.setState({connecting: null}))
    this.socket.on('disconnect', () => this.setState({connecting: true}))
  }

  clickLogin = () => {
    this.socket.emit('login', {username: this.state.username, password: this.state.password}, (res) => {
      res === "MyEditor" ? this.props.redirect(res) : this.setState({message: "Invalid username and password pair!"})
    })
  }

  onRegClick = () => {
    fetch('http://localhost:1337/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log('FETCH ERROR', err))
  }

  onChangeUser = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onChangePass = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div id="loginTitle">
          BreadCrumbs
        </div>
        <div id="credentials">
          <Input focus type="text" onChange={this.onChangeUser} value={this.state.username} placeholder='Username' />
          <br/>
          <Input focus type="password" onChange={this.onChangePass} value={this.state.password} placeholder='Password' />
          <br/>
          <br/>
          <Button onClick={this.clickLogin} primary>Sign In</Button>
          <br/>
          <Button onClick={this.onRegClick} id="registerButton">Register</Button>
          <br/>
        </div>
        <text style={{color: 'red'}}>{this.state.message}</text>
      </div>
    );
  }
}
