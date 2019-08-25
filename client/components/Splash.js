import React from 'react';
import PropTypes from 'prop-types';

const Splash = ({ changePage }) => (
    <div className={'splash'}>
      <div className={'splashLeft'}>
        <div className={'splashItem'} onClick={e => changePage(e, 'create')}>Create A Resume</div>
      </div>
      <div className={'splashRight'}>
        <div className={'splashItem'} onClick={e => changePage(e, 'search')}>Search Resumes</div>
      </div>
    </div>
);

Splash.propTypes = {
  changePage: PropTypes.func,
};

export default Splash;
