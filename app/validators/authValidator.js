
import { checkSchema } from 'express-validator';
import User from '../models/User.js';

export const validateRegister = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'Name is required',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email',
    },
    custom: {
      options: async (email) => {
        const userExists = await User.findOne({ email });
        if (userExists) {
          throw new Error('Email is already in use');
        }
      },
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
  role: {
    isIn: {
      options: [['candidate', 'recruiter']],
      errorMessage: 'Invalid role',
    },
  },
});

export const validateLogin = checkSchema({
  email: {
    isEmail: {
      errorMessage: 'Invalid email',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
});
