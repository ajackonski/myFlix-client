import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo as updateUserInfoAction, deleteUser as deleteUserAction, logoutUser } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { updateUserInfo, deleteUser } from '../../../apiService'; // Use API service functions

const ProfileView = () => {
  const { userInfo, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Fetch the user profile when the component mounts
  useEffect(() => {
    setUsername(userInfo.Username);
    setEmail(userInfo.Email);
    setBirthday(userInfo.Birthday ? userInfo.Birthday.slice(0, 10) : ''); // Handling date format (YYYY-MM-DD)
  }, [userInfo]);

  const handleUpdate = () => {
    const updatedData = { Username: username, Email: email, Birthday: birthday };
    updateUserInfo(userInfo.Username, updatedData, token)
      .then(response => {
        dispatch(updateUserInfoAction(response));
        alert('Profile updated successfully');
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          alert(`Validation errors: ${error.response.data.errors.map(e => e.msg).join(', ')}`);
        } else {
          console.error('Error updating profile: ', error);
        }
      });
  };

  const handleDelete = () => {
    deleteUser(userInfo.Username, token)
      .then(() => {
        dispatch(deleteUserAction());
        alert('Account deleted successfully');
        window.location.href = '/'; // Redirect to main view after deletion
      })
      .catch(error => console.error('Error deleting account: ', error));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = '/'; // Redirect to main view after logout
  };

  return (
    <div>
      {/* Navigation Bar - Reused from MovieView */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-start"> {/* align-items-start for vertical alignment */}
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Profile Form */}
      <div className="container mt-5">
        <h2 className="mb-4 text-light">Profile</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Username</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birthday" className="form-label text-light">Birthday</label>
            <input 
              type="date" 
              className="form-control" 
              id="birthday" 
              value={birthday} 
              onChange={(e) => setBirthday(e.target.value)} 
            />
          </div>

          <button type="button" className="btn btn-primary me-2" onClick={handleUpdate}>Update Profile</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
