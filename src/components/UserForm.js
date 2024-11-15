import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ existingUser, refreshUsers }) => {
    const [username, setUsername] = useState(existingUser?.username || '');
    const [email, setEmail] = useState(existingUser?.email || '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(existingUser?.role || 'staff');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = { username, email, password, role };

        try {
            if (existingUser) {
                // Update user
                await axios.put(`/api/users/${existingUser.id}`, formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setSuccess('User updated successfully');
            } else {
                // Add new user
                await axios.post('/api/users', formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setSuccess('User added successfully');
            }
            refreshUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{existingUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!existingUser}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <button type="submit">{existingUser ? 'Update User' : 'Add User'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
        
    );
};

export default UserForm;
