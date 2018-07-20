import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'


class RevisionHistoryModal extends React.Component  {
  constructor() {
    super();
    this.state = {
      shareableId: '',
      password: '',
      open: false
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

  render() {
        return (
          <Modal id='revision_history_modal' size='fullscreen' trigger={
            <Button icon id="revision_history_button" onClick={() => this.setState({open: true})} className="ui primary button" style={{height: '45px', backgroundColor: '#cd6133'}}>
              <i className="material-icons" id='test'>watch_later</i>
            </Button>
          } basic size='small' closeIcon>
          <Header icon='clock' content='Revision History'/>
          <Modal.Content size='fullscreen' scrolling>
            <div className='container' id='revision_modal_container'>
              <div id='revision_modal_document_column'>
                <div id='revision_title'>
                  <h2>Document title here (at time X)</h2>
                </div>
                <br />
                <div id='revision_document'>
                  Put document here
                </div>
                <br />
                <div id='revision_changes_container'>
                  <div id='revision_changes'>
                    <div id='revision_additions'>
                      <div id='additions_title'>
                        Additions
                      </div>
                      <div id='additions_body'>
                        <ul>
                          <li>
                            Addition 1 here
                          </li>
                          <li>
                            Addition 2 here
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id='revision_removals'>
                      <div id='removals_title'>
                        Removals
                      </div>
                      <div id='removals_body'>
                        <ul>
                          <li>
                            Removal 1 here
                          </li>
                          <li>
                            Removal 2 here
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id='revision_modal_history_column'>
                <div id='revision_history_title'>
                  <h2>Revision History</h2>
                </div>
                <br />
                <div id='revision_modal_history_container'>
                  <div id='revision_modal_history_list'>
                    <ul>
                      <li>
                        History 1 here
                      </li>
                      <li>
                        History 2 here
                      </li>
                    </ul>
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
                <Button.Content hidden>
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
