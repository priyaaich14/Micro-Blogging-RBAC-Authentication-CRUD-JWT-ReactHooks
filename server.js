
// import express from 'express';
// import dotenv from 'dotenv';
// import morgan from 'morgan';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import { authenticate } from './app/middlewares/authMiddleware.js';
// import { authorize } from './app/middlewares/roleMiddleware.js';
// import { register, login } from './app/controllers/authController.js';
// import { getUserProfile, updateUserProfile } from './app/controllers/userController.js';
// import { createJob, getJobs, getJobApplicants } from './app/controllers/jobController.js';
// import { applyForJob, updateApplicationStatus, getCandidateApplications } from './app/controllers/applicationController.js';
// import { validateRegister, validateLogin } from './app/validators/authValidator.js';
// import { validateJob } from './app/validators/jobValidator.js';
// import { validateUserProfile } from './app/validators/userValidator.js';

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));

// // Auth Routes
// app.post('/register', validateRegister, register);
// app.post('/login', validateLogin, login);

// // User Profile Routes
// app.use(authenticate);

// app.route('/profile')
//   .get(getUserProfile)
//   .put(validateUserProfile, updateUserProfile);

// // Job Management Routes
// app.route('/jobs')
//   .post(authorize('recruiter'), validateJob, createJob)
//   .get(getJobs);

// app.route('/jobs/:jobId/applicants')
//   .get(authorize('recruiter'), getJobApplicants);

// // Application Routes
// app.route('/applications')
//   .post(authorize('candidate'), applyForJob)
//   .put(authorize('recruiter'), updateApplicationStatus);

// // New Route: Get Candidate Applications
// app.route('/my-applications')
//   .get(authorize('candidate'), getCandidateApplications);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import { authenticate } from './app/middlewares/authMiddleware.js';
import { authorize } from './app/middlewares/roleMiddleware.js';
import { register, login } from './app/controllers/authController.js';
import { getUserProfile, updateUserProfile } from './app/controllers/userController.js';
import { createJob, getJobs, getJobApplicants } from './app/controllers/jobController.js';
import { applyForJob, updateApplicationStatus, getCandidateApplications } from './app/controllers/applicationController.js';
import { validateRegister, validateLogin } from './app/validators/authValidator.js';
import { validateJob } from './app/validators/jobValidator.js';
import { validateUserProfile } from './app/validators/userValidator.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Auth Routes with /api/auth prefix
app.post('/api/auth/register', validateRegister, register);
app.post('/api/auth/login', validateLogin, login);

// User Profile Routes
app.use(authenticate);

app.route('/api/profile')
  .get(getUserProfile)
  .put(validateUserProfile, updateUserProfile);

// Job Management Routes
app.route('/api/jobs')
  .post(authorize('recruiter'), validateJob, createJob)
  .get(getJobs);

app.route('/api/jobs/:jobId/applicants')
  .get(authorize('recruiter'), getJobApplicants);

// Application Routes
app.route('/api/applications')
  .post(authorize('candidate'), applyForJob)
  .put(authorize('recruiter'), updateApplicationStatus);

// New Route: Get Candidate Applications
app.route('/api/my-applications')
  .get(authorize('candidate'), getCandidateApplications);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
