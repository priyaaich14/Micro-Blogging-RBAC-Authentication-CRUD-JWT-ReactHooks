
import { checkSchema } from 'express-validator';
import Job from '../models/Job.js';

export const validateJob = checkSchema({
  title: {
    notEmpty: {
      errorMessage: 'Job title is required',
    },
    custom: {
      options: async (title, { req }) => {
        const jobExists = await Job.findOne({
          title: title,
          company: req.body.company,
          recruiter: req.user._id,
        });
        if (jobExists) {
          throw new Error('A job with the same title, company, and recruiter already exists.');
        }
      },
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Job description is required',
    },
  },
  company: {
    notEmpty: {
      errorMessage: 'Company name is required',
    },
  },
});
