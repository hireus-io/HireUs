import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Languages({resume, handleChange}) {
  return (
    <MultipleComplex
      mainName={'Languages'}
      resume={resume}
      handleChange={handleChange}
      subInputs={[
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
