import React, { Component } from 'react';

import Splash from './Splash';
import ApplicantForm from './ApplicantForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home',
    };
  }

  changePage(e, currentPage) {
    e.preventDefault();
    this.setState({ currentPage });
  }

  render() {
    if (this.state.currentPage === 'home') {
      return (
        <>
          <Splash changePage={this.changePage.bind(this)} />
        </>
      );
    } if (this.state.currentPage === 'create') {
      return (
        <>
          <ApplicantForm />
        </>
      );
    }
    return <div>{'Whoops You Shoul\'nt Be Here'}</div>;
  }
}

export default App;
