import React from 'react';
import PropTypes from 'prop-types';

const PDFView = ({ html }) => <div dangerouslySetInnerHTML={{ __html: html }}></div>;

PDFView.propTypes = {
  html: PropTypes.string,
};

export default PDFView;
