import React from 'react';
import PropTypes from 'prop-types';

import BasicInput from './BasicFormInput';

const ComplexInput = ({ mainName, subInputs }) => (
    <>
      <span>{mainName}</span>
      {subInputs.map((subInput, i) => (
        <BasicInput key={subInput.name + i} info={subInput} />
      ))}
    </>
);

ComplexInput.propTypes = {
  mainName: PropTypes.string,
  subInputs: PropTypes.array,
};

export default ComplexInput;
