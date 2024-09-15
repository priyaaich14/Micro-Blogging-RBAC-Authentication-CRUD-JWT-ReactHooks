import { check, validationResult } from 'express-validator';

const validateRegister = [
  check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  check('email').isEmail().withMessage('Enter a valid email'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateRegister };
