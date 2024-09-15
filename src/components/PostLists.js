// src/components/PostList.js
import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostItem key={post._id} post={post} />
    ))}
  </div>
);

export default PostList;
