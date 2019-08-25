import React, { Component } from 'react';
import resume from './resume.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
      <style>{`
        input {display: inline}
      `}
      </style>
      <div>
<pre>{`  "basics": {
    "name": `}<input type="text" placeholder="John Doe"/>{`
    "label": <span>"Programmer",</span>
    "picture": <span>"",</span>
    "email": <span>"john@gmail.com",</span>
    "phone": <span>"(912) 555-4321",</span>
    "website": <span>"http://johndoe.com",</span>
    "summary": <span>"A summary of John Doe...",</span>
    "location": {
      "address": <span>"2712 Broadway St",</span>
      "postalCode": <span>"CA 94115",</span>
      "city": <span>"San Francisco",</span>
      "countryCode": <span>"US",</span>
      "region": <span>"California"</span>
    },
    "profiles": [{
      "network": <span>"Twitter",</span>
      "username": <span>"john",</span>
      "url": <span>"http://twitter.com/john"</span>
    }]
  }, 
  "work": [{
    "company": <span>"Company",</span>
    "position": <span>"President",</span>
    "website": <span>"http://company.com",</span>
    "startDate": <span>"2013-01-01",</span>
    "endDate": <span>"2014-01-01",</span>
    "summary": <span>"Description...",</span>
    "highlights": [
      <span>"Started the company"</span>
    ]
  }],
  "volunteer": [{
    "organization": <span>"Organization",</span>
    "position": <span>"Volunteer",</span>
    "website": <span>"http://organization.com/",</span>
    "startDate": <span>"2012-01-01",</span>
    "endDate": <span>"2013-01-01",</span>
    "summary": <span>"Description...",</span>
    "highlights": [
      <span>"Awarded 'Volunteer of the Month'"</span>
    ]
  }],
  "education": [{
    "institution": <span>"University",</span>
    "area": <span>"Software Development",</span>
    "studyType": <span>"Bachelor",</span>
    "startDate": <span>"2011-01-01",</span>
    "endDate": <span>"2013-01-01",</span>
    "gpa": <span>"4.0",</span>
    "courses": [
      <span>"DB1101 - Basic SQL"</span>
    ]
  }],
  "awards": [{
    "title": <span>"Award",</span>
    "date": <span>"2014-11-01",</span>
    "awarder": <span>"Company",</span>
    "summary": <span>"There is no spoon."</span>
  }],
  "publications": [{
    "name": <span>"Publication",</span>
    "publisher": <span>"Company",</span>
    "releaseDate": <span>"2014-10-01",</span>
    "website": <span>"http://publication.com",</span>
    "summary": <span>"Description..."</span>
  }],
  "skills": [{
    "name": <span>"Web Development",</span>
    "level": <span>"Master",</span>
    "keywords": [
      <span>"HTML",</span>
      <span>"CSS",</span>
      <span>"Javascript"</span>
    ]
  }],
  "languages": [{
    "language": <span>"English",</span>
    "fluency": <span>"Native speaker"</span>
  }],
  "interests": [{
    "name": <span>"Wildlife",</span>
    "keywords": [
      <span>"Ferrets",</span>
      <span>"Unicorns"</span>
    ]
  }],
  "references": [{
    "name": <span>"Jane Doe",</span>
    "reference": <span>"Reference..."</span>
  }]
`}
</pre>
</div>
      </>
    )
  }
}

export default App;
