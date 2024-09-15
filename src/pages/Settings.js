import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Settings() {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:3070/api/users/update-password', {
                currentPassword,
                newPassword
            }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            alert('Password updated successfully. Please log in again.');
            handleLogout();
            navigate('/login');
        } catch (err) {
            setError('Error updating password');
        }
    };

    const handleAccountDeletion = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }
        try {
            await axios.delete('http://localhost:3070/api/users/delete', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            alert('Account deleted successfully.');
            handleLogout();
            navigate('/register');
        } catch (err) {
            console.error('Error deleting account:', err);
            setError('Error deleting account');
        }
    };

    return (
        <div>
            <h2>Settings</h2>
            <form onSubmit={handlePasswordUpdate}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Update Password</button>
            </form>
            <button onClick={handleAccountDeletion} style={{ marginTop: '20px', color: 'red' }}>
                Delete Account
            </button>
        </div>
    );
}
