// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function Post({ post, refreshPosts }) {
//   const [newComment, setNewComment] = useState('');
//   const [error, setError] = useState('');

//   const handleLike = async () => {
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${post._id}/like`);
//       refreshPosts();
//     } catch (err) {
//       toast('Error liking post', { type: 'error' });
//     }
//   };

//   const handleComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) {
//       setError('Comment cannot be empty');
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${post._id}/comment`, { text: newComment });
//       setNewComment('');
//       setError('');
//       refreshPosts();
//     } catch (err) {
//       toast('Error adding comment', { type: 'error' });
//     }
//   };

//   return (
//     <div className="post">
//       <h3>{post.user.username}</h3>
//       <p>{post.text}</p>
//       <button onClick={handleLike}>Like ({post.likes.length})</button>
//       <form onSubmit={handleComment}>
//         <input
//           type="text"
//           placeholder="Add a comment"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button type="submit">Comment</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className="comments">
//         {post.comments.map((comment) => (
//           <div key={comment._id} className="comment">
//             <p>{comment.user.username}: {comment.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Post;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function Post({ post, refreshPosts }) {
//   const [newComment, setNewComment] = useState('');
//   const [error, setError] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPost, setEditedPost] = useState(post.text);
//   const [media, setMedia] = useState(null);

//   const handleLike = async () => {
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${post._id}/like`);
//       refreshPosts();
//     } catch (err) {
//       toast('Error liking post', { type: 'error' });
//     }
//   };

//   const handleComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) {
//       setError('Comment cannot be empty');
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${post._id}/comment`, { text: newComment });
//       setNewComment('');
//       setError('');
//       refreshPosts();
//     } catch (err) {
//       toast('Error adding comment', { type: 'error' });
//     }
//   };

//   const handleEdit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3070/api/posts/${post._id}`, { text: editedPost }, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });
//       setIsEditing(false);
//       refreshPosts();
//     } catch (err) {
//       toast('Error editing post', { type: 'error' });
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3070/api/posts/${post._id}`, {
//         headers: { 'x-auth-token': localStorage.getItem('token') }
//       });
//       refreshPosts();
//     } catch (err) {
//       toast('Error deleting post', { type: 'error' });
//     }
//   };

//   const handleMediaUpload = async (e) => {
//     const formData = new FormData();
//     formData.append('media', media);
//     try {
//       await axios.post(`http://localhost:3070/api/posts/${post._id}/media`, formData, {
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       refreshPosts();
//     } catch (err) {
//       toast('Error uploading media', { type: 'error' });
//     }
//   };

//   return (
//     <div className="post">
//       <h3>{post.user.username}</h3>
//       {isEditing ? (
//         <form onSubmit={handleEdit}>
//           <textarea
//             value={editedPost}
//             onChange={(e) => setEditedPost(e.target.value)}
//           />
//           <button type="submit">Save</button>
//           <button onClick={() => setIsEditing(false)}>Cancel</button>
//         </form>
//       ) : (
//         <>
//           <p>{post.text}</p>
//           {post.media && <img src={post.media} alt="Post media" />}
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//           <button onClick={handleDelete}>Delete</button>
//         </>
//       )}
//       <button onClick={handleLike}>Like ({post.likes.length})</button>
//       <form onSubmit={handleComment}>
//         <input
//           type="text"
//           placeholder="Add a comment"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button type="submit">Comment</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className="comments">
//         {post.comments.map((comment) => (
//           <div key={comment._id} className="comment">
//             <p>{comment.user.username}: {comment.text}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleMediaUpload}>
//         <input
//           type="file"
//           onChange={(e) => setMedia(e.target.files[0])}
//         />
//         <button type="submit">Upload Media</button>
//       </form>
//     </div>
//   );
// }

// export default Post;


import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

function Post({ post }) {
  const [likes, setLikes] = useState(post.likesCount);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:3070/api/posts/${post._id}/like`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setLikes(likes + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3070/api/posts/${post._id}/comment`, {
        text: newComment
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setComments(response.data);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post">
      <h4>{post.user.username}</h4>
      <p>{post.text}</p>
      {post.media && <img src={`http://localhost:3070/${post.media}`} alt="Post media" />}
      <button onClick={handleLike}>Like {likes}</button>
      <div>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
        <input 
          type="text" 
          placeholder="Add a comment..." 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
        />
        <button onClick={handleComment}>Comment</button>
      </div>
    </div>
  );
}

export default Post;
