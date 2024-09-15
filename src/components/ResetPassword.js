import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const { token } = useParams()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' })
            return
        }
        try {
            await axios.post('http://localhost:3070/api/users/reset-password', { token, newPassword });
            toast('Password reset successfully')
            navigate('/login')
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setErrors({ newPassword: err.response.data.errors[0].msg })
            } else if (err.response && err.response.data.error) {
                setErrors({ newPassword: err.response.data.error })
            } else {
                setErrors({ newPassword: 'An error occurred during password reset' })
            }
        }
    }

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder='Enter new password' 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                /> <br />
                {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword}</p>}
                <input 
                    type="password" 
                    placeholder='Confirm new password' 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                /> <br />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                <input type="submit" />
            </form>
        </div>
    )
}
