import React from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

export default class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div id="registrationTitle">
          Registration
        </div>
        <div id="register_inputs">
          <Input focus type="text" placeholder='First Name' /> <br />
          <Input focus type="text" placeholder='Last Name' /> <br />
          <Input focus type="text" placeholder='username' /> <br />
          <Input focus type="password" placeholder='Password' /> <br />
          <Input focus type="password" placeholder='Repeat Password' /> <br />
          <Button primary>Register</Button>
        </div>
      </div>
    );
  }
}
