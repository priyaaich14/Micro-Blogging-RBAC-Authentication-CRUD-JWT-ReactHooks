import {Schema,model} from 'mongoose';

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  images: [{ type: String }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type:Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true },
  }],
}, { timestamps: true });

const Post = model('Post', postSchema);
export default Post;
