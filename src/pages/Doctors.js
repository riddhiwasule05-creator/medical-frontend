import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await API.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            toast.error('Failed to fetch doctors!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>🏥 MediSys</h2>
                <button
                    style={styles.backBtn}
                    onClick={() => navigate('/dashboard')}>
                    ← Back to Dashboard
                </button>
            </nav>
            <div style={styles.content}>
                <h1 style={styles.title}>
                    👨‍⚕️ Doctors
                </h1>
                {loading ? (
                    <p>Loading doctors...</p>
                ) : doctors.length === 0 ? (
                    <p>No doctors found!</p>
                ) : (
                    <div style={styles.grid}>
                        {doctors.map((doctor) => (
                            <div key={doctor.id}
                                style={styles.card}>
                                <div style={styles.avatar}>
                                    👨‍⚕️
                                </div>
                                <h3 style={styles.name}>
                                    Dr. {doctor.firstName}{' '}
                                    {doctor.lastName}
                                </h3>
                                <p style={styles.spec}>
                                    {doctor.specialization
                                        || 'General'}
                                </p>
                                <p style={styles.info}>
                                    📧 {doctor.email}
                                </p>
                                <p style={styles.info}>
                                    💰 ₹{doctor.consultationFee
                                        || 'N/A'}
                                </p>
                                <p style={styles.info}>
                                    ⭐ {doctor.experienceYears
                                        || '0'} years exp
                                </p>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor:
                                        doctor.available
                                        ? '#1B998B'
                                        : '#FF6B35'
                                }}>
                                    {doctor.available
                                        ? '✅ Available'
                                        : '❌ Busy'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
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
        backgroundColor: '#0D1B2A'
    },
    logo: { color: '#1B998B', margin: 0 },
    backBtn: {
        padding: '8px 16px',
        backgroundColor: '#1B998B',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
    },
    content: { padding: '32px' },
    title: {
        color: '#0D1B2A',
        marginBottom: '24px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px'
    },
    card: {
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        textAlign: 'center'
    },
    avatar: {
        fontSize: '48px',
        marginBottom: '12px'
    },
    name: {
        color: '#0D1B2A',
        marginBottom: '8px'
    },
    spec: {
        color: '#1B998B',
        fontWeight: '600',
        marginBottom: '12px'
    },
    info: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '6px'
    },
    badge: {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '20px',
        color: 'white',
        fontSize: '12px',
        marginTop: '12px'
    }
};

export default Doctors;