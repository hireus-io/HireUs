/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';

const RecruitingFocus = ({ focusResume }) => {
  const { basics, education, skills, work, volunteer } = focusResume;
  const mapBasics = () => (
    <div>
      <div>{basics.label}</div>
      <div>{basics.email}</div>
    </div>
  );

  const mapWorkExp = () => work.map(job => (
        <div>
            <div className="recruiter-focus-title">{job.company}</div>
            <div><i>{job.position}</i></div>
            {job.highlights.map(entry => <div> - {entry}</div>)}
        </div>
  ));
  const mapEducationExp = () => education.map(school => (
    <div>
      <div className="recruiter-focus-title">{school.institution} - {school.area}</div>
      <div><i>{school.studyType}</i></div>
      <div>{school.startDate} through {school.endDate}</div>
    </div>
  ));

  const mapVolunteerExp = () => volunteer.map(vol => (
    <div>
      <div>{vol.organization} - {vol.position}</div>
      <div>{vol.startDate}</div>
      <div>{vol.endDate}</div>
    </div>
  ))

  return (!Object.keys(focusResume).length) ? (
    null
  ) : (
  <div className="recruiter-focus">
    <div>
      <p className="recruiter-focus-header"><b>{basics.name}</b></p>
      {mapBasics()}
      <p className="recruiter-focus-header"><b>Work Experience</b></p>
      {mapWorkExp()}
      <p className="recruiter-focus-header"><b>Education</b></p>
      {mapEducationExp()}
      <p className="recruiter-focus-header"><b>Volunteer Experience</b></p>
      {mapVolunteerExp()}
    </div>
  </div>);
};

export default RecruitingFocus;
