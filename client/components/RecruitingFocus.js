import React from 'react';

const RecruitingFocus = ({ focusResume }) => {
  const { basics, education, skills, work } = focusResume;
  return (!Object.keys(focusResume).length) ? (
    null
  ) : (
  <div>
    <div>
      <div>{basics.name}</div>
      <div>{basics.label}</div>
      <div>{basics.email}</div>
    </div>
    <div>
      <div>{work[0].company}</div>
      <div>{work[0].position}</div>
      <div>{work[0].highlights[0]}</div>
    </div>
  </div>)
}

export default RecruitingFocus;