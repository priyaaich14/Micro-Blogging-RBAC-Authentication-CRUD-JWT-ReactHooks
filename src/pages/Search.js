// import React, { useState } from 'react';
// import axios from 'axios';

// const Search = () => {
//   const [query, setQuery] = useState('');
//   const [type, setType] = useState('users');
//   const [results, setResults] = useState([]);
//   const [comment, setComment] = useState('');

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3070/api/search/${type}`, {
//         params: { query },
//         headers: { 'x-auth-token': localStorage.getItem('token') },
//       });
//       setResults(response.data);
//     } catch (error) {
//       console.error('Error searching:', error);
//     }
//   };

//   const handleFollow = async (userId) => {
//     try {
//       await axios.post(`http://localhost:3070/api/follow/${userId}`, {}, {
//         headers: { 'x-auth-token': localStorage.getItem('token') },
//       });
//       alert('Followed successfully');
//     } catch (error) {
//       console.error('Error following user:', error);
//     }
//   };

//   const handleLike = async (postId) => {
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${postId}/like`, {}, {
//         headers: { 'x-auth-token': localStorage.getItem('token') },
//       });
//       alert('Liked successfully');
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };

//   const handleComment = async (postId) => {
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${postId}/comment`, { text: comment }, {
//         headers: { 'x-auth-token': localStorage.getItem('token') },
//       });
//       alert('Commented successfully');
//       setComment('');
//     } catch (error) {
//       console.error('Error commenting on post:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Search</h2>
//       <div>
//         <input 
//           type="text" 
//           placeholder="Search..." 
//           value={query} 
//           onChange={(e) => setQuery(e.target.value)} 
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="users">Users</option>
//           <option value="posts">Posts</option>
//         </select>
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div>
//         {results.length > 0 ? (
//           results.map((result, index) => (
//             <div key={index}>
//               {type === 'users' ? (
//                 <div>
//                   <img src={result.profilePicture} alt="Profile" />
//                   <p>{result.username}</p>
//                   <p>{result.bio}</p>
//                   <button onClick={() => handleFollow(result._id)}>Follow</button>
//                   {result.posts && result.posts.map((post) => (
//                     <div key={post._id}>
//                       <p>{post.text}</p>
//                       {post.media && <img src={post.media} alt="Post media" />}
//                       <button onClick={() => handleLike(post._id)}>Like {post.likes.length}</button>
//                       <div>
//                         <input 
//                           type="text" 
//                           placeholder="Add a comment..." 
//                           value={comment} 
//                           onChange={(e) => setComment(e.target.value)} 
//                         />
//                         <button onClick={() => handleComment(post._id)}>Comment</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div>
//                   <p>{result.text}</p>
//                   {result.media && <img src={result.media} alt="Post media" />}
//                   <button onClick={() => handleLike(result._id)}>Like {result.likes.length}</button>
//                   <div>
//                     <input 
//                       type="text" 
//                       placeholder="Add a comment..." 
//                       value={comment} 
//                       onChange={(e) => setComment(e.target.value)} 
//                     />
//                     <button onClick={() => handleComment(result._id)}>Comment</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;


// import React, { useState } from 'react';
// import axios from 'axios';
// import PostItem from '../components/PostItem';

// const Search = () => {
//   const [query, setQuery] = useState('');
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     try {
//       const usersResponse = await axios.get(`http://localhost:3070/api/search/users?username=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });
//       setUsers(usersResponse.data);

//       const postsResponse = await axios.get(`http://localhost:3070/api/search/posts?keyword=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });
//       setPosts(postsResponse.data);
//     } catch (err) {
//       setError('Error searching');
//       console.error('Error searching:', err);
//     }
//   };

//   const handleFollow = async (userId) => {
//     try {
//       await axios.post(`http://localhost:3070/api/follow/${userId}`, {}, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });
//       alert('Followed user successfully');
//     } catch (error) {
//       console.error('Error following user:', error);
//       setError('Error following user');
//     }
//   };

//   return (
//     <div>
//       <h2>Search</h2>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//           placeholder="Search users or posts..."
//         />
//         <button type="submit">Search</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         <h3>Users</h3>
//         {users.map(user => (
//           <div key={user._id}>
//             <img src={`http://localhost:3070/uploads/${user.profilePicture}`} alt="Profile" />
//             <p>{user.username}</p>
//             <button onClick={() => handleFollow(user._id)}>Follow</button>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h3>Posts</h3>
//         {posts.map(post => (
//           <PostItem key={post._id} post={post} user={post.user} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Search;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PostItem from '../components/PostItem';

// const Search = () => {
//   const [query, setQuery] = useState('');
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [following, setFollowing] = useState([]);

//   useEffect(() => {
//     if (query) {
//       axios.get(`http://localhost:3070/api/search/users?username=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       }).then(response => {
//         setUsers(response.data);
//         // Fetch the following list to update the follow state
//         axios.get('http://localhost:3070/api/following', {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         }).then(res => {
//           setFollowing(res.data.map(f => f.user._id));
//         }).catch(err => {
//           console.error('Error fetching following list:', err);
//         });
//       }).catch(err => {
//         setError('Error fetching users');
//         console.error('Error fetching users:', err);
//       });

//       axios.get(`http://localhost:3070/api/search/posts?keyword=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       }).then(response => {
//         setPosts(response.data);
//       }).catch(err => {
//         setError('Error fetching posts');
//         console.error('Error fetching posts:', err);
//       });
//     } else {
//       setUsers([]);
//       setPosts([]);
//     }
//   }, [query]);

//   const handleFollow = async (userId) => {
//     try {
//       if (following.includes(userId)) {
//         await axios.delete(`http://localhost:3070/api/unfollow/${userId}`, {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         });
//         setFollowing(following.filter(id => id !== userId));
//       } else {
//         await axios.post(`http://localhost:3070/api/follow/${userId}`, {}, {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         });
//         setFollowing([...following, userId]);
//       }
//     } catch (error) {
//       console.error('Error following/unfollowing user:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Search</h2>
//       <input
//         type="text"
//         placeholder="Search users or posts"
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <h3>Users</h3>
//       {users.map(user => (
//         <div key={user._id}>
//           <img src={`http://localhost:3070/uploads/${user.profilePicture}`} alt="Profile" />
//           <p>{user.username}</p>
//           <button onClick={() => handleFollow(user._id)}>
//             {following.includes(user._id) ? 'Unfollow' : 'Follow'}
//           </button>
//         </div>
//       ))}
//       <h3>Posts</h3>
//       {posts.map(post => (
//         <PostItem key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default Search;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PostItem from '../components/PostItem';

// const Search = () => {
//   const [query, setQuery] = useState('');
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [following, setFollowing] = useState([]);

//   useEffect(() => {
//     if (query) {
//       axios.get(`http://localhost:3070/api/search/users?username=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       }).then(response => {
//         setUsers(response.data);
//         // Fetch the following list to update the follow state
//         axios.get('http://localhost:3070/api/following', {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         }).then(res => {
//           setFollowing(res.data.map(f => f.user._id));
//         }).catch(err => {
//           console.error('Error fetching following list:', err);
//         });
//       }).catch(err => {
//         setError('Error fetching users');
//         console.error('Error fetching users:', err);
//       });

//       axios.get(`http://localhost:3070/api/search/posts?keyword=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       }).then(response => {
//         setPosts(response.data);
//       }).catch(err => {
//         setError('Error fetching posts');
//         console.error('Error fetching posts:', err);
//       });
      
//       // Search for hashtags
//       axios.get(`http://localhost:3070/api/hashtags/search?hashtag=${query}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       }).then(response => {
//         setPosts(response.data); // This will set the posts fetched by hashtag search
//       }).catch(err => {
//         setError('Error fetching hashtags');
//         console.error('Error fetching hashtags:', err);
//       });

//     } else {
//       setUsers([]);
//       setPosts([]);
//     }
//   }, [query]);

//   const handleFollow = async (userId) => {
//     try {
//       if (following.includes(userId)) {
//         await axios.delete(`http://localhost:3070/api/unfollow/${userId}`, {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         });
//         setFollowing(following.filter(id => id !== userId));
//       } else {
//         await axios.post(`http://localhost:3070/api/follow/${userId}`, {}, {
//           headers: { 'x-auth-token': localStorage.getItem('token') }
//         });
//         setFollowing([...following, userId]);
//       }
//     } catch (error) {
//       console.error('Error following/unfollowing user:', error);
//     }
//   };

//   const handlePostUpdated = (updatedPost) => {
//     setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
//   };

//   return (
//     <div>
//       <h2>Search</h2>
//       <input
//         type="text"
//         placeholder="Search users, posts or hashtags"
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <h3>Users</h3>
//       {users.map(user => (
//         <div key={user._id}>
//           <img src={`http://localhost:3070/uploads/${user.profilePicture}`} alt="Profile" />
//           <p>{user.username}</p>
//           <button onClick={() => handleFollow(user._id)}>
//             {following.includes(user._id) ? 'Unfollow' : 'Follow'}
//           </button>
//         </div>
//       ))}
//       <h3>Posts</h3>
//       {posts.map(post => (
//         <PostItem key={post._id} post={post} onPostUpdated={handlePostUpdated} />
//       ))}
//     </div>
//   );
// };

// export default Search;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';

const Search = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          if (query.startsWith('#')) {
            // Search for hashtags
            const response = await axios.get(`http://localhost:3070/api/hashtags/search?keyword=${query.substring(1)}`, {
              headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setHashtags(response.data);
          } else {
            // Search for users
            const userResponse = await axios.get(`http://localhost:3070/api/search/users?username=${query}`, {
              headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setUsers(userResponse.data);

            // Fetch the following list to update the follow state
            const followingResponse = await axios.get('http://localhost:3070/api/following', {
              headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setFollowing(followingResponse.data.map(f => f.user._id));

            // Search for posts
            const postResponse = await axios.get(`http://localhost:3070/api/search/posts?keyword=${query}`, {
              headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setPosts(postResponse.data);
          }
        } catch (err) {
          setError('Error fetching search results');
          console.error('Error fetching search results:', err);
        }
      } else {
        setUsers([]);
        setPosts([]);
        setHashtags([]);
      }
    };

    fetchData();
  }, [query]);

  const handleFollow = async (userId) => {
    try {
      if (following.includes(userId)) {
        await axios.delete(`http://localhost:3070/api/unfollow/${userId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setFollowing(following.filter(id => id !== userId));
      } else {
        await axios.post(`http://localhost:3070/api/follow/${userId}`, {}, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setFollowing([...following, userId]);
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search users, posts, or #hashtags"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {query && (
        <>
          {query.startsWith('#') ? (
            <>
              <h3>Hashtags</h3>
              {hashtags.length > 0 ? (
                hashtags.map((hashtag, index) => (
                  <div key={index}>
                    <p>#{hashtag.hashtag} ({hashtag.count} posts)</p>
                    {hashtag.posts.map(post => (
                      <PostItem key={post._id} post={post} onPostUpdated={() => {}} />
                    ))}
                  </div>
                ))
              ) : (
                <p>No hashtags found</p>
              )}
            </>
          ) : (
            <>
              <h3>Users</h3>
              {users.length > 0 ? (
                users.map(user => (
                  <div key={user._id}>
                    <img src={`http://localhost:3070/uploads/${user.profilePicture}`} alt="Profile" />
                    <p>{user.username}</p>
                    <button onClick={() => handleFollow(user._id)}>
                      {following.includes(user._id) ? 'Unfollow' : 'Follow'}
                    </button>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
              <h3>Posts</h3>
              {posts.length > 0 ? (
                posts.map(post => (
                  <PostItem key={post._id} post={post} onPostUpdated={() => {}} />
                ))
              ) : (
                <p>No posts found</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
