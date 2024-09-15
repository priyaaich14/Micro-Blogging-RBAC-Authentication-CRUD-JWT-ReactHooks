import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Post from '../models/Post.js';

const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' } }).select('username');
    
    const userProfiles = await Promise.all(users.map(async user => {
      const profile = await Profile.findOne({ user: user._id }).select('bio profilePic');
      return {
        _id: user._id,
        username: user.username,
        bio: profile ? profile.bio : '',
        profilePic: profile ? profile.profilePic : ''
      };
    }));

    res.json(userProfiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchPosts = async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({ content: { $regex: query, $options: 'i' } }).populate('user', 'username profilePic');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export { searchUsers, searchPosts };
