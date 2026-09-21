import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await
                API.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            toast.error(
                'Failed to fetch appointments!');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'CONFIRMED': return '#1B998B';
            case 'PENDING':   return '#FF6B35';
            case 'CANCELLED': return '#CC3333';
            case 'COMPLETED': return '#0D1B2A';
            default: return '#666';
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
                    📅 Appointments
                </h1>
                {loading ? (
                    <p style={styles.loading}>
                        Loading appointments...
                    </p>
                ) : appointments.length === 0 ? (
                    <div style={styles.emptyBox}>
                        <p style={styles.emptyText}>
                            No appointments found!
                        </p>
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>
                                    ID
                                </th>
                                <th style={styles.th}>
                                    Patient
                                </th>
                                <th style={styles.th}>
                                    Doctor
                                </th>
                                <th style={styles.th}>
                                    Specialization
                                </th>
                                <th style={styles.th}>
                                    Scheduled At
                                </th>
                                <th style={styles.th}>
                                    Status
                                </th>
                                <th style={styles.th}>
                                    Notes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((apt) => (
                                <tr
                                    key={apt.id}
                                    style={styles.tr}>
                                    <td style={styles.td}>
                                        {apt.id}
                                    </td>
                                    <td style={styles.td}>
                                        {apt.patientName}
                                    </td>
                                    <td style={styles.td}>
                                        {apt.doctorName}
                                    </td>
                                    <td style={styles.td}>
                                        {apt.specialization
                                            || 'N/A'}
                                    </td>
                                    <td style={styles.td}>
                                        {apt.scheduledAt}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            backgroundColor:
                                                getStatusColor(
                                                apt.status),
                                            color: 'white',
                                            padding:
                                                '4px 12px',
                                            borderRadius:
                                                '20px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>
                                            {apt.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        {apt.notes || 'N/A'}
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
        backgroundColor: '#0D1B2A'
    },
    logo: {
        color: '#1B998B',
        margin: 0,
        fontSize: '22px'
    },
    backBtn: {
        padding: '8px 16px',
        backgroundColor: '#1B998B',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    content: { padding: '32px' },
    title: {
        color: '#0D1B2A',
        marginBottom: '24px',
        fontSize: '28px'
    },
    loading: { color: '#666' },
    emptyBox: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    },
    emptyText: {
        color: '#666',
        fontSize: '18px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    },
    thead: {
        backgroundColor: '#0D1B2A'
    },
    th: {
        padding: '14px 16px',
        color: 'white',
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '600'
    },
    tr: {
        borderBottom: '1px solid #eee'
    },
    td: {
        padding: '12px 16px',
        color: '#333',
        fontSize: '14px'
    }
};

export default Appointments;