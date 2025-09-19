import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const ProtectedRoute = () => {
    const { token } = useContext(AuthContext);

    if (!token) {
        // Redirect to the /login page
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;