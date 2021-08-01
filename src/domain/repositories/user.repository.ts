import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema';

export default mongoose.model('Users', userSchema);
