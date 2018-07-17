import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

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
          <Input focus type="password" placeholder='Password' />
          <Button primary>Sign In</Button>
          <Button id="registerButton">Register</Button>
        </div>
      </div>
    );
  }
}
