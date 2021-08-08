import mongoose from 'mongoose';
// import { TokenModel } from '../models/Token.model';
import tokenSchema from '../schemas/token.schema';

export default mongoose.model('Tokens', tokenSchema);
