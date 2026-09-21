import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: 'PATIENT'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            toast.success('Registered successfully!');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed!');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.icon}>🏥</h1>
                    <h2 style={styles.title}>Create Account</h2>
                    <p style={styles.subtitle}>
                        Join MediSys today
                    </p>
                </div>
                <form onSubmit={handleRegister}>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                First Name
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Last Name
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Email
                        </label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Password
                        </label>
                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Phone
                        </label>
                        <input
                            style={styles.input}
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter phone"
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Role
                        </label>
                        <select
                            style={styles.input}
                            name="role"
                            value={form.role}
                            onChange={handleChange}>
                            <option value="PATIENT">
                                Patient
                            </option>
                            <option value="DOCTOR">
                                Doctor
                            </option>
                            <option value="ADMIN">
                                Admin
                            </option>
                        </select>
                    </div>
                    <button
                        style={styles.button}
                        type="submit">
                        ✅ Register
                    </button>
                </form>
                <p style={styles.link}>
                    Already have account?{' '}
                    <a href="/login" style={styles.anchor}>
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Arial, sans-serif'
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        width: '100%',
        maxWidth: '480px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '24px'
    },
    icon: { fontSize: '40px', margin: '0' },
    title: {
        color: '#0D1B2A',
        margin: '8px 0 4px',
        fontSize: '24px'
    },
    subtitle: {
        color: '#888',
        margin: '0',
        fontSize: '14px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
    },
    field: { marginBottom: '16px' },
    label: {
        display: 'block',
        marginBottom: '6px',
        color: '#333',
        fontWeight: '600',
        fontSize: '13px'
    },
    input: {
        width: '100%',
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1.5px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%',
        padding: '13px',
        backgroundColor: '#1B998B',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    link: {
        textAlign: 'center',
        marginTop: '20px',
        color: '#666',
        fontSize: '14px'
    },
    anchor: {
        color: '#1B998B',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

export default Register;