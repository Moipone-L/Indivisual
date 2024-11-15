import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    // Define states for form fields, error/success messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isRegister, setIsRegister] = useState(false);  // toggle between login and register

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset messages
        setError('');
        setSuccess('');

        const formData = { email, password };
        if (isRegister) {
            formData.username = username;  // Only include username for registration
        }

        try {
            let response;
            if (isRegister) {
                // Register request
                response = await axios.post('/api/register', formData);
                setSuccess('Registration successful!');
            } else {
                // Login request
                response = await axios.post('/api/login', formData);
                setSuccess('Login successful!');
                // Save the token in localStorage
                localStorage.setItem('token', response.data.token);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
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
                        required
                    />
                </div>
                <div>
                    <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>

            {/* Toggle between Register and Login forms */}
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </button>
        </div>
    );
};

export default AuthForm;
