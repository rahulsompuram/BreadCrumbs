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
      .catch(err => res.send({ 'error': err }))
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
