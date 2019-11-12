import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Recruiting from './Recruiting';

import Splash from './Splash';
import ApplicantForm from './Application/ApplicantForm';
import Generate from './Generate/Generate';
import resumeTemplate from '../resumeTemplate';
import Header from './Header';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      resume: resumeTemplate.schema,
      loggedIn: false,
    };

    this.setPage = this.setPage.bind(this);
    this.setResume = this.setResume.bind(this);
  }

  componentDidMount() {
    axios.get('/auth/user')
      .then((user) => {
        this.setState({ loggedIn: user.data.isLoggedIn });
      })
      .catch(err => console.log(err));
  }

  setPage(page) {
    if (page !== 'home') {
      axios.get('/auth/user')
        .then((user) => {
          if (user.data.isLoggedIn) {
            this.setState({ page });
          } else {
            const message = document.getElementById('errLogin');
            message.style.visibility = 'visible';
          }
        });
    } else {
      this.setState({ page });
    }
  }

  setResume(resume) {
    this.setState({ resume });
  }

  render() {
    const { page, resume } = this.state;
    if (page === 'search') {
      return (
        <>
          <Header changePage={this.setPage} loggedIn={this.state.loggedIn} logout={this.logout} />
          <Recruiting />
        </>
      );
    }
    if (page === 'home') {
      return (
        <>
          <Header changePage={this.setPage} loggedIn={this.state.loggedIn} logout={this.logout} />
          <Splash changePage={this.setPage} />
        </>
      );
    }
    if (page === 'create') {
      return (
        <>
          <Header changePage={this.setPage} loggedIn={this.state.loggedIn} logout={this.logout} />
          <ApplicantForm resume={resume} setResume={this.setResume} changePage={this.setPage}/>
        </>
      );
    }
    if (page === 'generate') {
      return (
        <>
          <Generate changePage={this.setPage} resume={resume} />
        </>
      );
    }
    return <div>{'Whoops You Shoul\'nt Be Here'}</div>;
  }
}

export default App;
