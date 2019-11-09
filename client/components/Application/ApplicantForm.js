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
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resume } = this.props;

    axios.post('/api/resume', {
      email: resume.basics.email,
      resume,
      keywords: resume.keywords,
      responseType: 'blob',
    })
      .then((response) => {
        console.log(response);
        window.open('/api/download/resume');
      });
  }

  render() {
    return (
      <>
        <header className={'header'}>
          <h1 onClick={() => this.props.changePage('home')}>Build Your Resume</h1>
        </header>
        <Form handleChange={this.handleChange} resume={this.props.resume} >
          <Section.Basics />
          <Section.Work />
          <Section.Education />
          <Section.Volunteer />
          <Section.Interests />
          <Section.Keywords />
          <input className={'formSubmit'} type={'submit'} onClick={this.handleSubmit.bind(this)}></input>
        </Form>
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
