import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Section from './Sections';
import { setResumeData } from './helperFunctions';
import Form from './Form';

class ApplicantForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRender = this.handleRender.bind(this);
  }

  handleChange({ section_subsection, value, index = 0 }) {
    const { resume } = this.props;
    const section = section_subsection.split('_')[0];
    const subsection = section_subsection.split('_')[1];
    const newResume = setResumeData(resume, section, subsection, index, value);

    this.props.setResume(newResume);
  }

  componentDidMount() {
    axios.get('/api/resume')
      .then((response) => {
        console.log(response);
        if (Object.keys(response.data)) {
          this.props.setResume(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resume } = this.props;

    axios.post('/api/resume', {
      email: resume.basics.email,
      resume,
      keywords: resume.keywords,
      responseType: 'blob',
    });
  }

  handleRender(e) {
    e.preventDefault();
    const { resume } = this.props;
    const stringResume = JSON.stringify(resume);
    const encodedResume = btoa(stringResume);

    window.open(`/api/resume/download?r=${encodedResume}`);
  }

  render() {
    return (
      <>
        <Form handleChange={this.handleChange} resume={this.props.resume} >
          <Section.Basics />
          <Section.Skills />
          <Section.Work />
          <Section.Education />
          <Section.Volunteer />
          <Section.Interests />
          <Section.Keywords />
          <input className={'formSubmit'} type={'submit'} onClick={this.handleSubmit.bind(this)}></input>
          <button onClick={this.handleRender}>Render</button>
        </Form>
      </>
    );
  }
}

ApplicantForm.propTypes = {
  setResume: PropTypes.func,
  resume: PropTypes.objectOf(PropTypes.object),
  changePage: PropTypes.func.isRequired,
};


export default ApplicantForm;
