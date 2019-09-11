import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Work() {
  return (
    <MultipleComplex mainName={'Work Experience'} subInputs={[
      {
        name: 'work_company', schemaName: 'company', displayName: 'Company:', placeholder: '', parent: 'work',
      },
      {
        name: 'work_position', schemaName: 'position', displayName: 'Position:', placeholder: '', parent: 'work',
      },
      {
        name: 'work_website', schemaName: 'website', displayName: 'Website:', placeholder: '', parent: 'work',
      },
      {
        name: 'work_startDate', schemaName: 'startDate', displayName: 'Start Date:', placeholder: '', parent: 'work',
      },
      {
        name: 'work_endDate', schemaName: 'endDate', displayName: 'End Date:', placeholder: '', parent: 'work',
      },
      {
        name: 'work_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'work',
      },
      {
        name: 'work_highlights', schemaName: 'highlights', displayName: 'Hightlights:', placeholder: '', parent: 'work',
      },
    ]} />
  );
}

export default Work;
