import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioBtn({ value , change }) {

  const handleChange = (event) => {
    change(event.target.value)
  };

  return (
    <FormControl >
      <FormLabel id="demo-row-radio-buttons-group-label">Select Transaction Method</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
         <FormControlLabel
          value="Expense"
          control={<Radio />}
          label="Expense"
          style={{
            border: value === 'Expense' ? '2px solid black' : 'none',
            padding: '5px', 
            borderRadius: '4px' 
          }}
        />
        <FormControlLabel
          value="Income"
          control={<Radio />}
          label="Income"
          style={{
            border: value === 'Income' ? '2px solid black' : 'none',
            padding: '5px',
            borderRadius: '4px' 
          }}
        />
      </RadioGroup>
    </FormControl>
  );
}
