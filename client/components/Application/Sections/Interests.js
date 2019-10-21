import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Interests({resume, handleChange}) {
  return (
    <MultipleComplex
      mainName={'Other Interests'}
      resume={resume}
      handleChange={handleChange}
      subInputs={[
      {
        name: 'interests_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'interests',
      },
      {
        name: 'interests_keywords', schemaName: 'keywords', displayName: 'Keywords:', placeholder: '', parent: 'interests',
      },
    ]} />
  );
}

export default Interests;
