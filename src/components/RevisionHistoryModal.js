import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { Editor } from 'draft-js';

class RevisionHistoryModal extends React.Component  {
  constructor() {
    super();
    this.state = {
      shareableId: '',
      password: '',
      open: false,
      revisionHistory: [],
    }
  }

  checkShareableInfo() {
    fetch('http://localhost:1337/shareable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shareableId: this.state.shareableId,
        currentUserId: this.props.currentUserId,
        password: this.state.password,
      })
    })
    .then((res) => {
      return res.json()
    })
    .then(responseJSON => {
      if (responseJSON.message === "Success") {
        this.props.addShareable(responseJSON.doc);
        this.setState({open: false})
      } else {
        this.setState({open: false})
      }
    })
    .catch(err => console.log("Modal error", err))
  }

  fetchHistory() {
    fetch('http://localhost:1337/revisionHistory?docId='+this.props.docId)
      .then(res => res.json())
      .then(resJson => {
        console.log('HISTORY', resJson.history)
        this.setState({revisionHistory: resJson.history.reverse(), open: true})
      })
  }

  render() {
        return (
          <Modal open={this.state.open} id='revision_history_modal' size='fullscreen' trigger={
            <Button icon id="revision_history_button" onClick={() => this.fetchHistory()} className="ui primary button" style={{height: '45px', backgroundColor: '#cd6133'}}>
              <i className="material-icons" id='test'>watch_later</i>
            </Button>
          } basic size='small' closeIcon>
          <Header icon='clock' content='Revision History'/>
          <Modal.Content size='fullscreen' scrolling>
            <div className='container' id='revision_modal_container'>
              <div id='revision_modal_document_column'>
                <div id='revision_title'>
                  <h2>{this.props.docTitle} (created at: {this.props.lastSaveTime.toString().slice(0, Date().toString().indexOf('GMT'))})</h2>
                </div>
                <br />
                <div id='revision_document'>
                  <Editor
                    editorState={this.props.editorState}
                    onChange={() => {}}
                    readOnly={true}
                  />
                </div>
              </div>
              <div id='revision_modal_history_column'>
                <div id='revision_history_title'>
                  <h2>Revision History</h2>
                </div>
                <br />
                <div id='revision_modal_history_container'>
                  <div id='revision_modal_history_list'>
                      {this.state.revisionHistory.map((version, index) => {
                        return <div onClick={() => this.props.onClick(version.editorState)} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', margin: 'auto', borderBottom: '1px solid #cd6133', height: '50px'}}><a href="#"> {version.saveTime.toString()} </a> <br /></div>
                      })}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <div id='restore_history'>
              <Button id="restore_button" animated='fade' className="ui primary button">
                <Button.Content visible>Restore</Button.Content>
                <Button.Content hidden onClick={() => {
                    this.setState({open: false, revisionHistory: []}, () => {
                      this.props.restore()
                    });
                  }
                }>
                  <Icon name='redo' />
                </Button.Content>
              </Button>
            </div>
          </Modal.Content>
          <Modal.Actions>

          </Modal.Actions>
        </Modal>
      );
    }
}

export default RevisionHistoryModal;
