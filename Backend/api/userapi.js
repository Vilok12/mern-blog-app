import express from 'express';
import { register } from '../services/authservice.js';
import { verifytoken } from '../middlewares/verifytoken.js';
import { articlemodel } from '../models/articlemodel.js';
import upload from '../config/multer.js';
import cloudinary from '../config/cloudinary.js';
import { uploadToCloudinary } from '../config/uploadToCloudinary.js';

export const userapp = express.Router();

// register user
userapp.post('/user', upload.single('profilePic'), async (req, res, next) => {
  let cloudinaryResult;

  try {
    let userObj = req.body;

    // Step 1: upload image to cloudinary from memoryStorage (if exists)
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // Step 2: call existing register()
    const newUserObj = await register({
      ...userObj,
      role: 'USER',
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({
      message: 'user created',
      payload: newUserObj,
    });

  } catch (err) {
    // Step 3: rollback 
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    next(err); // send to your error middleware
  }
});

// read all articles(protected route)
userapp.get('/article', verifytoken('USER'), async (req, res) => {
  // get all articles
  let articles = await articlemodel.find({ isActive: true }).populate('author', 'firstname email');
  // send res
  res.status(200).json({ message: 'articles are:', payload: articles });
});

// add comment to an article(protected route)
userapp.put('/article', verifytoken('USER'), async (req, res) => {
  // get id and comment from body
  let { user, articleid, comment } = req.body;
  // update article
  let newarticle = await articlemodel.findByIdAndUpdate(articleid, { $push: { comments: { user: user, comment: comment } } }, { new: true, runValidators: true });
  // if article not found
  if (!newarticle) {
    res.status(404).json({ message: 'article not found' });
  }
  // send res
  res.status(200).json({ message: 'comment added', payload: newarticle });
});

