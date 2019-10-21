import React from 'react';
import PropTypes from 'prop-types';

import BasicInput from './BasicFormInput';

const ComplexInput = ({ mainName, subInputs, index, resume, handleChange }) => (
    <>
      <span className={'inputSectionTitle'}>{mainName}</span>
      {subInputs.map((subInput, i) => (
        <BasicInput key={subInput.name + i} index={index} info={subInput} resume={resume} handleChange={handleChange} />
      ))}
    </>
);

ComplexInput.propTypes = {
  mainName: PropTypes.string,
  subInputs: PropTypes.array,
  index: PropTypes.number,
  resume: PropTypes.objectOf(PropTypes.object),
  handleChange: PropTypes.func,
};

export default ComplexInput;
