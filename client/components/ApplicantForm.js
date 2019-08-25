import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import BasicInput from './BasicFormInput';
import ComplexInput from './ComplexFormInput';
import MultipleComplex from './MultipleComplexInput';

class ApplicantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: {
        basics: {
          name: '',
          label: '',
          picture: '',
          email: '',
          phone: '',
          website: '',
          summary: '',
          location: {
            address: '',
            postalCode: '',
            city: '',
            countryCode: '',
            region: '',
          },
          profiles: [],
        },
        work: [],
        volunteer: [],
        education: [],
        awards: [],
        publications: [],
        skills: [],
        languages: [],
        interests: [],
        references: [],
      },
    };
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
        window.open('/api/resume');
      });
  }

  render() {
    return (
      <>
        <header className={'header'}>
          <h1>Build Your Resume</h1>
        </header>
        <form id={'applicantForm'}>
          <span className={'inputSectionTitle'}>{'Basic Information'}</span>
          <BasicInput info={{
            name: 'basics_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'basics',
          }} />
          <BasicInput info={{
            name: 'basics_label', schemaName: 'label', displayName: 'Job Title:', placeholder: '', parent: 'basics',
          }} />
          <BasicInput info={{
            name: 'basics_picture', schemaName: 'picture', displayName: 'Picture:', placeholder: '', parent: 'basics',
          }} />
          <BasicInput info={{
            name: 'basics_email', schemaName: 'email', displayName: 'Email:', placeholder: '', parent: 'basics',
          }} />
          <BasicInput info={{
            name: 'basics_phone', schemaName: 'phone', displayName: 'Phone Number:', placeholder: '', parent: 'basics',
          }} />
          <BasicInput info={{
            name: 'basics_website', schemaName: 'website', displayName: 'Personal Website:', placeholder: '', parent: 'basics',
          }} />
          <BasicInput info={{
            name: 'basics_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'basics',
          }} />
          <ComplexInput mainName={'Location'} subInputs={[
            {
              name: 'location_address', schemaName: 'address', displayName: 'Address:', placeholder: '', parent: 'location',
            },
            {
              name: 'location_postalCode', schemaName: 'postalCode', displayName: 'Zipcode:', placeholder: '', parent: 'location',
            },
            {
              name: 'location_city', schemaName: 'city', displayName: 'City:', placeholder: '', parent: 'location',
            },
            {
              name: 'location_countryCode', schemaName: 'countryCode', displayName: 'Country:', placeholder: '', parent: 'location',
            },
            {
              name: 'location_region', schemaName: 'region', displayName: 'State:', placeholder: '', parent: 'location',
            },
          ]} />
          <MultipleComplex mainName={'Social Links'} subInputs={[
            {
              name: 'profiles_network', schemaName: 'network', displayName: 'Network:', placeholder: '', parent: 'profiles',
            },
            {
              name: 'profiles_username', schemaName: 'username', displayName: 'Username:', placeholder: '', parent: 'profiles',
            },
            {
              name: 'profiles_url', schemaName: 'url', displayName: 'Link:', placeholder: '', parent: 'profiles',
            },
          ]}/>
          <MultipleComplex mainName={'Work Experience'} subInputs={[
            {
              name: 'work_company', schemaName: 'company', displayName: 'Company:', placeholder: '', parent: 'work',
            },
            {
              name: 'work_position', schemaName: 'position', displayName: 'Position:', placeholder: '', parent: 'work',
            },
            {
              name: 'work_website', schemaName: 'website', displayName: 'Website:', placeholder: '', parent: 'work',
            },
            {
              name: 'work_startDate', schemaName: 'startDate', displayName: 'Start Date:', placeholder: '', parent: 'work',
            },
            {
              name: 'work_endDate', schemaName: 'endDate', displayName: 'End Date:', placeholder: '', parent: 'work',
            },
            {
              name: 'work_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'work',
            },
            {
              name: 'work_highlights', schemaName: 'highlights', displayName: 'Hightlights:', placeholder: '', parent: 'work',
            },
          ]} />
          <MultipleComplex mainName={'Volunteer Experience'} subInputs={[
            {
              name: 'volunteer_organization', schemaName: 'organization', displayName: 'Organization:', placeholder: '', parent: 'volunteer',
            },
            {
              name: 'volunteer_position', schemaName: 'position', displayName: 'Position:', placeholder: '', parent: 'volunteer',
            },
            {
              name: 'volunteer_website', schemaName: 'website', displayName: 'Website:', placeholder: '', parent: 'volunteer',
            },
            {
              name: 'volunteer_startDate', schemaName: 'startDate', displayName: 'Start Date:', placeholder: '', parent: 'volunteer',
            },
            {
              name: 'volunteer_endDate', schemaName: 'endDate', displayName: 'End Date:', placeholder: '', parent: 'volunteer',
            },
            {
              name: 'volunteer_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'volunteer',
            },
            {
              name: 'volunteer_highlights', schemaName: 'highlights', displayName: 'Highlights:', placeholder: '', parent: 'volunteer',
            },
          ]} />
          <MultipleComplex mainName={'Education'} subInputs={[
            {
              name: 'education_institution', schemaName: 'institution', displayName: 'Institution:', placeholder: '', parent: 'education',
            },
            {
              name: 'education_area', schemaName: 'area', displayName: 'Area of Learning:', placeholder: '', parent: 'education',
            },
            {
              name: 'education_studyType', schemaName: 'studyType', displayName: 'Education Level:', placeholder: '', parent: 'education',
            },
            {
              name: 'education_startDate', schemaName: 'startDate', displayName: 'Start Date:', placeholder: '', parent: 'education',
            },
            {
              name: 'education_endDate', schemaName: 'endDate', displayName: 'End Date:', placeholder: '', parent: 'education',
            },
            {
              name: 'education_gpa', schemaName: 'gpa', displayName: 'GPA:', placeholder: '', parent: 'education',
            },
            {
              name: 'education_courses', schemaName: 'courses', displayName: 'Courses:', placeholder: '', parent: 'education',
            },
          ]} />
          <MultipleComplex mainName={'Awards'} subInputs={[
            {
              name: 'awards_title', schemaName: 'title', displayName: 'Title:', placeholder: '', parent: 'awards',
            },
            {
              name: 'awards_date', schemaName: 'date', displayName: 'Date:', placeholder: '', parent: 'awards',
            },
            {
              name: 'awards_awarder', schemaName: 'awarder', displayName: 'Awarder:', placeholder: '', parent: 'awards',
            },
            {
              name: 'awards_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'awards',
            },
          ]} />
          <MultipleComplex mainName={'Published Work'} subInputs={[
            {
              name: 'publications_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'publications',
            },
            {
              name: 'publications_publisher', schemaName: 'publisher', displayName: 'Publisher:', placeholder: '', parent: 'publications',
            },
            {
              name: 'publications_releaseDate', schemaName: 'releaseDate', displayName: 'Release Date:', placeholder: '', parent: 'publications',
            },
            {
              name: 'publications_website', schemaName: 'website', displayName: 'Website:', placeholder: '', parent: 'publications',
            },
            {
              name: 'publications_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'publications',
            },
          ]} />
          <MultipleComplex mainName={'Skills'} subInputs={[
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
          <MultipleComplex mainName={'Languages'} subInputs={[
            {
              name: 'languages_language', schemaName: 'language', displayName: 'Language:', placeholder: '', parent: 'languages',
            },
            {
              name: 'languages_fluency', schemaName: 'fluency', displayName: 'Fluency:', placeholder: '', parent: 'languages',
            },
          ]} />
          <MultipleComplex mainName={'Other Interests'} subInputs={[
            {
              name: 'interests_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'interests',
            },
            {
              name: 'interests_keywords', schemaName: 'keywords', displayName: 'Keywords:', placeholder: '', parent: 'interests',
            },
          ]} />
          <MultipleComplex mainName={'References'} subInputs={[
            {
              name: 'references_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'references',
            },
            {
              name: 'references_reference', schemaName: 'reference', displayName: 'Contact Info:', placeholder: '', parent: 'references',
            },
          ]} />
          <BasicInput info={{ name: 'keywords_keywords', displayName: 'Keywords', placeholder: 'Seperate by commas' }}/>
          <input className={'formSubmit'} type={'submit'} onClick={this.handleSubmit.bind(this)}></input>
        </form>
      </>
    );
  }
}

ApplicantForm.propTypes = {
  changePage: PropTypes.func,
};


export default ApplicantForm;
