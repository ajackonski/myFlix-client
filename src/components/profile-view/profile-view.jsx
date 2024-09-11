import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo, deleteUser } from '../../apiService';
import { updateUserInfo as updateUserInfoAction, deleteUser as deleteUserAction } from '../../redux/slices/userSlice';

const ProfileView = () => {
  const { userInfo, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(userInfo.Username);
  const [email, setEmail] = useState(userInfo.Email);
  const [birthday, setBirthday] = useState(userInfo.Birthday);

  const handleUpdate = () => {
    const updatedData = { Username: username, Email: email, Birthday: birthday };
    updateUserInfo(userInfo.Username, updatedData, token)
      .then((data) => {
        dispatch(updateUserInfoAction(data));
        alert('Profile updated successfully');
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    deleteUser(userInfo.Username, token)
      .then(() => {
        dispatch(deleteUserAction());
        alert('Account deleted successfully');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Profile Information</h1>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Birthday:</label>
      <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default ProfileView;
