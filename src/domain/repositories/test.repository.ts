import mongoose from 'mongoose';
import testSchema from '../models/Test.model';

export default mongoose.model('test', testSchema);
