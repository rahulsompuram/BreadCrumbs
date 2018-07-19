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
      currentPage: 'LoginPage',
      currentUserId: '',
      currentDocId: '',
      currentDocTitle: ''
    };
    this.redirect = this.redirect.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.setDocInfo = this.setDocInfo.bind(this);
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  setUserId(id) {
    this.setState({ currentUserId: id})
  }

  setDocInfo(id, title) {
    this.setState({
      currentDocId: id,
      currentDocTitle: title
    })
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === "LoginPage" ? <LoginPage redirect={this.redirect} setUserId={this.setUserId}/> : null}
        {this.state.currentPage === "MyEditor" ? <MyEditor redirect={this.redirect} docTitle={this.state.currentDocTitle} docId={this.state.currentDocId}/> : null}
        {this.state.currentPage === "DocumentsPortal" ? <DocumentsPortal redirect={this.redirect} setDocInfo={this.setDocInfo} currentUserId={this.state.currentUserId}/> : null}
        {this.state.currentPage === "RegistrationPage" ? <RegistrationPage redirect={this.redirect} /> : null}
      </div>);
  }
}
