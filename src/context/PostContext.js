import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3070/api/posts', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts', err);
      toast('Error fetching posts', { type: 'error' });
    }
  };

  const likePost = async (postId) => {
    try {
      await axios.post(`http://localhost:3070/api/posts/${postId}/like`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchPosts(); // Re-fetch posts to update the like count
    } catch (err) {
      toast('Error liking post', { type: 'error' });
    }
  };

  const addCommentToPost = async (postId, comment) => {
    try {
      await axios.post(`http://localhost:3070/api/posts/${postId}/comment`, { text: comment }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchPosts(); // Re-fetch posts to update comments
    } catch (err) {
      toast('Error adding comment', { type: 'error' });
    }
  };

  const editPost = async (postId, text) => {
    try {
      await axios.put(`http://localhost:3070/api/posts/${postId}`, { text }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchPosts(); // Re-fetch posts to update edited post
    } catch (err) {
      toast('Error editing post', { type: 'error' });
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3070/api/posts/${postId}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchPosts(); // Re-fetch posts after deletion
    } catch (err) {
      toast('Error deleting post', { type: 'error' });
    }
  };

  const uploadMediaToPost = async (postId, media) => {
    const formData = new FormData();
    formData.append('media', media);
    try {
      await axios.post(`http://localhost:3070/api/posts/${postId}/media`, formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchPosts(); // Re-fetch posts to update media
    } catch (err) {
      toast('Error uploading media', { type: 'error' });
    }
  };

  return (
    <PostContext.Provider value={{
      posts,
      likePost,
      addCommentToPost,
      editPost,
      deletePost,
      uploadMediaToPost,
      fetchPosts
    }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
