import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const PrivateRoute = ({ children }) => {
    const { isAdminAuth } = usePortfolio();

    return isAdminAuth ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
