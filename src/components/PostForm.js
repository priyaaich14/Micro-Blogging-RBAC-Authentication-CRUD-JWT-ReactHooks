// import React, { useState } from 'react';
// import axios from 'axios';

// function PostForm() {
//   const [text, setText] = useState('');
//   const [media, setMedia] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('text', text);
//     if (media) formData.append('media', media);

//     try {
//       await axios.post('http://localhost:3070/api/posts', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data',
//           'x-auth-token': localStorage.getItem('token')
//         }
//       });
//       setText('');
//       setMedia(null);
//       alert('Post created successfully!');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea 
//         placeholder="What's on your mind?" 
//         value={text} 
//         onChange={(e) => setText(e.target.value)} 
//       />
//       <input 
//         type="file" 
//         onChange={(e) => setMedia(e.target.files[0])} 
//       />
//       <button type="submit">Post</button>
//     </form>
//   );
// }

// export default PostForm;


// // src/components/PostForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const PostForm = ({ onPostCreated }) => {
//   const [text, setText] = useState('');
//   const [media, setMedia] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('text', text);
//     if (media) formData.append('media', media);

//     axios.post('http://localhost:3070/api/posts', formData, {
//       headers: { 'x-auth-token': localStorage.getItem('token') }
//     }).then(response => {
//       onPostCreated(response.data);
//       setText('');
//       setMedia(null);
//     }).catch(err => {
//       setError('Error creating post');
//       console.error('Error creating post:', err);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="What's on your mind?"
//       />
//       <input
//         type="file"
//         onChange={(e) => setMedia(e.target.files[0])}
//       />
//       <button type="submit">Post</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// };

// export default PostForm;
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (media) {
      formData.append('media', media);
    }

    try {
      const response = await axios.post('http://localhost:3070/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      onPostCreated(response.data);
      setText('');
      setMedia(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="file"
        onChange={e => setMedia(e.target.files[0])}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
