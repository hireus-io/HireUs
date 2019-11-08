import React, { Component, useState, useEffect } from 'react';
import Recruiting from './Recruiting';

import Splash from './Splash';
import ApplicantForm from './Application/ApplicantForm';
import resumeTemplate from '../resumeTemplate';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      resume: resumeTemplate.schema,
    };

    this.setPage = this.setPage.bind(this);
    this.setResume = this.setResume.bind(this);
  }
  setPage(page) {
    this.setState({ page });
  }

  setResume(resume) {
    this.setState({ resume });
  }

  render() {
    const { page, resume } = this.state;
    if (page === 'search') {
      return (
        <>
          <Recruiting changePage={this.setPage} />
        </>
      );
    }
    if (page === 'home') {
      return (
        <>
          <Splash changePage={this.setPage} />
        </>
      );
    } if (page === 'create') {
      return (
        <>
          <ApplicantForm changePage={this.setPage} resume={resume} setResume={this.setResume} />
        </>
      );
    }
    return <div>{'Whoops You Shoul\'nt Be Here'}</div>;
  }
}

export default App;
