
import Post from '../models/Post.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
}).array('images', 10);

// const createPost = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     const { content } = req.body;
//     const images = req.files ? req.files.map(file => file.path) : [];

//     try {
//       const post = new Post({ user: req.user.userId, content, images });
//       await post.save();
//       res.status(201).json(post);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
// };
const createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { content } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    try {
      const post = new Post({ user: req.user.userId, content, images });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};


const updatePost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { postId, content } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
      const post = await Post.findById(postId);
      if (!post || post.user.toString() !== req.user.userId) {
        return res.status(404).json({ error: 'Post not found or unauthorized' });
      }

      post.content = content || post.content;
      if (images.length > 0) {
        post.images = images;
      }
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// const deletePost = async (req, res) => {
//   const { postId } = req.params;
//   try {
//     const post = await Post.findById(postId);
//     if (!post || post.user.toString() !== req.user.userId) {
//       return res.status(404).json({ error: 'Post not found or unauthorized' });
//     }
//     await post.remove();
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }
      if (post.user.toString() !== req.user.userId) {
          return res.status(401).json({ error: 'Unauthorized' });
      }
      await post.remove();
      res.json({ message: 'Post deleted successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


// const getPosts = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).populate('following');
//     const followingIds = user.following.map(f => f._id);
//     const posts = await Post.find({ user: { $in: [...followingIds, req.user.userId] } }).populate('user', 'username profilePic').sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const getPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('following');
    const followingIds = user.following.map(f => f._id);
    const posts = await Post.find({ user: { $in: [...followingIds, req.user.userId] } })
      .populate('user', 'username profilePic')
      .populate({
        path: 'comments.user',
        select: 'username'
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.likes.includes(req.user.userId)) {
      post.likes.pull(req.user.userId);
    } else {
      post.likes.push(req.user.userId);
      const notification = new Notification({
        user: post.user,
        type: 'like',
        fromUser: req.user.userId,
        post: post._id,
      });
      await notification.save();
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const commentOnPost = async (req, res) => {
  const { postId, comment } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.comments.push({ user: req.user.userId, comment });
    const notification = new Notification({
      user: post.user,
      type: 'comment',
      fromUser: req.user.userId,
      post: post._id,
    });
    await notification.save();
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment || comment.user.toString() !== req.user.userId) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }

    comment.remove();
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getTrendingPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username profilePic').sort({ likes: -1 }).limit(10);
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTrendingHashtags = async (req, res) => {
  try {
    const posts = await Post.find().select('content');
    const hashtags = {};
    posts.forEach(post => {
      const tags = post.content.match(/#[a-zA-Z0-9_]+/g);
      if (tags) {
        tags.forEach(tag => {
          hashtags[tag] = (hashtags[tag] || 0) + 1;
        });
      }
    });
    const sortedHashtags = Object.keys(hashtags).sort((a, b) => hashtags[b] - hashtags[a]).slice(0, 10);
    res.json(sortedHashtags);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


export { createPost, updatePost, deletePost, getPosts, likePost, commentOnPost, getTrendingPosts, getTrendingHashtags, deleteComment, getPostById };
