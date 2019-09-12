import React from 'react';
import PropTypes from 'prop-types';


const BasicInput = ({ info, index, resume, handleChange }) => {
  const section = info.name.split('_')[0];
  const subSection = info.name.split('_')[1];

  // If a user has started typing, the value will reflect state. If not it will be undefined, so show '' instead
  const value = (resume[section][index]) ? resume[section][index][subSection] : '';
  return (
    <div className={'inputSection'}>
      <label className={'label'} htmlFor={info.name}>{info.displayName}</label>
      <input
        className={'input'}
        type={'text'}
        name={info.name}
        placeholder={info.placeholder}
        value={value}
        onChange={(e) => handleChange({section_subsection: info.name, display: info.displayName, value: e.target.value, index})}>
      </input>
    </div>
  );
};

BasicInput.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  index: PropTypes.number,
  resume: PropTypes.objectOf(PropTypes.object),
  handleChange: PropTypes.func,
};

export default BasicInput;
