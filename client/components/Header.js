import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ loggedIn, changePage }) => (
  <header className={'header'}>
    <h1 onClick={() => changePage('home')}>Hire US</h1>
    {loggedIn ? <a href="/auth/logout">Log Out</a> : <a href="/auth/linkedin">Log In</a>}
  </header>
);

Header.propTypes = {
  changePage: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
