
import Job from '../models/Job.js';
import { validationResult } from 'express-validator';

export const createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, company } = req.body;
    const recruiter = req.user._id;

    // Create a new job
    const job = new Job({
      title,
      description,
      company,
      recruiter,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    if (error.code === 11000) {  // MongoDB duplicate key error
      return res.status(400).json({ message: 'Duplicate job posting. A job with the same title, company, and recruiter already exists.' });
    }
    res.status(500).json({ message: 'Error creating job', error });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiter', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

export const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate({
      path: 'applications',
      populate: {
        path: 'candidate',
        select: 'name email'  // Select fields to return for the candidate
      }
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job.applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants', error });
  }
};
