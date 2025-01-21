import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';

const errorMessages = {
  'auth/invalid-email': 'Invalid email format.',
  'auth/user-not-found': 'No user found with this email.',
  'auth/too-many-requests': 'Too many requests. Try again later.',
};

export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    } else if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem('email');
      if (!email) {
        email = window.prompt('Please provide your email');
      }
      setInitialLoading(true);
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log(result.user);
          localStorage.removeItem('email');
          setInitialLoading(false);
          navigate('/');
        })
        .catch((err) => {
          setInitialLoading(false);
          setInitialError(errorMessages[err.code] || err.message);
          navigate('/login');
        });
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setLoginError('Email is required.');
      return;
    }
    setLoginLoading(true);
    sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:5173/login',
      handleCodeInApp: true,
    })
      .then(() => {
        localStorage.setItem('email', email);
        setLoginLoading(false);
        setLoginError('');
        setInfoMsg('We have sent you an email with a link to sign in');
      })
      .catch((err) => {
        setLoginLoading(false);
        setLoginError(errorMessages[err.code] || err.message);
      });
  };

  return (
    <div className='box'>
      {initialLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {initialError && <div className='error-msg'>{initialError}</div>}
          {user ? (
            <div>Please wait...</div>
          ) : (
            <form className='form-group custom-form' onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type='email'
                required
                placeholder='Enter Email'
                className='form-control'
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type='submit' className='btn btn-success btn-md' disabled={loginLoading}>
                {loginLoading ? <span>Logging you in...</span> : <span>Login</span>}
              </button>
              {loginError && <div className='error-msg'>{loginError}</div>}
              {infoMsg && <div className='info-msg'>{infoMsg}</div>}
            </form>
          )}
        </>
      )}
    </div>
  );
};
