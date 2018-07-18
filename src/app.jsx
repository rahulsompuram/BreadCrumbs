import React from 'react';
import MyEditor from './components/MyEditor'
import LoginPage from './components/LoginPage'
import DocumentsPortal from './components/DocumentsPortal'
import RegistrationPage from './components/RegistrationPage'
import io from 'socket.io-client'

import mongoose from 'mongoose';
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      currentPage: 'LoginPage',
=======
      currentPage: 'RegistrationPage',
>>>>>>> 3799e9f70284b7494be7d33f011ecbb2e2e45608
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === "LoginPage" ? <LoginPage redirect={this.redirect} /> : null}
        {this.state.currentPage === "MyEditor" ? <MyEditor redirect={this.redirect} /> : null}
        {this.state.currentPage === "DocumentsPortal" ? <DocumentsPortal redirect={this.redirect} /> : null}
        {this.state.currentPage === "RegistrationPage" ? <RegistrationPage redirect={this.redirect} /> : null}
      </div>);
  }
}
