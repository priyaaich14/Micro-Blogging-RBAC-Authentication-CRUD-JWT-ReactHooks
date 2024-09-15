import { check, validationResult } from 'express-validator';

const validateProfile = [
  check('bio').optional().isLength({ max: 200 }).withMessage('Bio must be at most 200 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateProfile };
