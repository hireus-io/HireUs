import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Education() {
  return (
    <MultipleComplex mainName={'Education'} subInputs={[
      {
        name: 'education_institution', schemaName: 'institution', displayName: 'Institution:', placeholder: '', parent: 'education',
      },
      {
        name: 'education_area', schemaName: 'area', displayName: 'Area of Learning:', placeholder: '', parent: 'education',
      },
      {
        name: 'education_studyType', schemaName: 'studyType', displayName: 'Education Level:', placeholder: '', parent: 'education',
      },
      {
        name: 'education_startDate', schemaName: 'startDate', displayName: 'Start Date:', placeholder: '', parent: 'education',
      },
      {
        name: 'education_endDate', schemaName: 'endDate', displayName: 'End Date:', placeholder: '', parent: 'education',
      },
      {
        name: 'education_gpa', schemaName: 'gpa', displayName: 'GPA:', placeholder: '', parent: 'education',
      },
      {
        name: 'education_courses', schemaName: 'courses', displayName: 'Courses:', placeholder: '', parent: 'education',
      },
    ]} />
  );
}

export default Education;
