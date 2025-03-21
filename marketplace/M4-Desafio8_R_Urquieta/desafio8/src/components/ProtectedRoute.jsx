import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function ProtectedRoute({ children }) {
    const { token } = useContext(UserContext);
    
    if (!token) {
        return <Navigate to="/login" />;
    }
    
    return children;
}

export default ProtectedRoute; 