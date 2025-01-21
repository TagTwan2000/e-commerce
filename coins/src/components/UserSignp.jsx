import React, { useState } from 'react';
import { auth, app } from '../../FirebaseConfig'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 
import PhoneInput from 'react-phone-input-2';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import 'react-phone-input-2/lib/style.css';

const UserSignp = ({ toggleForm }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorWarningMessage, setErrorWarningMessage] = useState("");
    const [showErrorWarning, setShowErrorWarning] = useState(false);
    const [createWarningMessage, setCreateWarningMessage] = useState("");
    const [showCreateWarning, setShowCreateWarning] = useState(false);
    const [fieldError, setFieldError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const db = getFirestore(app);
    const showErrorPopUpWarning = (message) => {
        setErrorWarningMessage(message);
        setShowErrorWarning(true);
        setTimeout(() => {
            setShowErrorWarning(false);
            setErrorWarningMessage("");
        }, 3000);
    };

    const showCreatePopUpWarning = (message) => {
        setCreateWarningMessage(message);
        setShowCreateWarning(true);
        setTimeout(() => {
            setShowCreateWarning(false);
            setCreateWarningMessage("");
        }, 3000);
    };

    

    const onCreateAccount = async() => {
        setFieldError({});

        if (!name || !lastName || !email || !password || !phone) {
            const errors = {};
            if (!name) errors.name = 'First Name is required';
            if (!lastName) errors.lastName = 'Last Name is required';
            if (!email) errors.email = 'Email is required';
            if (!password) errors.password = 'Password is required';
            if (!phone) errors.phone = 'Mobile phone is required';
            setFieldError(errors);
            return;
        }

        try {
            const authCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, 'users', authCredential.user.uid);
            await setDoc(userRef, { email: email, firstname: name, lastname: lastName, phone: phone });
            showCreatePopUpWarning("Account created successfully!"); // Show success message
        } catch (error) {
            console.error("Error creating account: ", error);
            showErrorPopUpWarning(error.message); // Show error message
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className=" font-sans min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md p-4">
                <div className="p-6 rounded-lg bg-white shadow-md">
                    <h2 className="text-gray-800 text-center text-lg font-bold">Sign Up</h2>
                    <form className="mt-4 space-y-3">
                        {/* First Name and Last Name in the same row */}
                        <div className="flex flex-col sm:flex-row sm:space-x-2">
                            <div className="flex-1">
                                <label className="text-gray-800 text-xs mb-1 block">First Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-3 py-2 rounded-md"
                                    placeholder="Enter first name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {fieldError.name && <p className="text-red-500 text-xs">{fieldError.name}</p>}
                            </div>

                            <div className="flex-1 mt-2 sm:mt-0">
                                <label className="text-gray-800 text-xs mb-1 block">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-3 py-2 rounded-md"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {fieldError.lastName && <p className="text-red-500 text-xs">{fieldError.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-800 text-xs mb-1 block">Email</label>
                            <input
                                type="text"
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-3 py-2 rounded-md"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {fieldError.email && <p className="text-red-500 text-xs">{fieldError.email}</p>}
                        </div>

                        <div>
                            <label className="text-gray-800 text-xs mb-1 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-3 py-2 rounded-md"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            {fieldError.password && <p className="text-red-500 text-xs">{fieldError.password}</p>}
                        </div>

                        <div>
                            <label className="text-gray-800 text-xs mb-1 block">Phone Number</label>
                            <PhoneInput
                                country={''}
                                value={phone}
                                onChange={(value) => setPhone(value)}
                                inputClass="w-full border border-gray-300 px-3 py-2 rounded-md"
                            />
                            {fieldError.phone && <p className="text-red-500 text-xs">{fieldError.phone}</p>}
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={onCreateAccount}
                                className="w-full py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Sign Up
                            </button>
                        </div>
                        <p className="text-gray-800 text-xs mt-3 text-center">
                            Already have an account? 
                            <a onClick={toggleForm} className="text-blue-600 hover:underline ml-1">Sign In</a>
                        </p>
                    </form>
                </div>
            </div>
            {showErrorWarning && (
                <div className="absolute top-3 right-0 p-4 bg-red-500 text-white rounded">
                    {errorWarningMessage}
                </div>
            )}
            {showCreateWarning && (
                <div className="absolute top-3 right-0 p-4 bg-green-600 text-white rounded">
                    {createWarningMessage}
                </div>
            )}
        </div>
    );
};

export default UserSignp;
