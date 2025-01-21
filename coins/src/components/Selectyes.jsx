import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea";
import { CiStickyNote } from "react-icons/ci";
import { useStateContext } from '../../Context/StateContext';

function Selectyes({ onFormComplete, onDataChange }) {
    const { cartItems,darkMode } = useStateContext(); 
    const [marketOpen, setMarketOpen] = useState("Open transfer*");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backupCode1, setBackupCode1] = useState("");
    const [backupCode2, setBackupCode2] = useState("");
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [errors, setErrors] = useState({}); 
    
    useEffect(() => {
        if (cartItems.length > 0) {
            const item = cartItems[0].informtin;
            setMobileNumber(item.mobileNumber || "");
            setEmail(item.email || "");
            setPassword(item.password || "");
            setBackupCode1(item.backupCode1 || "");
            setBackupCode2(item.backupCode2 || "");
        }
    }, [cartItems]);

    const checkFormCompletion = () => {
        const newErrors = {};
        if (marketOpen === "no" && mobileNumber === "") {
            newErrors.mobileNumber = "This field is required.";
        }
        if (marketOpen === "yes") {
            if (!email) newErrors.email = "This field is required.";
            if (!password) newErrors.password = "This field is required.";
            if (!backupCode1) newErrors.backupCode1 = "This field is required.";
            if (!backupCode2) newErrors.backupCode2 = "This field is required.";
            if (!mobileNumber) newErrors.mobileNumber = "This field is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            const item = cartItems[0].informtin;
            setMarketOpen(item.marketOpen || "Open transfer*");
        }
    }, [cartItems]);

    const handleButtonClick = () => {
        setIsNoteOpen(!isNoteOpen);
    };

    useEffect(() => {
        onFormComplete(checkFormCompletion());
    }, [marketOpen, mobileNumber, email, password, backupCode1, backupCode2]);

    const handleInputChange = (field, value) => {
        setErrors(prev => ({ ...prev, [field]: "" }));
        
        switch (field) {
            case "mobileNumber": setMobileNumber(value); break;
            case "email": setEmail(value); break;
            case "password": setPassword(value); break;
            case "backupCode1": setBackupCode1(value); break;
            case "backupCode2": setBackupCode2(value); break;
            default: break;
        }

        // Pass updated values to the parent component via onDataChange
        onDataChange({
            marketOpen,
            mobileNumber,
            email,
            password,
            backupCode1,
            backupCode2
        });
    };

    const handleMarketChange = (value) => {
        setMarketOpen(value);
    };

    return (
        <div className="flex flex-col">
            <label className="text-lg font-medium mb-2 flex items-center">
                Mobile app transfer market open? <span className="text-red-500">*</span>
            </label>
            <Select value={marketOpen} onValueChange={handleMarketChange} className="w-full">
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue>{marketOpen}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Open transfer*">Open transfer*</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectContent>
            </Select>

            {marketOpen === "no" && (
                <div className="mt-4">
                    <label className={`text-lg ${darkMode ? (mobileNumber ? 'text-white' : 'text-red-500') : (mobileNumber ? 'text-black' : 'text-red-500')}`}
                    >
                        Your mobile number  max quntity is 2 mailon for cloesd market<span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full"
                    />
                    {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
                    <Button className='mt-[12px] w-full bg-gray-300 text-gray-800 hover:bg-gray-300' onClick={handleButtonClick}>
                        Leave A Note! <span className='text-gray-800'><CiStickyNote /></span>
                    </Button>
                    {isNoteOpen && (
                        <div className="mt-4">
                            <Textarea
                                placeholder="Enter your note here"
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            )}

            {marketOpen === "yes" && (
                <div className="mt-4 flex flex-col gap-4">
                    <InputFields
                        label="Email"
                        value={email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        darkMode={darkMode} // Pass darkMode here
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                    
                    <InputFields
                        label="Password"
                        value={password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        darkMode={darkMode} // Pass darkMode here
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                    
                    <InputFields
                        label="Backup Code 1"
                        value={backupCode1}
                        onChange={(e) => handleInputChange("backupCode1", e.target.value)}
                        placeholder="Enter backup code 1"
                        darkMode={darkMode} // Pass darkMode here
                    />
                    {errors.backupCode1 && <p className="text-red-500">{errors.backupCode1}</p>}
                    
                    <InputFields
                        label="Backup Code 2"
                        value={backupCode2}
                        onChange={(e) => handleInputChange("backupCode2", e.target.value)}
                        placeholder="Enter backup code 2"
                        darkMode={darkMode} // Pass darkMode here
                    />
                    {errors.backupCode2 && <p className="text-red-500">{errors.backupCode2}</p>}
                    
                    <InputFields
                        label="Phone Number"
                        value={mobileNumber}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                        placeholder="Enter your phone number"
                        darkMode={darkMode} // Pass darkMode here
                    />
                    {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
                    
                    <Button className='mt-[12px] w-full bg-gray-300 text-gray-800 hover:bg-gray-300' onClick={handleButtonClick}>
                        Leave A Note! <span className='text-gray-800'><CiStickyNote /></span>
                    </Button>
                    {isNoteOpen && (
                        <div className="mt-4">
                            <Textarea
                                placeholder="Enter your note here"
                                className="w-full"
                            />
                        </div>
                    )}
    </div>
)}
        </div>
    );
}

// Updated InputFields component
const InputFields = ({ label, value, onChange, placeholder, darkMode }) => (
    <div className="flex flex-col">
        <label className={`text-lg font-medium mb-2 flex items-center ${darkMode ? (value ? 'text-white' : 'text-red-500') : (value ? 'text-black' : 'text-red-500')}`}>
            {label} <span className="text-red-500">*</span>
        </label>
        <Input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full"
        />
    </div>
);

export default Selectyes;
