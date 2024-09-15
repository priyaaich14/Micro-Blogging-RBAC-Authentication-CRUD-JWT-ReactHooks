
import { Schema,model } from 'mongoose';
const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  recruiter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
}, { timestamps: true });
// Compound index to enforce uniqueness across title, company, and recruiter
jobSchema.index({ title: 1, company: 1, recruiter: 1 }, { unique: true });
export default model('Job', jobSchema);
