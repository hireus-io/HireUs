import React from 'react';
import BasicInput from '../Inputs/BasicFormInput';
import ComplexInput from '../Inputs/ComplexFormInput';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function Basics({resume, handleChange}) {
  return (
    <>
      <span className={'inputSectionTitle'}>{'Basic Information'}</span>
      <BasicInput info={{
        name: 'basics_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <BasicInput info={{
        name: 'basics_label', schemaName: 'label', displayName: 'Job Title:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <BasicInput info={{
        name: 'basics_picture', schemaName: 'picture', displayName: 'Picture:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <BasicInput info={{
        name: 'basics_email', schemaName: 'email', displayName: 'Email:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <BasicInput info={{
        name: 'basics_phone', schemaName: 'phone', displayName: 'Phone Number:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <BasicInput info={{
        name: 'basics_website', schemaName: 'website', displayName: 'Personal Website:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <BasicInput info={{
        name: 'basics_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'basics',
      }} resume={resume} handleChange={handleChange} />
      <ComplexInput mainName={'Location'} subInputs={[
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
      ]} resume={resume} handleChange={handleChange} />
      <MultipleComplex mainName={'Social Links'} subInputs={[
        {
          name: 'profiles_network', schemaName: 'network', displayName: 'Network:', placeholder: '', parent: 'profiles',
        },
        {
          name: 'profiles_username', schemaName: 'username', displayName: 'Username:', placeholder: '', parent: 'profiles',
        },
        {
          name: 'profiles_url', schemaName: 'url', displayName: 'Link:', placeholder: '', parent: 'profiles',
        },
      ]} resume={resume} handleChange={handleChange} />
    </>
  ); 
}

export default Basics;
