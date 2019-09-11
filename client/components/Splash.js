import React from 'react';
import PropTypes from 'prop-types';

const Splash = ({ changePage }) => (
  <>
    <div className={'header'}>
      <h1>Hire US</h1>
    </div>
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
};

export default Splash;
