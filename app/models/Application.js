
import { Schema,model } from 'mongoose';

const applicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['submitted', 'under review', 'rejected', 'accepted'], default: 'submitted' },
}, { timestamps: true });

export default model('Application', applicationSchema);
