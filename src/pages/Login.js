import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await API.post(
                '/auth/login', { email, password });
            const { accessToken, role, userId } = response.data;
            login({ email, role, userId }, accessToken);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Invalid email or password!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.icon}>🏥</h1>
                    <h2 style={styles.title}>MediSys</h2>
                    <p style={styles.subtitle}>
                        Medical Management System
                    </p>
                </div>
                <form onSubmit={handleLogin}>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Email Address
                        </label>
                        <input
                            style={styles.input}
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1
                        }}
                        type="submit"
                        disabled={loading}>
                        {loading ? '⏳ Logging in...' 
                            : '🔐 Login'}
                    </button>
                </form>
                <p style={styles.link}>
                    Don't have account?{' '}
                    <a href="/register" 
                        style={styles.anchor}>
                        Register here
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
        maxWidth: '420px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px'
    },
    icon: {
        fontSize: '48px',
        margin: '0'
    },
    title: {
        color: '#0D1B2A',
        margin: '8px 0 4px',
        fontSize: '28px'
    },
    subtitle: {
        color: '#888',
        margin: '0',
        fontSize: '14px'
    },
    field: { marginBottom: '20px' },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#333',
        fontWeight: '600',
        fontSize: '14px'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1.5px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box',
        outline: 'none'
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#1B998B',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px'
    },
    link: {
        textAlign: 'center',
        marginTop: '24px',
        color: '#666',
        fontSize: '14px'
    },
    anchor: {
        color: '#1B998B',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

export default Login;