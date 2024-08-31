import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(userContext); 

  // Loading state or fallback
  if (user === undefined) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default ProtectedRoute;
