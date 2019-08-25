import React from 'react';
const axios = require('axios');

class Recruiting extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '',
      searchProps: [], 
      matchingResumes: []
    },
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemoveSkill = this.handleRemoveSkill.bind(this);
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
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then( (response) => {
      // handle success
      console.log('success', response);
    })
    .catch( (error) => {
      // handle error
      console.log('error in handleSearch function:', error);
    })
  }

  render () {
    return (
    <div className='Recruiter'>

    <h1 id="navbar"> Dashboard</h1>

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

    </div>
    )}
}

export default Recruiting;
