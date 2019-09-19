import React from 'react';
import BasicInput from '../Inputs/BasicFormInput';

function Keywords({ resume, handleChange }) {
  return (
    <BasicInput
      resume={resume}
      handleChange={handleChange}
      info={{ name: 'keywords_keywords', displayName: 'Keywords', placeholder: 'Seperate by commas' }}/>
  );
}

export default Keywords;
