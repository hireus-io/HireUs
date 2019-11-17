import React from 'react';

// a function that takes in a part of a resume and returns the corresponding JSX
function mapper(object, name, index) {
  console.log('Hello!, mapping: ', name, object);
  switch (name) {
    case ('basics'):
      return (
        <div>
          <div>{object.name}</div>
          <div>{object.email}</div>
          <div>{object.phone}</div>
          <div>{`${object.location.address}, ${object.location.city} ${object.location.postalCode}`}</div>
        </div>
      );
    case ('education'):
      // some sections are actually arrays that contain many objects, here we will map over each item in the array
      return (
        <div>{object.map((section, i) => mapper(section, 'education_section', i))}</div>
      );
    case ('education_section'):
      return (
        <div>
          <div>{object.institution}</div>
          <div>{`${object.startDate} - ${object.endDate}`}</div>
        </div>
      );
    case ('interests'):
      return (
        <div>
          <div>{object.map((section, i) => mapper(section, 'interest_section', i))}</div>
        </div>
      );
    case ('interest_section'):
      return (
        <div>
          <div>{object.name}</div>
          <div>{object.keywords}</div>
        </div>
      );
    case ('work'):
      return (
        <div>
          <div>{object.map((section, i) => mapper(section, 'work_section', i))}</div>
        </div>
      );
    case ('work_section'):
      return (
        <div>
          <div>{object.company}</div>
          <div>{object.position}</div>
          <div>{`${object.startDate} - ${object.endDate}`}</div>
        </div>
      );
    case ('awards'):
      return (
        <div>

        </div>
      );
    case ('publications'):
      return (
        <div>

        </div>
      );
    case ('skills'):
      return (
        <div>

        </div>
      );
    case ('languages'):
      return (
        <div>

        </div>
      );
    case ('references'):
      return (
        <div>

        </div>
      );
    case ('keywords'):
      return (
        <div>

        </div>
      );
    case ('volunteer'):
      return (
        <div>

        </div>
      );
    default:
      return <div>{name}</div>;
  }
}

export default mapper;
