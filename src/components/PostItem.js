// // // src/components/PostItem.js
// // import React, { useContext } from 'react';
// // import AuthContext from '../context/AuthContext';
// // import axios from 'axios';

// // const PostItem = ({ post }) => {
// //   const { state } = useContext(AuthContext);

// //   const handleLike = () => {
// //     axios.post(`http://localhost:3070/api/posts/${post._id}/like`, {}, {
// //       headers: { 'x-auth-token': localStorage.getItem('token') }
// //     }).then(response => {
// //       // Handle like success
// //     });
// //   };

// //   return (
// //     <div>
// //       <h4>{post.user.username}</h4>
// //       <p>{post.text}</p>
// //       {post.media && <img src={post.media} alt="Post media" />}
// //       <button onClick={handleLike}>Like {post.likes.length}</button>
// //       <div>
// //         {post.comments.map(comment => (
// //           <div key={comment._id}>
// //             <strong>{comment.user.username}</strong>
// //             <p>{comment.text}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PostItem;


// import React, { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';

// const PostItem = ({ post }) => {
//   const { state } = useContext(AuthContext);
//   const [comment, setComment] = useState('');

//   const handleLike = () => {
//     axios.post(`http://localhost:3070/api/posts/${post._id}/like`, {}, {
//       headers: { 'x-auth-token': localStorage.getItem('token') }
//     }).then(response => {
//       // Handle like success
//     });
//   };

//   const handleComment = () => {
//     axios.post(`http://localhost:3070/api/posts/${post._id}/comment`, { text: comment }, {
//       headers: { 'x-auth-token': localStorage.getItem('token') }
//     }).then(response => {
//       // Handle comment success
//     });
//   };

//   return (
//     <div>
//       <h3>{post.text}</h3>
//       {post.media && <img src={`http://localhost:3070/uploads/${post.media}`} alt="Post media" />}
//       <button onClick={handleLike}>Like {post.likes.length}</button>
//       <div>
//         {post.comments.map(comment => (
//           <div key={comment._id}>{comment.text}</div>
//         ))}
//         <input
//           type="text"
//           value={comment}
//           onChange={e => setComment(e.target.value)}
//           placeholder="Add a comment..."
//         />
//         <button onClick={handleComment}>Comment</button>
//       </div>
//     </div>
//   );
// };

// export default PostItem;
import React, { useState } from 'react';
import axios from 'axios';

const PostItem = ({ post, onPostUpdated }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3070/api/posts/${post._id}/like`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      onPostUpdated(response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3070/api/posts/${post._id}/comment`, { text: commentText }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setComments([...comments, response.data]);
      setCommentText(''); // Clear the comment input after successful comment
      onPostUpdated(response.data);
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <div>
      <h4>{post.user.username}</h4>
      <p>{post.text}</p>
      {post.media && <img src={`http://localhost:3070/uploads/${post.media}`} alt="Post media" />}
      <button onClick={handleLike}>{post.likes.length} Likes</button>
      <div>
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleComment}>Comment</button>
      </div>
      <div>
        {comments.map(comment => (
          <p key={comment._id}>{comment.text}</p>
        ))}
      </div>
    </div>
  );
};

export default PostItem;
