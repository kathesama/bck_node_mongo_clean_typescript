import mongoose from 'mongoose';
import roleSchema from '../schemas/role.schema';

export default mongoose.model('Roles', roleSchema);
