import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { validationResult } from 'express-validator';

export const applyForJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { job } = req.body;
    const candidateId = req.user._id;

    // Check if the candidate has already applied for this job
    const existingApplication = await Application.findOne({
      job: job,
      candidate: candidateId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // Create the application
    const application = new Application({
      job: job,
      candidate: candidateId,
      status: 'submitted',
    });
    await application.save();

    // Add the application to the Job's applications array
    await Job.findByIdAndUpdate(job, {
      $push: { applications: application._id },
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job', error });
  }
};
export const updateApplicationStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id, status } = req.body;
    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error });
  }
};

export const getCandidateApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id }).populate('job', 'title company');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidate applications', error });
  }
};
