import { useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../ui/Loading';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  if (!user && isLoading) {
    return <Loading message="Verifying authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;