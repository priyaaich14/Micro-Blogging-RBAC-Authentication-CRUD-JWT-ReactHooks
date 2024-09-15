import { body } from 'express-validator';

export const validateUserProfile = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('profile.experience').optional().isString().withMessage('Experience should be a string'),
];
