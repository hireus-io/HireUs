import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function References({resume, handleChange}) {
  return (
    <MultipleComplex
      mainName={'References'}
      resume={resume}
      handleChange={handleChange}
      subInputs={[
      {
        name: 'references_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'references',
      },
      {
        name: 'references_reference', schemaName: 'reference', displayName: 'Contact Info:', placeholder: '', parent: 'references',
      },
    ]} />
  );
}

export default References;
