// import User from '../models/User.js';

// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user profile', error });
//   }
// };

// export const updateUserProfile = async (req, res) => {
//   try {
//     const updatedProfile = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
//     res.json(updatedProfile);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating profile', error });
//   }
// };

import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user profile', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.user.role === 'candidate' && req.body.profile) {
      user.profile = { ...user.profile, ...req.body.profile };
    } else if (req.user.role === 'recruiter' && req.body.profile) {
      user.profile = { ...user.profile, ...req.body.profile };
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: 'Error updating profile', error });
  }
};
