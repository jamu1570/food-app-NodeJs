import { body, validationResult } from 'express-validator';

export const userValidationRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};