import React, { Component, useState } from 'react';
import Recruiting from './Recruiting';

import Splash from './Splash';
import ApplicantForm from './Application/ApplicantFormTwo';
import resumeTemplate from '../resumeTemplate';


function App() {
  const [page, setPage] = useState('home');
  const [resume, setResume] = useState(resumeTemplate);

  if (page === 'search') {
    return (
      <>
        <Recruiting changePage={setPage}/>
      </>
    );
  }
  if (page === 'home') {
    return (
      <>
        <Splash changePage={setPage} />
      </>
    );
  } if (page === 'create') {
    return (
      <>
        <ApplicantForm changePage={setPage} resume={resume} setResume={setResume}/>
      </>
    );
  }
  return <div>{'Whoops You Shoul\'nt Be Here'}</div>;
}

export default App;
