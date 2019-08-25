import React from 'react';
import PropTypes from 'prop-types';

const RecruitingList = ({ resumes, handleView }) => {
  const mapResumes = resumes.map((resume, i) => (
    <div key={i} className={'matchingResume'}>
      <h2 onClick={() => handleView(resume)}>{resume.basics.name}</h2>
      <h3>{resume.basics.email}</h3>
      <h3>{resume.basics.phone}</h3>
    </div>
  ));
  return <>{mapResumes}</>;
};

RecruitingList.propTypes = {
  resumes: PropTypes.object,
  handleView: PropTypes.func,
};

export default RecruitingList;
