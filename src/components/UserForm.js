import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ refreshUsers, editingUser, clearEdit }) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
    });

    useEffect(() => {
        if (editingUser) setForm(editingUser);
    }, [editingUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await axios.put(`https://ajackus-backend-w2o4.onrender.com/users/${editingUser.id}`, form);
        } else {
            await axios.post('https://ajackus-backend-w2o4.onrender.com/users', form);
        }
        refreshUsers();
        clearForm();
    };

    const clearForm = () => {
        setForm({ firstName: '', lastName: '', email: '', department: '' });
        clearEdit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                required
            />
            <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
            {editingUser && <button onClick={clearForm}>Cancel</button>}
        </form>
    );
};

export default UserForm;
