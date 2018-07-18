import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

export default class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      username: "",
      password: "",
      passwordRepeat: "",
      message: ""
    };
  }

  onRegClick = () => {
    if(this.state.password === this.state.passwordRepeat){
      fetch('http://localhost:1337/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            fName: this.state.fName,
            lName: this.state.lName
          })
      })
      .then(res => res.json())
      .then(res => this.props.redirect('LoginPage'))
      .catch(err => console.log('FETCH ERROR', err))
    } else {
      this.setState({message: "Passwords do not match!"})
    }
  }

  onChgNameF = (e) => { this.setState({fName: e.target.value}) }
  onChgNameL = (e) => { this.setState({lName: e.target.value}) }
  onChgUsername = (e) => { this.setState({username: e.target.value}) }
  onChgPass = (e) => { this.setState({password: e.target.value}) }
  onChgPassRpt = (e) => { this.setState({passwordRepeat: e.target.value}) }


  render() {
    return (
      <div>
        <div id="registrationTitle">
          Registration
        </div>
        <div id="register_inputs">
          <Input focus type="text" value={this.state.fName} onChange={this.onChgNameF} placeholder='First Name' /> <br />
          <Input focus type="text" value={this.state.lName} onChange={this.onChgNameL} placeholder='Last Name' /> <br />
          <Input focus type="text" value={this.state.username} onChange={this.onChgUsername} placeholder='username' /> <br />
          <Input focus type="password" value={this.state.password} onChange={this.onChgPass} placeholder='Password' /> <br />
          <Input focus type="password" value={this.state.passwordRepeat} onChange={this.onChgPassRpt} placeholder='Repeat Password' /> <br />
          <Button onClick={this.onRegClick} primary>Register</Button>
          <text style={{color: 'red'}}>{this.state.message}</text>
        </div>
      </div>
    );
  }
}