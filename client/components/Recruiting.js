import React from 'react';
import RecruitingFocus from './RecruitingFocus';
const axios = require('axios');

class Recruiting extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '',
      searchProps: [], 
      matchingResumes: [],
      currentResume: {}
    },

    this.handleChange = this.handleChange.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemoveSkill = this.handleRemoveSkill.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleChange (e) {
    // update text state
    this.setState({text: e.target.value});
  }

  handleAddSkill (e) {
    e.preventDefault();
    if(this.state.text.length === 0){
      return;
    }
    // push text to search props
    let newProperty = this.state.text;
    let newSearchProps = this.state.searchProps;
    newSearchProps.push(newProperty);
    this.setState({searchProps: newSearchProps});

    document.getElementById("formtext").value = "";
    this.setState({text: ''});
  }

  handleRemoveSkill (e) {
    let skillId = e.target.id;
    let skillIndex = this.state.searchProps.indexOf(skillId);
    let newSearchProps = this.state.searchProps;
    newSearchProps.splice(skillIndex, 1);
    
    this.setState({ searchProps: newSearchProps });
  }

  handleSearch () {
    // filter resumes using skills in searchProps
    // Add filtered resumes to matching resumes array
    // Display resumes on page
    let skills = '';
    for(let i = 0; i < this.state.searchProps.length; i++){
      if(i === this.state.searchProps.length - 1){
        skills += this.state.searchProps[i];
      } else {
        skills += this.state.searchProps[i] + '&';
      }
    }
    console.log(skills);
    axios.get(`/api/resume/${skills}`)
    .then( (response) => {
      // handle success
      console.log('success', response.data[0].basics.name);
      // let name = response.data[0].basics.name;
      let newMatchingResumes = response.data;
      this.setState({matchingResumes: newMatchingResumes})
    })
    .catch( (error) => {
      // handle error
      console.log('error in handleSearch function:', error);
    })
  }

  handleView (resume) {
    this.setState({currentResume: resume});
  }

  render () {
    return (
    <div className='Recruiter'>

    <h1 id="navbar">Recruiter Dashboard</h1>

    <form id="form" onClick={this.handleAddSkill}>
      <label>
        <input id="formtext" type="text" value={this.state.value} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Add Skill"/>
    </form>
      <ul>
        {this.state.searchProps.map((item) => (
          <li id={item} onClick={this.handleRemoveSkill}>{item}</li>
          ))}
      </ul>

    <button type="button" onClick={this.handleSearch}>Search</button>
    {this.state.matchingResumes.map( (resume) => (
      <>
      <h2 onClick={() => (this.handleView(resume))}>{resume.basics.name}</h2>
      <h3>{resume.basics.email}</h3>
      <h3>{resume.basics.phone}</h3>
      </>
    ))}
    <RecruitingFocus focusResume={this.state.currentResume}/>
    </div>
    )}
}

export default Recruiting;
