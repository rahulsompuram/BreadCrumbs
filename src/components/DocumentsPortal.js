import React, { Component } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react'
import Document from '../../model/document.js'
import User from '../../model/user.js'
import NewDocModal from './NewDocModal.js'
import AddSharedDocModal from './AddSharedDocModal.js'

export default class DocumentsPortal extends React.Component {
  constructor() {
    super();
    this.state = {
      userDocs: []
    }
  }

  componentDidMount() {
    //Do the mongo call to populate the use
    //TODO
    Document.find({owner: this.props.currentUserId})
      .then(doc => {
        if (doc) {
          this.setState({userDocs: doc})
        } else {
          console.log("User not found");
          this.props.redirect('LoginPage');
        }
      })
      .catch(err => {
        console.log(err)
        this.props.redirect('LoginPage');
      })
  }

  render() {
    return(
      <div className='container'>
        <div className='container' id="docPortalHeader">
          <div className="topnav">
            <h2 id='docPortalTitle'>Documents Portal</h2>
          </div>
          <Button id="homeButton" animated='vertical'>
            <Button.Content hidden>Logout</Button.Content>
            <Button.Content visible>
              <Icon name='sign out alternate icon' />
            </Button.Content>
          </Button>
        </div>


        <br />
        <div className='container' id='container3'>
          <div className="toolbar2">
            <div className="createDoc">
              <NewDocModal currentUserId={this.props.currentUserId} redirect={this.props.redirect}/>
            </div>
            <div className="shareableDoc">
              <AddSharedDocModal />
            </div>
          </div>

          <div className='docsList'>
            <div className='docsListHeader'>
              <h3 id='docsListH3'>My Documents</h3>
            </div>
            <br />
            <div className='docsListList'>
              <ul>
                {this.state.userDocs.map((doc) => {
                  return <li><a href="#">{doc.title}</a></li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
