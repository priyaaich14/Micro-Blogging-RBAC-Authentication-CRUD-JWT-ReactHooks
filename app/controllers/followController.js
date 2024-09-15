// import User from '../models/User.js';
// import Notification from '../models/Notification.js';

// const followUser = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findById(req.user.userId);
//     const targetUser = await User.findById(userId);
//     if (!targetUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     if (user.following.includes(userId)) {
//       user.following.pull(userId);
//       targetUser.followers.pull(req.user.userId);
//     } else {
//       user.following.push(userId);
//       targetUser.followers.push(req.user.userId);
//       const notification = new Notification({
//         user: targetUser._id,
//         type: 'follow',
//         fromUser: req.user.userId,
//       });
//       await notification.save();
//     }
//     await user.save();
//     await targetUser.save();
//     res.json({ user, targetUser });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const unfollowUser = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findById(req.user.userId);
//     const targetUser = await User.findById(userId);
//     if (!targetUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     if (!user.following.includes(userId)) {
//       return res.status(400).json({ error: 'You are not following this user' });
//     }
//     user.following.pull(userId);
//     targetUser.followers.pull(req.user.userId);
//     await user.save();
//     await targetUser.save();
//     res.json({ message: 'User unfollowed successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getFollowers = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('followers', 'username profilePic');
//     res.json(user.followers);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getFollowing = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('following', 'username profilePic');
//     res.json(user.following);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export { followUser, unfollowUser, getFollowers, getFollowing };
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// Follow User
const followUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.following.includes(userId)) {
      user.following.pull(userId);
      targetUser.followers.pull(req.user.userId);
    } else {
      user.following.push(userId);
      targetUser.followers.push(req.user.userId);
      const notification = new Notification({
        user: targetUser._id,
        type: 'follow',
        fromUser: req.user.userId,
      });
      await notification.save();
    }
    await user.save();
    await targetUser.save();
    res.json({ message: user.following.includes(userId) ? 'Unfollowed' : 'Followed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unfollow User
const unfollowUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!user.following.includes(userId)) {
      return res.status(400).json({ error: 'You are not following this user' });
    }
    user.following.pull(userId);
    targetUser.followers.pull(req.user.userId);
    await user.save();
    await targetUser.save();
    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Followers
const getFollowers = async (req, res) => {
  //console.log('Request received for userId:', req.params.userId); // Add this log
  console.log('GET /api/followers/:userId - userId:', req.params.userId);
  try {
    const user = await User.findById(req.params.userId).populate('followers', 'username profilePic');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.followers.length ? user.followers : []); // Return an empty array if no followers
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Following
const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('following', 'username profilePic');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.following.length ? user.following : []); // Return an empty array if not following anyone
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { followUser, unfollowUser, getFollowers, getFollowing };
