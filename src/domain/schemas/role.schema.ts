import mongoose from 'mongoose';

const { Schema } = mongoose;
// import toJSON from '../plugins/toJSON.plugin.js';

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, 'role is mandatory'],
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
