
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const validateToken = async (req, res) => {
  try {
      const user = await User.findById(req.user.userId).select('_id username email bio profilePic');
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();

    // Create a profile for the new user
    const profile = new Profile({ user: user._id });
    await profile.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      if (error.keyPattern.username) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      if (error.keyPattern.email) {
        return res.status(400).json({ error: 'Email already taken' });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'Email does not exist' });
//     }
//     if (!(await user.comparePassword(password))) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Email does not exist' });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Include userId and other user details in the response
    res.json({ 
      token, 
      user: {
        _id: user._id,  // Ensure this is sent back to the frontend
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({ error: 'Invalid old password' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, forgotPassword, resetPassword, updatePassword,validateToken };
