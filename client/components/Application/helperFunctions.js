const formatSection = (section, index) => {
  // there are many fields that the user can add countless entries for (work, volunteer)
  // This function takes care of adding new objects
  if (!section[index]) {
    for (let i = 0; i <= index; i += 1) {
      if (!section[i]) {
        section[i] = {};
      }
    }
  }

  return section;
};

export function getResumeData(resume, section, subsection, index = 0) {
  // console.log(section, subsection, index);
  switch (section) {
    case 'basics':
      return resume.basics[subsection];
    case 'location':
      return resume.basics.location[subsection];
    case 'keywords':
      return resume.keywords;
    case 'profiles':
      const profile = resume.basics.profiles[index];
      return (profile) ? profile[subsection] : '';
    default:
      const entry = resume[section][index];
      return (entry) ? resume[section][index][subsection] : '';
  }
}

export function setResumeData(resume, section, subsection, index, val) {
  let formattedSection = [];
  // console.log(section, subsection, val, index);
  switch (section) {
    case 'basics':
      resume.basics[subsection] = val;
      break;
    case 'location':
      resume.basics.location[subsection] = val;
      break;
    case 'keywords':
      resume.keywords = val;
    case 'profiles':
      formattedSection = formatSection(resume.basics.profiles, index);
      formattedSection[index][subsection] = val;
      resume.basics.profiles = formattedSection;
      break;
    default:
      // case for work, volunteer, majority of fields
      // these are all the fields that are multicomplex inputs and are on the root level of the template
      formattedSection = formatSection(resume[section], index);
      formattedSection[index][subsection] = val;
      resume[section] = formattedSection;
      break;
  }
  return resume;
}