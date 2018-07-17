import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import RaisedButton from 'material-ui/RaisedButton';

const styleMap = {
  'UPPERCASE': {
    textTransform: 'uppercase'
  },
  'LOWERCASE': {
    textTransform: 'lowercase'
  }
}

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
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

          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'BOLD')} color="primary">Font color</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleInlineStyle(e, 'ITALIC')} color="primary">Italic </RaisedButton>

          <RaisedButton onMouseDown={e => this.toggleBlockType(e, 'unordered-list-item')} color="primary">•</RaisedButton>
          <RaisedButton onMouseDown={e => this.toggleBlockType(e, 'ordered-list-item')} color="primary">1.</RaisedButton>
        </div>

          <Editor
            editorState={this.state.editorState}
            customStyleMap={styleMap}
            onChange={this.onChange}
          />
        </div>
      </div>);
  }
}
