import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Select, MenuItem } from '@mui/material';

function Selected({ heading, valuesArray , defaultValue ,selectedMethod, value , Change }) {

  const handleChange = (event) => {
    Change(event.target.value)
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{heading}</FormLabel>
      <Select value={value} onChange={handleChange} disabled={selectedMethod === 'Income'}>
        <MenuItem value={0} disabled>{defaultValue}</MenuItem>
        {valuesArray.map((value, index) => (
          <MenuItem key={index} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

Selected.propTypes = {
  heading: PropTypes.string.isRequired,
  valuesArray: PropTypes.array.isRequired,
};

export default Selected;
