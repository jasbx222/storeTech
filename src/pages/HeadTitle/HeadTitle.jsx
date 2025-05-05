import React from 'react';
import PropTypes from 'prop-types';
import './HeadTitle.css';

const HeadTitle = ({ title }) => {
  return (
    <div className="head-title-container">
      <h1 className="head-title">{title}</h1>
    </div>
  );
};

HeadTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadTitle;
