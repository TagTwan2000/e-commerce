import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Currency = ({ currency, setCurrency, conversionRate, setConversionRate }) => {
    const [currencyWarningMessage, setCurrencyWarningMessage] = useState("");
    const [showCurrencyWarning, setShowCurrencyWarning] = useState(false);

    // Currency conversion rates
    const currencyRates = {
        SAR: 1.0,
        AED: 0.98,
        KWE: 0.081,
        QAR: 1.03,
        USD: 0.27,
        ERU: 0.24
    };

    // Handle currency change
    const handleCurrencyChange = (value) => {
        setCurrency(value);
        setConversionRate(currencyRates[value]);

        if (value !== "SAR") {
            showCurrencyPopUpWarning("Prices are approximate when changing currency from SAR.");
        }
    };

    // Show warning message when changing currency
    const showCurrencyPopUpWarning = (message) => {
        setCurrencyWarningMessage(message);
        setShowCurrencyWarning(true);
        setTimeout(() => {
            setShowCurrencyWarning(false);
            setCurrencyWarningMessage("");
        }, 3000);
    };

    useEffect(() => {
        if (currency !== "SAR") {
            setConversionRate(currencyRates[currency]);
        }
    }, [currency]);

    return (
        <div className="flex-1 flex items-center justify-end relative">
             {showCurrencyWarning && (
                <div className="absolute top-3 right-0 p-4 bg-red-500 text-white rounded animate-move ">
                    {currencyWarningMessage}
                </div>
            )}
            <Select value={currency} onValueChange={handleCurrencyChange} className="w-auto">
                <SelectTrigger className="outline-none md:border-none w-auto shadow-none text-lg ml-[30px] text-gray-900 dark:text-gray-100">
                    <SelectValue>{currency}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SAR">SAR</SelectItem>
                    <SelectItem value="AED">AED</SelectItem>
                    <SelectItem value="KWE">KWE</SelectItem>
                    <SelectItem value="QAR">QAR</SelectItem>
                    <SelectItem value="USD">$USD</SelectItem>
                    <SelectItem value="ERU">€ERU</SelectItem>
                </SelectContent>
            </Select>

            {/* Display currency warning message */}
           
        </div>
    );
};

export default Currency;
