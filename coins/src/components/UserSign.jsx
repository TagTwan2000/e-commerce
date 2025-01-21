import React, { useState } from 'react';
import { auth } from '../../FirebaseConfig'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UserSign = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorWarningMessage, setErrorWarningMessage] = useState("");
    const [showErrorWarning, setShowErrorWarning] = useState(false);
    const [fieldError, setFieldError] = useState({});
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const showErrorPopUpWarning = (message) => {
        setErrorWarningMessage(message);
        setShowErrorWarning(true);
        setTimeout(() => {
            setShowErrorWarning(false);
            setErrorWarningMessage("");
        }, 3000);
    };

    const onSignIn = () => {
        setFieldError({});
        const errors = {};
        if (!email || !password) {
            if (!email) errors.email = 'Email is required';
            if (!password) errors.password = 'Password is required';
            setFieldError(errors);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                // Navigate to the home screen or other appropriate screen
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = '';

                switch (errorCode) {
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address!';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'User account is disabled!';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'User not found!';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password!';
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid credentials!';
                        break;
                    default:
                        errorMessage = 'Error signing in: ' + error.message;
                        break;
                }
                console.error('Error signing in:', errorMessage);
                showErrorPopUpWarning(errorMessage);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className=" font-sans min-h-screen flex flex-col justify-center items-center">
            <div className="w-full max-w-xs md:max-w-sm p-4">
                <div className="p-6 rounded-lg bg-white shadow-md">
                    <h2 className="text-gray-800 text-center text-lg font-bold">Sign in</h2>
                    <form className="mt-4 space-y-3">
                        <div>
                            <label className="text-gray-800 text-xs mb-1 block">Email</label>
                            <input
                                type="text"
                                required
                                className="w-full text-gray-800 text-sm border border-gray-300 px-2 py-1 rounded-md"
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
                                    className="w-full text-gray-800 text-sm border border-gray-300 px-2 py-1 rounded-md"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            {fieldError.password && <p className="text-red-500 text-xs">{fieldError.password}</p>}
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={onSignIn}
                                className="w-full py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                        </div>
                        <p className="text-gray-800 text-xs mt-3 text-center">
                            You don't have an account? 
                            < a  onClick={toggleForm} className="text-blue-600 hover:underline ml-1">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
            {showErrorWarning && (
                <div className="absolute top-3 right-0 p-4 bg-red-500 text-white rounded animate-move">
                    {errorWarningMessage}
                </div>
            )}
        </div>
    );
}

export default UserSign;
