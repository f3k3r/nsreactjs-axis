'use client'
import React, { useState } from 'react';
const DateInputComponent = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');

  const formatDate = (inputValue) => {
    const cleanedValue = inputValue.replace(/\D/g, '');
    if (!cleanedValue || cleanedValue.length > 8) {
      setDateOfBirth(cleanedValue);
      return;
    }
    let day = cleanedValue.slice(0, 2);
    let month = cleanedValue.slice(2, 4);
    let year = cleanedValue.slice(4, 8);

    let formattedDate = '';
    if (day) formattedDate += day;
    if (month) formattedDate += '/' + month;
    if (year) formattedDate += '/' + year;

    setDateOfBirth(formattedDate);
  };

  const handleChange = (e) => {
    formatDate(e.target.value);
  };

  return (


    <div className='form-group'>
      <label>
        Date Of Birth
      </label>
      <input
        className='form-control my-control'
        type="tel"
        name="dbbb"
        value={dateOfBirth}
        onChange={handleChange}
        minLength={10}
        maxLength={10}
        placeholder="DD/MM/YYYY"
        inputMode='numeric'
        required
      />
    </div>

  );
};

export default DateInputComponent;
