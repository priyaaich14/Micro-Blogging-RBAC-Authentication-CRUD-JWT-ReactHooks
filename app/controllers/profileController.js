import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Post from '../models/Post.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
}).single('profilePic');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    const profile = await Profile.findOne({ user: req.params.userId });
    const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });

    res.json({ 
      user: { 
        username: user.username,
        email: user.email,
        bio: profile ? profile.bio : '',
        profilePic: profile ? profile.profilePic : ''
      },
      posts 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const getOwnProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
//     const profile = await Profile.findOne({ user: req.user.userId });
//     const posts = await Post.find({ user: req.user.userId }).sort({ createdAt: -1 });

//     res.json({ 
//       user: { 
//         username: user.username,
//         email: user.email,
//         bio: profile ? profile.bio : '',
//         profilePic: profile ? profile.profilePic : ''
//       },
//       posts 
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    const profile = await Profile.findOne({ user: req.user.userId });
    const posts = await Post.find({ user: req.user.userId }).sort({ createdAt: -1 });

    res.json({ 
      user: { 
        _id: user._id,  // Include the user ID here
        username: user.username,
        email: user.email,
        bio: profile ? profile.bio : '',
        profilePic: profile ? profile.profilePic : ''
      },
      posts 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const updateProfile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     const { bio } = req.body;
//     const profilePic = req.file ? req.file.path : undefined;

//     try {
//       let profile = await Profile.findOne({ user: req.user.userId });
//       if (!profile) {
//         profile = new Profile({ user: req.user.userId, bio, profilePic });
//       } else {
//         if (bio) profile.bio = bio;
//         if (profilePic) profile.profilePic = profilePic;
//       }
//       await profile.save();

//       const updatedUser = await User.findById(req.user.userId).select('-password');
//       const updatedProfile = await Profile.findOne({ user: req.user.userId });

//       res.json({ message: 'Profile updated successfully', user: updatedUser, profile: updatedProfile });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
// };
// const updateProfile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     const { bio } = req.body;
//     const profilePic = req.file ? req.file.filename : undefined;

//     try {
//       let profile = await Profile.findOne({ user: req.user.userId });
//       if (!profile) {
//         profile = new Profile({ user: req.user.userId, bio, profilePic });
//       } else {
//         if (bio) profile.bio = bio;
//         if (profilePic) profile.profilePic = profilePic;
//       }
//       await profile.save();

//       const updatedUser = await User.findById(req.user.userId).select('-password');
//       res.json({ message: 'Profile updated successfully', user: updatedUser, profile });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
// };
const updateProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Destructure and include username and email
    const { username, email, bio } = req.body;
    const profilePic = req.file ? req.file.filename : undefined;

    try {
      // Find the user's profile or create a new profile if it does not exist
      let profile = await Profile.findOne({ user: req.user.userId });
      if (!profile) {
        // Create a new profile if not found
        profile = new Profile({ 
          user: req.user.userId, 
          username, 
          email, 
          bio, 
          profilePic 
        });
      } else {
        // Update fields that are provided
        if (username) profile.username = username;
        if (email) profile.email = email;
        if (bio) profile.bio = bio;
        if (profilePic) profile.profilePic = profilePic;
      }
      await profile.save();

      // Update the user document if username or email are changed
      const userUpdateFields = {};
      if (username) userUpdateFields.username = username;
      if (email) userUpdateFields.email = email;
      if (Object.keys(userUpdateFields).length > 0) {
        await User.findByIdAndUpdate(req.user.userId, { $set: userUpdateFields }, { new: true });
      }

      const updatedUser = await User.findById(req.user.userId).select('-password');
      res.json({ message: 'Profile updated successfully', user: updatedUser, profile });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

export { getProfile, getOwnProfile, updateProfile };
