import mongoose from 'mongoose';

const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, 'role is mandatory'],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

roleSchema.method('toJSON', function () {
  const { _id, ...temporaryObject } = this.toObject();

  temporaryObject['uuid'] = _id;
  delete temporaryObject.__v;
  delete temporaryObject['createdAt'];
  delete temporaryObject['updatedAt'];
  return temporaryObject;
});

export default roleSchema;
