import mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
import { tokenTypes } from '../enums/token.enum';

const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    fingerprint: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

tokenSchema.plugin(timeZone, { paths: ['timestamps'] });
tokenSchema.index({ token: 1, fingerprint: 1 }, { unique: true });

export default tokenSchema;
