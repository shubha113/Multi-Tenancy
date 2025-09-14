import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, upgradeTenant, clearError, clearSuccess } from '../../store/authSlice';
import Button from '../ui/Button';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error, successMessage } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleUpgrade = () => {
    if (user?.tenant?.slug) {
      dispatch(upgradeTenant(user.tenant.slug));
    }
  };

  const canUpgrade = user?.role === 'admin' && user?.tenant?.subscription === 'free';

  return (
    <div className="header">
      <div>
        <h1 className="card-title">
          Welcome, {user?.name}
        </h1>
        <p className="text-sm" style={{ color: '#6b7280' }}>
          {user?.tenant?.name} - {user?.role}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {canUpgrade && (
          <Button
            onClick={handleUpgrade}
            variant="primary"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? 'Upgrading...' : 'Upgrade to Pro'}
          </Button>
        )}
        
        <Button
          onClick={handleLogout}
          variant="secondary"
          size="sm"
        >
          Logout
        </Button>
      </div>
      
      {error && (
        <div className="alert alert-error" style={{ marginTop: '16px' }}>
          {error}
          <button 
            onClick={() => dispatch(clearError())} 
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success" style={{ marginTop: '16px' }}>
          {successMessage}
          <button 
            onClick={() => dispatch(clearSuccess())} 
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;