import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Register() {
    const { handleRegister, authError, setAuthError } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const runClientSideValidations = () => {
        const newErrors = {};
        if (!username) {
            newErrors.username = 'Username is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password !== confirmPassword) {
            newErrors.password = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setAuthError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (runClientSideValidations()) {
            const formData = { username, email, password };
            handleRegister(formData);
        }
    };

    useEffect(() => {
        if (authError) {
            setErrors((prevErrors) => ({ ...prevErrors, server: authError }));
        }
    }, [authError]);

    useEffect(() => {
        // Clear errors when the component mounts
        setErrors({});
        setAuthError(null);
    }, [setAuthError]);

    return (
        <div>
            <h2>Register Page</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Enter username' 
                    value={username} 
                    onChange={handleInputChange(setUsername)} 
                /> <br />
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
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
                /> <br />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                <input 
                    type="password" 
                    placeholder='Confirm password' 
                    value={confirmPassword} 
                    onChange={handleInputChange(setConfirmPassword)} 
                /> <br />
                {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
                <input type="submit" />
                <div>
                   <p>Already have an Account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}
