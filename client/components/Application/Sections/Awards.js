import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Awards() {
  return (
    <MultipleComplex mainName={'Awards'} subInputs={[
      {
        name: 'awards_title', schemaName: 'title', displayName: 'Title:', placeholder: '', parent: 'awards',
      },
      {
        name: 'awards_date', schemaName: 'date', displayName: 'Date:', placeholder: '', parent: 'awards',
      },
      {
        name: 'awards_awarder', schemaName: 'awarder', displayName: 'Awarder:', placeholder: '', parent: 'awards',
      },
      {
        name: 'awards_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'awards',
      },
    ]} />
  );
}

export default Awards;
