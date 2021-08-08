import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema';
// import { UserModel } from '../models/User.model';

export default mongoose.model('Users', userSchema);
