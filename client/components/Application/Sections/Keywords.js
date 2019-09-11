import React from 'react';
import BasicInput from '../Inputs/BasicFormInput';

function Keywords() {
  return (
    <BasicInput info={{ name: 'keywords_keywords', displayName: 'Keywords', placeholder: 'Seperate by commas' }}/>
  );
}

export default Keywords;
