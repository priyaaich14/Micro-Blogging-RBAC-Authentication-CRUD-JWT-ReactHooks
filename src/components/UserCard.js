// import React from 'react';
// import { Link } from 'react-router-dom';

// function UserCard({ user }) {
//   return (
//     <div>
//       <img src={user.profilePicture} alt="Profile" />
//       <h4><Link to={`/profile/${user._id}`}>{user.username}</Link></h4>
//       <p>{user.bio}</p>
//     </div>
//   );
// }

// export default UserCard;


// src/components/UserCard.js
import React from 'react';

const UserCard = ({ user }) => (
  <div>
    <img src={user.profilePicture} alt="Profile" />
    <h3>{user.username}</h3>
    <p>{user.bio}</p>
  </div>
);

export default UserCard;
