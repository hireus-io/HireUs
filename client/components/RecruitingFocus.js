import React from 'react';
import PropTypes from 'prop-types';

const RecruitingFocus = ({ focusResume }) => {
  const {
    basics, education, skills, work,
  } = focusResume;
  return (!Object.keys(focusResume).length) ? (
    null
  ) : (
  <div className={'selectedResume'}>
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
  </div>);
};

RecruitingFocus.propTypes = {
  focusResume: PropTypes.func,
};

export default RecruitingFocus;
