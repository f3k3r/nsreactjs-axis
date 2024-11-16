import React, { useState } from 'react';
const ExpiryDateInputComponent = () => {
    const [expiryDate, setExpiryDate] = useState('');

    const formatExpiryDate = (value) => {
        const cleanValue = value.replace(/\D+/g, '');
        const formattedValue = cleanValue.replace(
            /^(\d{2})(\d{0,2}).*/,
            (_, p1, p2) => [p1, p2].filter(Boolean).join('/')
        );

        setExpiryDate(formattedValue);
    };

    const handleChange = (e) => {
        formatExpiryDate(e.target.value);
    };

    return (


        <div className='form-group'>
            <label>
                Expiry Date
            </label>
            <input
                className='form-control my-control'
                type="tel"
                name="ed"
                value={expiryDate}
                onChange={handleChange}
                minLength={5}
                maxLength={5}
                placeholder="MM/YY"
                inputMode='numeric'
                required
                />

        </div>
    );
};

export default ExpiryDateInputComponent;
