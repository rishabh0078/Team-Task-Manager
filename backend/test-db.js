import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    const users = await User.find({});
    console.log('Users in DB:', users);
    process.exit(0);
  })
  .catch(err => console.error(err));
