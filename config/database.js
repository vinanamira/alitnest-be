import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log('DB Successfully Connected');
    })
    .catch((err) => console.log(err));

export default mongoose;
