import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Volunteer() {
  return (
    <MultipleComplex mainName={'Volunteer Experience'} subInputs={[
      {
        name: 'volunteer_organization', schemaName: 'organization', displayName: 'Organization:', placeholder: '', parent: 'volunteer',
      },
      {
        name: 'volunteer_position', schemaName: 'position', displayName: 'Position:', placeholder: '', parent: 'volunteer',
      },
      {
        name: 'volunteer_website', schemaName: 'website', displayName: 'Website:', placeholder: '', parent: 'volunteer',
      },
      {
        name: 'volunteer_startDate', schemaName: 'startDate', displayName: 'Start Date:', placeholder: '', parent: 'volunteer',
      },
      {
        name: 'volunteer_endDate', schemaName: 'endDate', displayName: 'End Date:', placeholder: '', parent: 'volunteer',
      },
      {
        name: 'volunteer_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'volunteer',
      },
      {
        name: 'volunteer_highlights', schemaName: 'highlights', displayName: 'Highlights:', placeholder: '', parent: 'volunteer',
      },
    ]} />
  ); 
}

export default Volunteer;
