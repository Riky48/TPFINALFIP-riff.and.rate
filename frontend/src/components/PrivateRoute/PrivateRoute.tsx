import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useAuth();

    if (loading) return null; 

    return token ? children : <Navigate to="/login" replace />;
};
