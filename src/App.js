import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } 
    from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } 
    from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/login"
                        element={<Login />} 
                    />
                    <Route 
                        path="/register"
                        element={<Register />} 
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/patients"
                        element={
                            <PrivateRoute>
                                <Patients />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/doctors"
                        element={
                            <PrivateRoute>
                                <Doctors />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/appointments"
                        element={
                            <PrivateRoute>
                                <Appointments />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/"
                        element={<Navigate to="/login" />} 
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right"/>
        </AuthProvider>
    );
}

export default App;