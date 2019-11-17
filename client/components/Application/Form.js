import React from 'react';

function Form(props) {
  const { handleChange, resume } = props;
  return (
    <form id={'applicantForm'}>
      {props.children.map(child => (
        React.cloneElement(child, { handleChange, resume })
      ))}
    </form>
  );
}

export default Form;
