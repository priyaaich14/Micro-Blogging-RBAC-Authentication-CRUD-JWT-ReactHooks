
// import { Schema,model } from 'mongoose';
// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['candidate', 'recruiter'], required: true },
//   profile: { type: Schema.Types.Mixed },
// }, { timestamps: true });
// export default model('User', userSchema);


import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Candidate Profile Schema
const candidateProfileSchema = new Schema({
  experience: { type: String, required: true },
  education: { type: String, required: true },
  skills: [{ type: String, required: true }],
}, { _id: false });

// Recruiter Profile Schema
const recruiterProfileSchema = new Schema({
  companyName: { type: String, required: true },
  website: { type: String },
  companyDescription: { type: String },
}, { _id: false });

// Main User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'recruiter'], required: true },
  profile: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

// Middleware to handle profile validation before saving
userSchema.pre('save', function(next) {
  if (this.role === 'candidate') {
    const { experience, education, skills } = this.profile;
    if (!experience || !education || !skills) {
      return next(new Error('Incomplete candidate profile'));
    }
  } else if (this.role === 'recruiter') {
    const { companyName, website, companyDescription } = this.profile;
    if (!companyName) {
      return next(new Error('Incomplete recruiter profile'));
    }
  }
  next();
});

export default model('User', userSchema);
