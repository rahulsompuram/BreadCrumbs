import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import RaisedButton from 'material-ui/RaisedButton';
import ColorPicker, { colorPickerPlugin } from 'draft-js-color-picker';


const styleMap = {
  'UPPERCASE': {
    textTransform: 'uppercase'
  },
  'LOWERCASE': {
    textTransform: 'lowercase'
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
      editorState: EditorState.createEmpty() 
    };
    this.onChange = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
  }

  toggleInlineStyle(e, inlineStyle) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  toggleBlockType(e, blockType){
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className="container">
        <h3 className="title">Document Title</h3>
      <div className="editor">
        <div className="toolbar">
          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'BOLD')} color="primary">B</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'ITALIC')} color="primary">I</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'UNDERLINE')} color="primary">U</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'STRIKETHROUGH')} color="primary">S</RaisedButton>

          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'UPPERCASE')} color="primary">ABC</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'LOWERCASE')} color="primary">abc</RaisedButton>

          <ColorPicker
            toggleColor={color => this.picker.addColor(color)}
            presetColors={presetColors}
            color={this.picker.currentColor(editorState)}
          />

          <RaisedButton onMouseDown={e => this.toggleBlockType(e, 'unordered-list-item')} color="primary">•</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleBlockType(e, 'ordered-list-item')} color="primary">1.</RaisedButton>
        </div>

          <Editor
            editorState={editorState}
            customStyleMap={styleMap}
            customStyleFn={this.picker.customStyleFn}
            onChange={this.onChange}
          />
        </div>
      </div>);
  }
}
