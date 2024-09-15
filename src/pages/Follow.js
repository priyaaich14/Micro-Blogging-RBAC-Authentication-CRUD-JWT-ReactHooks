import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

function Follow() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:3070/api/followers', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setFollowers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await axios.get('http://localhost:3070/api/following', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setFollowing(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, []);

  return (
    <div>
      <h2>Followers</h2>
      {followers.map(follower => (
        <UserCard key={follower._id} user={follower.user} />
      ))}
      <h2>Following</h2>
      {following.map(follow => (
        <UserCard key={follow._id} user={follow.user} />
      ))}
    </div>
  );
}

export default Follow;
