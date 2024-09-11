import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (userInfo) {
      navigate('/movies'); // Redirect to movies when logged in
    }
  }, [userInfo, navigate]);

  return (
    <div className="main-view-container">
      <h1 className="app-title">MyFlix</h1>
      {!userInfo ? (
        <div className="auth-container">
          <div className="login-container">
            <LoginView />
          </div>
          <div className="signup-container">
            <SignupView />
          </div>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default MainView;
