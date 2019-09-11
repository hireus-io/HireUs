import React from 'react';
import MultipleComplex from '../Inputs/MultipleComplexInput';

function PublishedWork() {
  return (
    <MultipleComplex mainName={'Published Work'} subInputs={[
      {
        name: 'publications_name', schemaName: 'name', displayName: 'Name:', placeholder: '', parent: 'publications',
      },
      {
        name: 'publications_publisher', schemaName: 'publisher', displayName: 'Publisher:', placeholder: '', parent: 'publications',
      },
      {
        name: 'publications_releaseDate', schemaName: 'releaseDate', displayName: 'Release Date:', placeholder: '', parent: 'publications',
      },
      {
        name: 'publications_website', schemaName: 'website', displayName: 'Website:', placeholder: '', parent: 'publications',
      },
      {
        name: 'publications_summary', schemaName: 'summary', displayName: 'Summary:', placeholder: '', parent: 'publications',
      },
    ]} />
  );
}

export default PublishedWork;
