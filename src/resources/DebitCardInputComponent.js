import React, { useState } from 'react';
const DebitCardInputComponent = ({label, name}) => {
    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (e) => {
        // Remove all non-digit characters
        const cleanedValue = e.target.value.replace(/\D/g, '');

        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    return (
    
            <div className="form-group">
            <label> {label} </label>
            <input
            className={`my-control form-control`}
            value={cardNumber}
            onChange={handleChange}
            type="tel"
            minLength={16}
            maxLength={19}
            name={name}
            inputMode="numeric"
            required
            title="Please enter a valid credit card number!"
            />
            </div>
    );
};

export default DebitCardInputComponent;
