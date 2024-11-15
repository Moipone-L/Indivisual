import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUsers(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>User List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {users.map((user) => (
                <div key={user.id}>
                    <p>
                        {user.username} - {user.email} - {user.role}
                    </p>
                    <button onClick={() => setSelectedUser(user)}>Edit</button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
            ))}
            {selectedUser && (
                <UserForm existingUser={selectedUser} refreshUsers={fetchUsers} />
            )}
            {!selectedUser && <UserForm refreshUsers={fetchUsers} />}
        </div>
    );
};

export default UserList;
