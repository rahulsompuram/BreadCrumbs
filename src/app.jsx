import React from 'react';
import MyEditor from './components/MyEditor'

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
        {this.state.currentPage === "MyEditor" ? <MyEditor /> : null}
      </div>);
  }
}
