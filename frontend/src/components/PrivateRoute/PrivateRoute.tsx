import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export const PrivateRoute = ({children}: {children: ReactNode}) => {
    const {token} = useAuth();

    return token ? children : <Navigate to="/login" replace />;
}