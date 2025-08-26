// this is for fixing the currency input in the form
import React, { useState, useEffect } from "react";

interface currencyInputProps {
    value: number;
    onChange: (value: number) => void;
    readOnly?: boolean;
}

const CurrencyInput : React.FC<currencyInputProps> = ({value, onChange, readOnly = false}) => {
    const[inputValue, setInputValue] = useState<string>(value.toString());
    const[isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        if(!isFocused){
            setInputValue(formatCurrency(value));
        }
    },[value,isFocused]);


     const formatCurrency = (val: number): string => {
        const num = Number(val) || 0;
        return num
            .toFixed(2) // safe now
            .replace(/\d(?=(\d{3})+\.)/g, "$&,"); // add thousand separators
        };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const rawValue = e.target.value.replace(/[^\d]/g,''); // remove non-numeric characters
        const rawValue = e.target.value;
        // replace(/\D/g,"")//remove non digit
        const cleaned = rawValue.replace(/[^\d,]/g, "").replace(/,+/g, ","); // allow only one comma
        
        setInputValue(cleaned); // set the input value to the cleaned value
        
        const normalized = cleaned.replace(",",".");
        const numericValue = parseFloat(normalized) || 0; // parse the raw value to a number

        setInputValue(cleaned);
        onChange(numericValue);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setInputValue(formatCurrency(value));
    };

    const handleFocus = () => {
        setIsFocused(true);
        setInputValue(value.toString().replace(",", ".")); // remove the thousands separator and set the input value to the raw value
    };

  

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                readOnly= {readOnly}
                className="w-full p-2 rounded-xl bg-gray-100 border-1 border-gray-300 text-sm"
                // placeholder="0"
            />
        </div>
    );
};

export default CurrencyInput;