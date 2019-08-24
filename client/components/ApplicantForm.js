import React, { Component } from 'react';

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
        const newWork = {
          company: entries[i][1],
          position: entries[i + 1][1],
          website: entries[i + 2][1],
          startDate: entries[i + 3][1],
          endDate: entries[i + 4][1],
          summary: entries[i + 5][1],
          highlights: entries[i + 6][1], // TODO this should be an array
        };
        i += 6;
        newResumeJSON.work.push(newWork);
      } else if (schemaLoc[0] === 'volunteer') {
        const newVolunteer = {
          organization: entries[i][1],
          position: entries[i + 1][1],
          website: entries[i + 2][1],
          startDate: entries[i + 3][1],
          endDate: entries[i + 4][1],
          summary: entries[i + 5][1],
          highlights: entries[i + 6][1], // TODO this should be an array
        };
        i += 6;
        newResumeJSON.volunteer.push(newVolunteer);
      } else if (schemaLoc[0] === 'education') {
        const newEducation = {
          institution: entries[i][1],
          area: entries[i + 1][1],
          studyType: entries[i + 2][1],
          startDate: entries[i + 3][1],
          endDate: entries[i + 4][1],
          gpa: entries[i + 5][1],
          courses: entries[i + 6][1], // TODO this should be an array
        };
        i += 6;
        newResumeJSON.education.push(newEducation);
      } else if (schemaLoc[0] === 'awards') {
        const newAward = {
          title: entries[i][1],
          date: entries[i + 1][1],
          awarder: entries[i + 2][1],
          summary: entries[i + 3][1],
        };
        i += 3;
        newResumeJSON.awards.push(newAward);
      } else if (schemaLoc[0] === 'publications') {
        const newPublication = {
          name: entries[i][1],
          publisher: entries[i + 1][1],
          releaseDate: entries[i + 2][1],
          website: entries[i + 3][1],
          summary: entries[i + 4][1],
        };
        i += 4;
        newResumeJSON.publications.push(newPublication);
      } else if (schemaLoc[0] === 'skills') {
        const newSkill = {
          name: entries[i][1],
          level: entries[i + 1][1],
          keywords: entries[i + 2][1], // TODO this should be an array
        };
        i += 2;
        newResumeJSON.skills.push(newSkill);
      } else if (schemaLoc[0] === 'languages') {
        const newLanguage = {
          language: entries[i][1],
          fluency: entries[i + 1][1],
        };
        i += 1;
        newResumeJSON.languages.push(newLanguage);
      } else if (schemaLoc[0] === 'interests') {
        const newInterest = {
          name: entries[i][1],
          keywords: entries[i + 1][1], // TOOD this should be an array
        };
        i += 1;
        newResumeJSON.interests.push(newInterest);
      } else if (schemaLoc[0] === 'references') {
        const newReference = {
          name: entries[i][1],
          reference: entries[i + 1][1],
        };
        i += 1;
        newResumeJSON.references.push(newReference);
      }
    }
    console.log(newResumeJSON);
  }

  render() {
    return (
      <>
        <form id={'applicantForm'}>
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
          <ComplexInput mainName={'location'} subInputs={[
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
          <MultipleComplex mainName={'Social'} subInputs={[
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
          <MultipleComplex mainName={'work'} subInputs={[
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
          <MultipleComplex mainName={'volunteer'} subInputs={[
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
          <MultipleComplex mainName={'education'} subInputs={[
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
          <MultipleComplex mainName={'awards'} subInputs={[
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
          <MultipleComplex mainName={'publications'} subInputs={[
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
          <MultipleComplex mainName={'skills'} subInputs={[
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
          <MultipleComplex mainName={'languages'} subInputs={[
            {
              name: 'languages_language', schemaName: 'language', displayName: 'Language:', placeholder: '', parent: 'languages',
            },
            {
              name: 'languages_fluency', schemaName: 'fluency', displayName: 'Fluency:', placeholder: '', parent: 'languages',
            },
          ]} />
          <MultipleComplex mainName={'interests'} subInputs={[
            {
              name: 'interests_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'interests',
            },
            {
              name: 'interests_keywords', schemaName: 'keywords', displayName: 'Keywords:', placeholder: '', parent: 'interests',
            },
          ]} />
          <MultipleComplex mainName={'references'} subInputs={[
            {
              name: 'references_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'references',
            },
            {
              name: 'references_reference', schemaName: 'reference', displayName: 'Contact Info:', placeholder: '', parent: 'references',
            },
          ]} />
          <input type={'submit'} onClick={this.handleSubmit.bind(this)}></input>
        </form>
      </>
    );
  }
}

export default ApplicantForm;
