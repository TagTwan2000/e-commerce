import React, { useState } from 'react';
import UserSign from './UserSign'; // Your sign-in component
import UserSignp from './UserSignp'; // Your sign-up component

const AuthContainer = () => {
    const [isSignIn, setIsSignIn] = useState(false); // State to toggle between forms

    const toggleForm = () => {
        setIsSignIn(!isSignIn); // Toggle the form
    };

    return (
        <div className=" font-sans min-h-screen flex flex-col justify-center items-center">
            {isSignIn ? <UserSign toggleForm={toggleForm} /> : <UserSignp toggleForm={toggleForm} />}
        </div>
    );
};

export default AuthContainer;
