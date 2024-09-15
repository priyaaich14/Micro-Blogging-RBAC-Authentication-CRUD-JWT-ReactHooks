import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const { handleLogin, authError, setAuthError } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [lockTime, setLockTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const runClientSideValidations = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (runClientSideValidations()) {
      const formData = { email, password };
      const result = await handleLogin(formData);
      console.log("Login result:", result);
      if (result && result.accountLockedUntil) {
        const lockUntil = new Date(result.accountLockedUntil).getTime();
        console.log("Account locked until:", lockUntil);
        setLockTime(lockUntil);
        startTimer(lockUntil);
      } else if (result && result.error) {
        console.log("Login error:", result.error);
      }
    }
  };

  const startTimer = (lockTime) => {
    console.log("Starting timer with lockTime:", lockTime);
    const interval = setInterval(() => {
      const timeRemaining = lockTime - Date.now();
      if (timeRemaining <= 0) {
        clearInterval(interval);
        setLockTime(null);
        setTimer(null);
        setErrors({});
        setAuthError(null);
        alert('You can now try logging in again.');
      } else {
        setTimer(Math.floor(timeRemaining / 1000));
      }
    }, 1000);
  };

  useEffect(() => {
    if (authError && !lockTime) {
      setErrors((prevErrors) => ({ ...prevErrors, server: authError }));
    }
  }, [authError, lockTime]);

  useEffect(() => {
    setErrors({});
    setAuthError(null);
  }, [setAuthError]);

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter email'
          value={email}
          onChange={handleInputChange(setEmail)}
        /> <br />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <input
          type="password"
          placeholder='Enter password'
          value={password}
          onChange={handleInputChange(setPassword)}
          disabled={!!lockTime}
        /> <br />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
        {lockTime && <p style={{ color: 'red' }}>Account is locked. Try again in {timer} seconds.</p>}
        <input type="submit" disabled={!!lockTime} />
        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
