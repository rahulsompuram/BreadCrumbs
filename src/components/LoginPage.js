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
      // connecting: true,
      message: ""
    };
    this.socket = ""
  }
  componentDidMount() {
    this.socket = io('http://localhost:1337')
    // this.socket.on('connect', () => this.setState({connecting: null}))
    // this.socket.on('disconnect', () => this.setState({connecting: true}))
  }
  clickLogin = () => {
    this.socket.emit('login', {username: this.state.username, password: this.state.password}, (res) => {
      if (res) {
        this.props.setUserId(res._id);
        this.props.redirect('DocumentsPortal');
      } else {
        this.setState({message: "Invalid username and password pair!"})
      }
    })
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
      <div id='background_example'>
        <div className='container' id='login_container'>
          <div id="loginTitle">
            BreadCrumbs
          </div>
          <br />
          <br />
          <br />
          <br />
          <div id="credentials">
            <Input focus type="text" onChange={this.onChangeUser} value={this.state.username} placeholder='Username' onKeyDown={(e) => e.key === "Enter" ? this.clickLogin() : null}/>
            <br/>
            <Input focus type="password" onChange={this.onChangePass} value={this.state.password} placeholder='Password' onKeyDown={(e) => e.key === "Enter" ? this.clickLogin() : null}
            />
            <br/>
            <br/>
            <Button onClick={this.clickLogin} primary>Sign In</Button>
            <br/>
            <Button onClick={() => this.props.redirect('RegistrationPage')} id="registerButton">Register</Button>
            <br/>
            <text style={{color: 'red'}}>{this.state.message}</text>
          </div>
        </div>
      </div>
    );
  }
}
