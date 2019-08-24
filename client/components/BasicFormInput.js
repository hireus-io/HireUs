import React from 'react';
import PropTypes from 'prop-types';


const BasicInput = ({ name }) => (
    <div className={'inputSection'}>
      <label htmlFor={name}>{name}</label>
      <input type={'text'} name={name}></input>
    </div>
);

BasicInput.propTypes = {
  name: PropTypes.string,
};

export default BasicInput;
