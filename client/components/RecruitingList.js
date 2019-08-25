import React from 'react';

const RecruitingList = ({ resumes, handleView }) => {
  const mapResumes = resumes.map(resume => (
    <>
    <h2 onClick={() => handleView(resume)}>{resume.basics.name}</h2>
    <h3>{resume.basics.email}</h3>
    <h3>{resume.basics.phone}</h3>
    </>
  ));
  return <div>{mapResumes}</div>;
}
export default RecruitingList;
