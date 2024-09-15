// // import React, { useContext, useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import AuthContext from '../context/AuthContext';
// // import axios from 'axios';
// // import Post from '../components/Post';

// // function Profile() {
// //   const { state } = useContext(AuthContext);
// //   const [posts, setPosts] = useState([]);
// //   const [newPost, setNewPost] = useState('');
// //   const [error, setError] = useState('');

// //   const formatDateToIST = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
// //   };

// //   const checkPasswordUpdateReminder = () => {
// //     const passwordAge = Date.now() - new Date(state.user.passwordChangedAt).getTime();
// //     const daysSinceLastUpdate = passwordAge / (1000 * 60 * 60 * 24);
// //     return daysSinceLastUpdate > 30;
// //   };

// //   const fetchPosts = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3070/api/posts/user', {
// //         headers: { 'Authorization': localStorage.getItem('token') }
// //       });
// //       setPosts(response.data);
// //     } catch (err) {
// //       console.error('Error fetching posts', err);
// //     }
// //   };

// //   const handleNewPost = async (e) => {
// //     e.preventDefault();
// //     if (!newPost.trim()) {
// //       setError('Post cannot be empty');
// //       return;
// //     }
// //     try {
// //       await axios.post('http://localhost:3070/api/posts', { text: newPost }, {
// //         headers: { 'Authorization': localStorage.getItem('token') }
// //       });
// //       setNewPost('');
// //       setError('');
// //       fetchPosts();
// //     } catch (err) {
// //       console.error('Error creating post', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []); // Fetch posts once when the component mounts

// //   if (!state.user) {
// //     return <p>Loading...</p>;
// //   }

// //   return (
// //     <div>
// //       <h2>Profile Page</h2>
// //       <p>Email - {state.user.email}</p>
// //       <p>Register Date - {formatDateToIST(state.user.createdAt)}</p>
// //       {checkPasswordUpdateReminder() && (
// //         <p style={{ color: 'red' }}>
// //           It has been over 30 days since you last changed your password. Please update your password in the <Link to="/settings">Settings</Link> page.
// //         </p>
// //       )}
// //       <div className="new-post">
// //         <form onSubmit={handleNewPost}>
// //           <input
// //             type="text"
// //             placeholder="What's on your mind?"
// //             value={newPost}
// //             onChange={(e) => setNewPost(e.target.value)}
// //           />
// //           <button type="submit">Post</button>
// //         </form>
// //         {error && <p style={{ color: 'red' }}>{error}</p>}
// //       </div>
// //       <div className="posts">
// //         {posts.map((post) => (
// //           <Post key={post._id} post={post} refreshPosts={fetchPosts} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Profile;



// // import React, { useContext, useState, useEffect } from 'react';
// // import AuthContext from '../context/AuthContext';
// // import axios from 'axios';
// // import Post from '../components/Post';

// // function Profile() {
// //   const { state } = useContext(AuthContext);
// //   const [posts, setPosts] = useState([]);
// //   const [newPost, setNewPost] = useState('');
// //   const [error, setError] = useState('');
// //   const [profilePic, setProfilePic] = useState(null);
// //   const [bio, setBio] = useState('');

// //   const formatDateToIST = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
// //   };

// //   const fetchProfileData = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3070/api/users/me', {
// //         headers: { 'x-auth-token': localStorage.getItem('token') }
// //       });
// //       setProfilePic(response.data.profilePic);
// //       setBio(response.data.bio);
// //     } catch (err) {
// //       console.error('Error fetching profile data', err);
// //     }
// //   };

// //   const fetchPosts = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3070/api/posts/user', {
// //         headers: { 'x-auth-token': localStorage.getItem('token') }
// //       });
// //       setPosts(response.data);
// //     } catch (err) {
// //       console.error('Error fetching posts', err);
// //     }
// //   };

// //   const handleNewPost = async (e) => {
// //     e.preventDefault();
// //     if (!newPost.trim()) {
// //       setError('Post cannot be empty');
// //       return;
// //     }
// //     try {
// //       await axios.post('http://localhost:3070/api/posts', { text: newPost }, {
// //         headers: { 'x-auth-token': localStorage.getItem('token') }
// //       });
// //       setNewPost('');
// //       setError('');
// //       fetchPosts();
// //     } catch (err) {
// //       console.error('Error creating post', err);
// //     }
// //   };

// //   const handleProfileUpdate = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();
// //     formData.append('profilePic', profilePic);
// //     formData.append('bio', bio);

// //     try {
// //       await axios.put('http://localhost:3070/api/users/me', formData, {
// //         headers: {
// //           'x-auth-token': localStorage.getItem('token'),
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       });
// //       fetchProfileData();
// //     } catch (err) {
// //       console.error('Error updating profile', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfileData();
// //     fetchPosts();
// //   }, []); // Fetch data once when the component mounts

// //   if (!state.user) {
// //     return <p>Loading...</p>;
// //   }

// //   return (
// //     <div>
// //       <h2>Profile Page</h2>
// //       <img src={profilePic} alt="Profile" />
// //       <form onSubmit={handleProfileUpdate}>
// //         <input
// //           type="file"
// //           onChange={(e) => setProfilePic(e.target.files[0])}
// //         />
// //         <textarea
// //           placeholder="Bio"
// //           value={bio}
// //           onChange={(e) => setBio(e.target.value)}
// //         />
// //         <button type="submit">Update Profile</button>
// //       </form>
// //       <p>Email - {state.user.email}</p>
// //       <p>Register Date - {formatDateToIST(state.user.createdAt)}</p>
// //       <form onSubmit={handleNewPost}>
// //         <textarea
// //           placeholder="What's on your mind?"
// //           value={newPost}
// //           onChange={(e) => setNewPost(e.target.value)}
// //         />
// //         <button type="submit">Post</button>
// //       </form>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       <div className="posts">
// //         {posts.map((post) => (
// //           <Post key={post._id} post={post} refreshPosts={fetchPosts} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Profile;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Post from '../components/Post';

// function Profile() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3070/api/users/${id}`, {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         });
//         setUser(response.data.user);
//         setPosts(response.data.posts);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   return (
//     <div>
//       {user && (
//         <div>
//           <img src={user.profilePicture} alt="Profile" />
//           <h2>{user.username}</h2>
//           <p>{user.bio}</p>
//         </div>
//       )}
//       <h3>Posts</h3>
//       {posts.map(post => (
//         <Post key={post._id} post={post} />
//       ))}
//     </div>
//   );
// }

// export default Profile;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:3070/api/users/${userId}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(response => {
      setProfile(response.data);
    }).catch(err => {
      setError('Error fetching profile');
      console.error('Error fetching profile:', err);
    });

    axios.get(`http://localhost:3070/api/posts`, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(response => {
      setPosts(response.data.filter(post => post.user._id === userId));
    }).catch(err => {
      setError('Error fetching posts');
      console.error('Error fetching posts:', err);
    });
  }, []);

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{profile.username}'s Profile</h2>
      <img src={`http://localhost:3070/uploads/${profile.profilePicture}`} alt="Profile" />
      <p>{profile.bio}</p>
      <h3>Posts</h3>
      {posts.map(post => (
        <PostItem key={post._id} post={post} onPostUpdated={handlePostUpdated} />
      ))}
    </div>
  );
};

export default Profile;
