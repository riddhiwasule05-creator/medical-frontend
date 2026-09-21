import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cards = [
        { icon: '👥', title: 'Patients',
          desc: 'Manage patient records',
          path: '/patients', color: '#1B998B' },
        { icon: '👨‍⚕️', title: 'Doctors',
          desc: 'Manage doctor profiles',
          path: '/doctors', color: '#0D1B2A' },
        { icon: '📅', title: 'Appointments',
          desc: 'Manage appointments',
          path: '/appointments', color: '#FF6B35' },
    ];

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>🏥 MediSys</h2>
                <div style={styles.navRight}>
                    <span style={styles.userInfo}>
                        👤 {user?.email}
                    </span>
                    <span style={styles.roleBadge}>
                        {user?.role}
                    </span>
                    <button
                        style={styles.logoutBtn}
                        onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div style={styles.content}>
                <h1 style={styles.welcome}>
                    Welcome back! 👋
                </h1>
                <p style={styles.subtitle}>
                    AI-Powered Medical Management System
                </p>
                <div style={styles.cards}>
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.card,
                                borderTop: `4px solid ${card.color}`
                            }}
                            onClick={() =>
                                navigate(card.path)}>
                            <div style={styles.cardIcon}>
                                {card.icon}
                            </div>
                            <h3 style={{
                                ...styles.cardTitle,
                                color: card.color
                            }}>
                                {card.title}
                            </h3>
                            <p style={styles.cardDesc}>
                                {card.desc}
                            </p>
                            <button style={{
                                ...styles.cardBtn,
                                backgroundColor: card.color
                            }}>
                                View {card.title} →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Arial, sans-serif'
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#0D1B2A',
        color: 'white'
    },
    logo: {
        color: '#1B998B',
        margin: 0,
        fontSize: '22px'
    },
    navRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    userInfo: {
        color: '#ccc',
        fontSize: '14px'
    },
    roleBadge: {
        backgroundColor: '#1B998B',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600'
    },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#FF6B35',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    content: { padding: '48px 32px' },
    welcome: {
        color: '#0D1B2A',
        fontSize: '32px',
        margin: '0 0 8px'
    },
    subtitle: {
        color: '#888',
        marginBottom: '40px'
    },
    cards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px'
    },
    card: {
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.2s'
    },
    cardIcon: { fontSize: '48px', marginBottom: '16px' },
    cardTitle: {
        fontSize: '20px',
        margin: '0 0 8px',
        fontWeight: '700'
    },
    cardDesc: {
        color: '#666',
        margin: '0 0 24px',
        fontSize: '14px'
    },
    cardBtn: {
        padding: '10px 20px',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px'
    }
};

export default Dashboard;