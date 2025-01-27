import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('https://ajackus-backend-w2o4.onrender.com/users');
        setUsers(response.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`https://ajackus-backend-w2o4.onrender.com/users/${id}`);
        fetchUsers();
    };

    const handleEdit = (user) => setEditingUser(user);

    return (
        <div>
            <UserForm
                refreshUsers={fetchUsers}
                editingUser={editingUser}
                clearEdit={() => setEditingUser(null)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
