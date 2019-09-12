import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Section from './Sections';

class ApplicantForm extends Component {
  constructor(props) {
    super(props);
  }

  handleChange({ section_subsection, value, index }) {
    const { resume } = this.props;
    const section = section_subsection.split('_')[0];
    const subsection = section_subsection.split('_')[1];
    const initializeObj = () => {
      if (!resume[section][index]) {
        for (let i = 0; i <= index; i += 1) {
          if (!resume[section][i]) {
            resume[section][i] = {};
          }
        }
      }
    };
    initializeObj();
    resume[section][index][subsection] = value;
    this.props.setResume(resume);
  }

  handleSubmit(e) {
    e.preventDefault();
    const myForm = new FormData(document.forms[0]);
    const newResumeJSON = JSON.parse(JSON.stringify(this.state.schema));

    const entries = [...myForm.entries()];
    let keywords = '';

    for (let i = 0; i < entries.length; i += 1) {
      const pair = entries[i];
      const schemaLoc = pair[0].split('_');
      if (schemaLoc[0] === 'basics') {
        newResumeJSON.basics[schemaLoc[1]] = pair[1];
      } else if (schemaLoc[0] === 'location') {
        newResumeJSON.basics.location[schemaLoc[1]] = pair[1];
      } else if (schemaLoc[0] === 'profiles') {
        const newProfile = {
          network: entries[i][1],
          username: entries[i + 1][1],
          url: entries[i + 2][1],
        };
        i += 2;
        newResumeJSON.basics.profiles.push(newProfile);
      } else if (schemaLoc[0] === 'work') {
        if (entries[i][1] && entries[i + 1][1] && entries[i + 2][1] && entries[i + 3][1] && entries[i + 4][1] && entries[i + 5][1] && entries[i + 6][1]) {
          const newWork = {
            company: entries[i][1],
            position: entries[i + 1][1],
            website: entries[i + 2][1],
            startDate: entries[i + 3][1] || '1900-01-01',
            endDate: entries[i + 4][1] || '1900-01-01',
            summary: entries[i + 5][1],
            highlights: [entries[i + 6][1]], // TODO this should be an array
          };
          newResumeJSON.work.push(newWork);
        }
        i += 6;
      } else if (schemaLoc[0] === 'volunteer') {
        if (entries[i][1] && entries[i + 1][1] && entries[i + 2][1] && entries[i + 3][1] && entries[i + 4][1] && entries[i + 5][1] && entries[i + 6][1]) {
          const newVolunteer = {
            organization: entries[i][1],
            position: entries[i + 1][1],
            website: entries[i + 2][1],
            startDate: entries[i + 3][1] || '1900-01-01',
            endDate: entries[i + 4][1] || '1900-01-01',
            summary: entries[i + 5][1],
            highlights: [entries[i + 6][1]], // TODO this should be an array
          };
          newResumeJSON.volunteer.push(newVolunteer);
        }
        i += 6;
      } else if (schemaLoc[0] === 'education') {
        if (entries[i][1] && entries[i + 1][1] && entries[i + 2][1] && entries[i + 3][1] && entries[i + 4][1] && entries[i + 5][1] && entries[i + 6][1]) {
          const newEducation = {
            institution: entries[i][1],
            area: entries[i + 1][1],
            studyType: entries[i + 2][1],
            startDate: entries[i + 3][1] || '1900-01-01',
            endDate: entries[i + 4][1] || '1900-01-01',
            gpa: entries[i + 5][1],
            courses: [entries[i + 6][1]], // TODO this should be an array
          };
          newResumeJSON.education.push(newEducation);
        }
        i += 6;
      } else if (schemaLoc[0] === 'awards') {
        if (entries[i][1] && entries[i + 1][1] && entries[i + 2][1] && entries[i + 3][1]) {
          const newAward = {
            title: entries[i][1],
            date: entries[i + 1][1] || '1900-01-01',
            awarder: entries[i + 2][1],
            summary: entries[i + 3][1],
          };
          newResumeJSON.awards.push(newAward);
        }
        i += 3;
      } else if (schemaLoc[0] === 'publications') {
        if (entries[i][1] && entries[i + 1][1] && entries[i + 2][1] && entries[i + 3][1] && entries[i + 4][1]) {
          const newPublication = {
            name: entries[i][1],
            publisher: entries[i + 1][1],
            releaseDate: entries[i + 2][1],
            website: entries[i + 3][1],
            summary: entries[i + 4][1],
          };
          newResumeJSON.publications.push(newPublication);
        }
        i += 4;
      } else if (schemaLoc[0] === 'skills') {
        if (entries[i][1] && entries[i + 1][1] && entries[i + 2][1]) {
          const newSkill = {
            name: entries[i][1],
            level: entries[i + 1][1],
            keywords: [entries[i + 2][1]], // TODO this should be an array
          };
          newResumeJSON.skills.push(newSkill);
          i += 2;
        }
      } else if (schemaLoc[0] === 'languages') {
        if (entries[i][1] && entries[i + 1][1]) {
          const newLanguage = {
            language: entries[i][1],
            fluency: entries[i + 1][1],
          };
          newResumeJSON.languages.push(newLanguage);
        }
        i += 1;
      } else if (schemaLoc[0] === 'interests') {
        if (entries[i][1] && entries[i + 1][1]) {
          const newInterest = {
            name: entries[i][1],
            keywords: [entries[i + 1][1]], // TOOD this should be an array
          };
          newResumeJSON.interests.push(newInterest);
        }
        i += 1;
      } else if (schemaLoc[0] === 'references') {
        if (entries[i][1] && entries[i + 1][1]) {
          const newReference = {
            name: entries[i][1],
            reference: entries[i + 1][1],
          };
          newResumeJSON.references.push(newReference);
        }
        i += 1;
      } else if (schemaLoc[0] === 'keywords') {
        keywords = pair[1];
      }
    }

    Axios.post('/api/resume', {
      email: newResumeJSON.basics.email,
      resume: newResumeJSON,
      keywords,
      responseType: 'blob',
    })
      .then(() => {
        window.open('/api/download/resume');
      });
  }

  render() {
    // const line = (this.props.resume["work"][0]) ? this.props.resume["work"][0]["company"] : 'none';
    return (
      <>
        <header className={'header'}>
          <h1 onClick={() => this.props.changePage('home')}>Build Your Resume</h1>
        </header>
        <form id={'applicantForm'}>
          {/* <Section.Basics handleChange={this.handleChange.bind(this)} resume={this.props.resume}/> */}
          <Section.Work handleChange={this.handleChange.bind(this)} resume={this.props.resume}/>
          {/* <Section.Education />
          <Section.Volunteer />
          <Section.Interests />
          <Section.Keywords /> */}
          <input className={'formSubmit'} type={'submit'} onClick={this.handleSubmit.bind(this)}></input>
        </form>
      </>
    );
  }
}

ApplicantForm.propTypes = {
  changePage: PropTypes.func,
  setResume: PropTypes.func,
  resume: PropTypes.objectOf(PropTypes.object),
};


export default ApplicantForm;
