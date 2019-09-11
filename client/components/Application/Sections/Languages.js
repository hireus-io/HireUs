import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Languages() {
  return (
    <MultipleComplex mainName={'Languages'} subInputs={[
      {
        name: 'languages_language', schemaName: 'language', displayName: 'Language:', placeholder: '', parent: 'languages',
      },
      {
        name: 'languages_fluency', schemaName: 'fluency', displayName: 'Fluency:', placeholder: '', parent: 'languages',
      },
    ]} />
  );
}

export default Languages;
