import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await API.get('/patients');
            setPatients(response.data);
        } catch (error) {
            toast.error('Failed to fetch patients!');
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
                <h1 style={styles.title}>👥 Patients</h1>
                {loading ? (
                    <p style={styles.loading}>
                        Loading patients...
                    </p>
                ) : patients.length === 0 ? (
                    <p style={styles.empty}>
                        No patients found!
                    </p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Blood Group</th>
                                <th style={styles.th}>Gender</th>
                                <th style={styles.th}>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}
                                    style={styles.tr}>
                                    <td style={styles.td}>
                                        {patient.id}
                                    </td>
                                    <td style={styles.td}>
                                        {patient.firstName}{' '}
                                        {patient.lastName}
                                    </td>
                                    <td style={styles.td}>
                                        {patient.email}
                                    </td>
                                    <td style={styles.td}>
                                        {patient.bloodGroup
                                            || 'N/A'}
                                    </td>
                                    <td style={styles.td}>
                                        {patient.gender
                                            || 'N/A'}
                                    </td>
                                    <td style={styles.td}>
                                        {patient.phone
                                            || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
        backgroundColor: '#0D1B2A',
        color: 'white'
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
    loading: { color: '#666' },
    empty: { color: '#666' },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    },
    thead: { backgroundColor: '#0D1B2A' },
    th: {
        padding: '14px 16px',
        color: 'white',
        textAlign: 'left',
        fontSize: '14px'
    },
    tr: { borderBottom: '1px solid #eee' },
    td: {
        padding: '12px 16px',
        color: '#333',
        fontSize: '14px'
    }
};

export default Patients;