import React from 'react';
import PropTypes from 'prop-types';

const RecruitingSearch = ({
  value, handleChange, handleRemoveSkill, handleSearch, searchProps, handleAddSkill,
}) => (

  <div className={'recruiterSearch'}>

    <form id="recruiterForm" onClick={handleAddSkill}>
      {/* <label> */}
        <input id="formtext" type="text" value={value} onChange={handleChange} placeholder={'Add a skill'}/>
      {/* </label> */}
      <input className={'searchButton'} type="submit" value="Add Skill"/>
    </form>
    <ul className={'recruiterSkills'}>
      {searchProps.map((item, i) => (
        <li id={item} key={i} onClick={handleRemoveSkill}>{item}</li>
      ))}
    </ul>

    <button className={'buttonSearchSkills searchButton'} type="button" onClick={handleSearch}>Search</button>
  </div>
);

RecruitingSearch.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleRemoveSkill: PropTypes.func,
  handleAddSkill: PropTypes.func,
  searchProps: PropTypes.array,
  handleSearch: PropTypes.func,
};

export default RecruitingSearch;
