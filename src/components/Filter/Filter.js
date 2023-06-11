import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ onChange }) => {
  return (
    <>
      <h4>Find contacts by name</h4>
      <input type="text" name="filter" onChange={onChange}></input>
    </>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
