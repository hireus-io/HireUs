import React from 'react';

const RecruitingSearch = ({ value, handleChange, handleRemoveSkill, handleSearch, searchProps, handleAddSkill }) => {
  return (
  <div>
    <form id="form" onClick={handleAddSkill}>
      <label>
        <input id="formtext" type="text" value={value} onChange={handleChange}/>
      </label>
      <input type="submit" value="Add Skill"/>
    </form>
      <ul>
        {searchProps.map((item) => (
          <li id={item} onClick={handleRemoveSkill}>{item}</li>
          ))}
      </ul>

    <button type="button" onClick={handleSearch}>Search</button>
  </div>)
}

export default RecruitingSearch;