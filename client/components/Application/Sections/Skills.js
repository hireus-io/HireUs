import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Skills({handleChange, resume}) {
  return (
    <MultipleComplex
      mainName={'Skills'}
      resume={resume}
      handleChange={handleChange}
      subInputs={[
      {
        name: 'skills_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'skills',
      },
      {
        name: 'skills_level', schemaName: 'level', displayName: 'Level:', placeholder: '', parent: 'skills',
      },
      {
        name: 'skills_keywords', schemaName: 'keywords', displayName: 'Keywords:', placeholder: '', parent: 'skills',
      },
    ]} />
  );
}

export default Skills;
