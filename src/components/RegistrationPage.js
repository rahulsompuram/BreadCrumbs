import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'

import User from '../../model/user';

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
    User.findOne({ username: this.state.username })
    .then(user => {
      if(user){
        this.setState({ message: "This username has already been taken." });
      } else {
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
          .then(res => res.success ? this.props.redirect('LoginPage') : null)
          .catch(err => res.send({ 'error': err }))
        } else {
          this.setState({message: "Passwords do not match!"})
        }
      }
    })
    .catch(err => res.send({'error': err}))
  }

  onChgNameF = (e) => { this.setState({fName: e.target.value}) }
  onChgNameL = (e) => { this.setState({lName: e.target.value}) }
  onChgUsername = (e) => { this.setState({username: e.target.value}) }
  onChgPass = (e) => { this.setState({password: e.target.value}) }
  onChgPassRpt = (e) => { this.setState({passwordRepeat: e.target.value}) }


  render() {
    return (
      <div>
        <div className='container' id="loginHeader">
          <div className="topnav2">
            <Button id="loginRedirectButton" animated='vertical' onClick={() => this.props.redirect('LoginPage')}>
             <Button.Content visible>Back to Login</Button.Content>
             <Button.Content hidden>
               <Icon size='large' name='arrow alternate circle left' />
             </Button.Content>
           </Button>
          </div>
        </div>
        <div id="registrationTitle">
          Registration
        </div>
        <div id="register_inputs">
          <Input focus type="text" value={this.state.fName} onChange={this.onChgNameF} placeholder='First Name' onKeyDown={(e) => e.key === "Enter" ? this.onRegClick() : null}/> <br />
          <Input focus type="text" value={this.state.lName} onChange={this.onChgNameL} placeholder='Last Name' onKeyDown={(e) => e.key === "Enter" ? this.onRegClick() : null}/> <br />
          <Input focus type="text" value={this.state.username} onChange={this.onChgUsername} placeholder='Username' onKeyDown={(e) => e.key === "Enter" ? this.onRegClick() : null}/> <br />
          <Input focus type="password" value={this.state.password} onChange={this.onChgPass} placeholder='Password' onKeyDown={(e) => e.key === "Enter" ? this.onRegClick() : null}/> <br />
          <Input focus type="password" value={this.state.passwordRepeat} onChange={this.onChgPassRpt} placeholder='Repeat Password' onKeyDown={(e) => e.key === "Enter" ? this.onRegClick() : null}/> <br />
          <Button onClick={this.onRegClick} primary>Register</Button>
          <text style={{color: 'red'}}>{this.state.message}</text>
        </div>
    </div>
    );
  }
}
