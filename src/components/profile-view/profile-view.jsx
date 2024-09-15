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
    setBirthday(userInfo.Birthday);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyFlix</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      {/* Profile view content */}
    </div>
  );
};
export default ProfileView;
