import React, { Component } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react'
import NewDocModal from './NewDocModal.js'
import AddSharedDocModal from './AddSharedDocModal.js'

export default class DocumentsPortal extends React.Component {
  constructor() {
    super();
    this.state = {
      userDocs: []
    }
    this.addShareable = this.addShareable.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:1337/userDocs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: this.props.currentUserId,
      })
    })
      .then(res => res.json())
      .then(responseJSON => {
        return this.setState({userDocs: responseJSON})
      })
      .catch(err => console.log("DocumentsPortal error", err))
  }

  addShareable(doc) {
    this.setState({
      userDocs: [doc].concat(this.state.userDocs)
    })
  }

  render() {
    return(
      <div className='container' id='background_example'>
        <div className='container' id="docPortalHeader">
          <div className="topnav">
            <h2 id='docPortalTitle'>Documents Portal</h2>
          </div>
          <Button onClick={() => this.props.redirect('LoginPage')} id="homeButton" animated='vertical'>
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
              <NewDocModal setDocInfo={this.props.setDocInfo} currentUserId={this.props.currentUserId} redirect={this.props.redirect}/>
            </div>
            <div className="shareableDoc">
              <AddSharedDocModal redirect={this.props.redirect} currentUserId={this.props.currentUserId} addShareable={this.addShareable}/>
            </div>
          </div>

          <div className='docsList'>
            <div className='docsListHeader'>
              <h4 id='docsListH3'>My Documents</h4>
            </div>
            <br />
            <div className='docsListList'>
              <ul>
                {this.state.userDocs.map((doc) => {
                  return <li><a href="#" onClick={() => {
                    this.props.setDocInfo(doc._id, doc.title)
                    this.props.redirect('MyEditor')
                  }}>{doc.title}</a></li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
