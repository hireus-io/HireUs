import axios from 'axios';

import React from 'react';
import mapper from './mapper';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.resume);
    this.state = {
      resume: props.resume,
    }

    this.openResume = this.openResume.bind(this);
  }

  openResume() {
    const { resume } = this.state;
    const stringResume = JSON.stringify(resume);
    const encodedResume = btoa(stringResume);
    // axios.post('/api/resume/download', {
    //   email: resume.basics.email,
    //   resume,
    //   keywords: resume.keywords,
    //   responseType: 'blob',
    // })
    //   .then((response) => {
    //     console.log('Resume stream: ', response);
    //     // var file = new Blob([response.data], { type: 'application/octet-stream' });
    //     // var fileURL = URL.createObjectURL(file);
    //     // window.open(fileURL);
    //     window.open('/api/resume/download')
    //     // window.open(`data:application/octet-stream,${encodeURIComponent(response.data)}`, '_blank');
    //   });
    window.open(`/api/resume/download?r=${encodedResume}`);
  }
  mapResume() {
    let mapped = [];
    const { resume } = this.state;
    const keys = Object.keys(resume);
    mapped = keys.map((key) => {
      return mapper(resume[key], key);
    });
    console.log(mapped);
    return mapped;
  }

  render() {
    return (
      <>
        <div>{this.mapResume()}</div>
        <button onClick={this.openResume}>Open Resume As PDF</button>
      </>
    );
  }
}

export default Generate;
