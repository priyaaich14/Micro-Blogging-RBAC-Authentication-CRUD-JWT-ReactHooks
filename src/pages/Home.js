// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Post from '../components/Post';

// // function Home() {
// //   const [posts, setPosts] = useState([]);
// //   const [trendingHashtags, setTrendingHashtags] = useState([]);

// //   const fetchPosts = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3070/api/posts', {
// //         headers: { 'Authorization': localStorage.getItem('token') }
// //       });
// //       setPosts(response.data);
// //     } catch (err) {
// //       console.error('Error fetching posts', err);
// //     }
// //   };

// //   const fetchTrendingHashtags = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3070/api/hashtags/trending', {
// //         headers: { 'Authorization': localStorage.getItem('token') }
// //       });
// //       setTrendingHashtags(response.data);
// //     } catch (err) {
// //       console.error('Error fetching trending hashtags', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //     fetchTrendingHashtags();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Home</h2>
// //       <div className="trending-hashtags">
// //         <h3>Trending Hashtags</h3>
// //         <ul>
// //           {trendingHashtags.map((hashtag) => (
// //             <li key={hashtag._id}>#{hashtag.name}</li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div className="posts">
// //         {posts.map((post) => (
// //           <Post key={post._id} post={post} refreshPosts={fetchPosts} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Post from '../components/Post';

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [trendingHashtags, setTrendingHashtags] = useState([]);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3070/api/posts', {
//         headers: { 'Authorization': localStorage.getItem('token') }
//       });
//       setPosts(response.data);
//     } catch (err) {
//       console.error('Error fetching posts', err);
//     }
//   };

//   const fetchTrendingHashtags = async () => {
//     try {
//       const response = await axios.get('http://localhost:3070/api/hashtags/trending', {
//         headers: { 'Authorization': localStorage.getItem('token') }
//       });
//       setTrendingHashtags(response.data);
//     } catch (err) {
//       console.error('Error fetching trending hashtags', err);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//     fetchTrendingHashtags();
//   }, []);

//   return (
//     <div>
//       <h2>Home</h2>
//       <div className="trending-hashtags">
//         <h3>Trending Hashtags</h3>
//         <ul>
//           {trendingHashtags.map((hashtag) => (
//             <li key={hashtag._id}>#{hashtag.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="posts">
//         {posts.map((post) => (
//           <Post key={post._id} post={post} refreshPosts={fetchPosts} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3070/api/posts', {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(response => {
      setPosts(response.data);
    }).catch(err => {
      setError('Error fetching posts');
      console.error('Error fetching posts:', err);
    });
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
  };

  return (
    <div>
      <h2>Home</h2>
      <PostForm onPostCreated={handlePostCreated} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          onPostUpdated={handlePostUpdated} // Pass the function here
          user={post.user} // Pass user details to PostItem
        />
      ))}
    </div>
  );
};

export default Home;

