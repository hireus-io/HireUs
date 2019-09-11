import React from 'react';
import PropTypes from 'prop-types';


const BasicInput = ({ info }) => (
    <div className={'inputSection'}>
      <label className={'label'} htmlFor={info.name}>{info.displayName}</label>
      <input className={'input'} type={'text'} name={info.name} placeholder={info.placeholder}></input>
    </div>
);

BasicInput.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

export default BasicInput;
