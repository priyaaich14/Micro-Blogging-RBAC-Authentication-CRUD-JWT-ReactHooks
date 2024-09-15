import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import configureDB from './config/db.js';
import authMiddleware from './app/middlewares/authMiddleware.js';

import { register, login, forgotPassword, resetPassword, updatePassword,validateToken } from './app/controllers/authController.js';
import { getProfile, getOwnProfile, updateProfile } from './app/controllers/profileController.js';
import { createPost, updatePost, deletePost, getPosts, likePost, commentOnPost, getTrendingPosts, getTrendingHashtags, deleteComment, getPostById } from './app/controllers/postController.js';
import { followUser, unfollowUser, getFollowers, getFollowing } from './app/controllers/followController.js';
import { getNotifications, markAsRead } from './app/controllers/notificationController.js';
import { searchUsers, searchPosts } from './app/controllers/searchController.js';
import { validateRegister } from './app/middlewares/validationMiddleware.js';

dotenv.config();
configureDB();

const app = express();
app.use(bodyParser.json());
//app.use(cors());
app.use(cors({
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use('/uploads', express.static('uploads'));

// Auth Routes
app.post('/api/register', validateRegister, register);
app.post('/api/login', login);
app.post('/api/forgot-password', forgotPassword);
app.post('/api/reset-password', resetPassword);
app.post('/api/update-password', authMiddleware, updatePassword);

app.get('/api/validate-token', authMiddleware, validateToken);
app.get('/api/profile/me', authMiddleware, getOwnProfile);
app.get('/api/profile/:userId', authMiddleware, getProfile);
app.put('/api/profile/me', authMiddleware, updateProfile);

// Post Routes
app.get('/api/posts/:postId', authMiddleware, getPostById);
app.post('/api/posts', authMiddleware, createPost);
app.put('/api/posts/:postId', authMiddleware, updatePost);
app.delete('/api/posts/:postId', authMiddleware, deletePost);
app.get('/api/posts', authMiddleware, getPosts);
app.get('/api/trending-posts', authMiddleware, getTrendingPosts);
app.get('/api/trending-hashtags', authMiddleware, getTrendingHashtags);
app.post('/api/posts/like', authMiddleware, likePost);
app.post('/api/posts/comment', authMiddleware, commentOnPost);
app.delete('/:postId/comment/:commentId', authMiddleware, deleteComment)

// Follow Routes
app.post('/api/follow', authMiddleware, followUser);
app.post('/api/unfollow', authMiddleware, unfollowUser);
app.get('/api/followers/:userId',  getFollowers);
app.get('/api/following/:userId', getFollowing);

// Notification Routes
app.get('/api/notifications', authMiddleware, getNotifications);
app.put('/api/notifications/:id', authMiddleware, markAsRead);

// Search Routes
app.get('/api/search/users', authMiddleware, searchUsers);
app.get('/api/search/posts', authMiddleware, searchPosts);

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
