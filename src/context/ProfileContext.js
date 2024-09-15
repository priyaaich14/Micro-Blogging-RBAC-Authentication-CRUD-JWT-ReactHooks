import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { state: authState } = useContext(AuthContext);
  const [profile, setProfile] = useState({ profilePic: null, bio: '', posts: [] });

  useEffect(() => {
    if (authState.user) {
      fetchProfileData();
      fetchPosts();
    }
  }, [authState.user]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:3070/api/users/me', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setProfile(prevState => ({ ...prevState, profilePic: response.data.profilePic, bio: response.data.bio }));
    } catch (err) {
      console.error('Error fetching profile data', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3070/api/posts/user', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setProfile(prevState => ({ ...prevState, posts: response.data }));
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  };

  const updateProfile = async (bio, profilePic) => {
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      await axios.put('http://localhost:3070/api/users/me', formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchProfileData();
    } catch (err) {
      console.error('Error updating profile', err);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
