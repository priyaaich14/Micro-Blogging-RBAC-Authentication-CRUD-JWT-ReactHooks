import {Schema,model} from 'mongoose';

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },  // 'follow', 'like', 'comment'
  fromUser: { type:Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = model('Notification', notificationSchema);
export default Notification;
