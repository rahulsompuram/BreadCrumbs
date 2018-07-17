import React from 'react';
import MyEditor from './components/MyEditor'
import DocumentsPortal from './components/DocumentsPortal'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 'MyEditor' };
    this.redirect = this.redirect.bind(this);
  }

  redirect(page) {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {/* <DocumentsPortal /> */}
        {this.state.currentPage === "MyEditor" ? <MyEditor /> : null}
      </div>);
  }
}
