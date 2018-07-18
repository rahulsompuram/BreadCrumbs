import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import RaisedButton from 'material-ui/RaisedButton';
import ColorPicker, { colorPickerPlugin } from 'draft-js-color-picker';
import { Button, Icon, Input } from 'semantic-ui-react'


const styleMap = {
  'UPPERCASE': {
    textTransform: 'uppercase'
  },
  'LOWERCASE': {
    textTransform: 'lowercase'
  },
  'ENLARGE': {
    fontSize: '40px'
  },
  'SHRINK': {
    fontSize: '10px'
  }
}

const presetColors = [
  '#ff00aa',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      fontSize: 15,
      documentTitle: 'Edit Document',
      value: ''
    };
    this.onChange = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
  }

  toggleInlineStyle(e, inlineStyle) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  toggleBlockType(e, blockType) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'left':
      return 'align-left';
      case 'center':
      return 'align-center';
      case 'right':
      return 'align-right';
      default:
      return null;
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({documentTitle: this.state.value});
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className="container">
        <div className='container' id="documentHeader">
          <div className="topnav">
            <h2>{this.state.documentTitle}</h2>
          </div>
          <Button id="homeButton" animated='vertical' onClick={() => this.props.redirect('DocumentsPortal')}>
           <Button.Content hidden>Home</Button.Content>
           <Button.Content visible>
             <Icon name='home' />
           </Button.Content>
         </Button>
         <Button id="homeButton" animated='vertical'>
          <Button.Content hidden>Logout</Button.Content>
          <Button.Content visible>
            <Icon name='sign out alternate icon' />
          </Button.Content>
        </Button>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label id='update_label'>
            Update title:
            <input type="text" name="name" placeholder={this.state.documentTitle} onChange={this.handleChange.bind(this)}/>
          </label>
          <input type="submit" value="Change!" />
        </form>

        <br />
        <div className='container' id='container2'>
          <div className="toolbar">
            <Button.Group>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'BOLD')}>
                <i className="material-icons" id='test'>format_bold_white</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'ITALIC')}>
                <i className="material-icons" id='test'>format_italic</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'UNDERLINE')}>
                <i className="material-icons" id='test'>format_underlined</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'STRIKETHROUGH')}>
                <i className="material-icons" id='test'>strikethrough_s</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'UPPERCASE')}>
                <text id='test'>
                  ABC
                </text>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'LOWERCASE')}>
                <text id='test'>
                  abc
                </text>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'ENLARGE')}>
                <text id='test'>
                  +
                </text>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleInlineStyle(e, 'SHRINK')}>
                <text id='test'>
                  -
                </text>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleBlockType(e, 'unordered-list-item')}>
                <i className="material-icons" id='test'>format_list_bulleted</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleBlockType(e, 'ordered-list-item')}>
                <i className="material-icons" id='test'>format_list_numbered</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}}  onMouseDown={e => this.toggleBlockType(e, 'left')}>
                <i className="material-icons" id='test'>format_align_left</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleBlockType(e, 'center')}>
                <i className="material-icons" id='test'>format_align_center</i>
              </Button>
              <Button icon style={{height: '45px', backgroundColor: '#cd6133'}} onMouseDown={e => this.toggleBlockType(e, 'right')}>
                <i className="material-icons" id='test'>format_align_right</i>
              </Button>
              <Button style={{height: '45px', backgroundColor: '#cd6133'}}>
                <ColorPicker
                  toggleColor={color => this.picker.addColor(color)}
                  presetColors={presetColors}
                  color={this.picker.currentColor(editorState)}
                />
              </Button>
            </Button.Group>
          </div>
          <br />
          <div className="editor" style={{backgroundColor: 'white', width: '80%', margin: 'auto', paddingBottom: '10px'}}
            onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault()
              // TODO TAB INDENT FEATURE

            }
          }}>
            <Editor
              editorState={editorState}
              customStyleMap={styleMap}
              customStyleFn={this.picker.customStyleFn}
              onChange={this.onChange}
              blockStyleFn={this.getBlockStyle}
            />
          </div>
          <br />
        </div>
      </div>
    );
  }
}
