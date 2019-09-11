import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function References() {
  return (
    <MultipleComplex mainName={'References'} subInputs={[
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
