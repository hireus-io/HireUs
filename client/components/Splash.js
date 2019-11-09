import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Splash = ({ changePage, userLoggedIn }) => (
  <>
    <Header changePage={changePage} loggedIn={false} userLoggedIn={userLoggedIn} />
    <div className={'splash'}>
      <button onClick={() => changePage('create')}>Create A Resume</button>
      <button onClick={() => changePage('search')}>Search Resumes</button>
      <div className={'callToAction'}>{'Job searching  is horrible. But it doesn\'t have to be.'}</div>
    </div>
    <div className={'footer'}>
      <h4>Powered By Yuuvis</h4>
    </div>
  </>
);

Splash.propTypes = {
  changePage: PropTypes.func,
  userLoggedIn: PropTypes.bool,
};

export default Splash;
