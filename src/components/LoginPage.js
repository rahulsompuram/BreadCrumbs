import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import io from 'socket.io-client'


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <div id="loginTitle">
          BreadCrumbs
        </div>
        <div id="credentials">
          <Input focus type="text" placeholder='Username' />
          <br/>
          <Input focus type="password" placeholder='Password' />
          <br/>
          <br/>
          <Button onClick={this.props.clickLogin} primary>Sign In</Button>
          <br/>
          <Button id="registerButton">Register</Button>
          <br/>
        </div>
      </div>
    );
  }
}
