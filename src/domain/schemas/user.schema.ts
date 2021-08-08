import mongoose from 'mongoose';
// import validator from 'validator';
import { rolesTypes } from '../enums/roles.enum';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Name is mandatory'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is mandatory'],
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error('Age mus be a positive number');
        }
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is mandatory'],
      validate: {
        validator: async function (email: string) {
          const user = await this.constructor.findOne({ email });
          return user ? this.id === user.id : true;
        },
        message: () => 'The specified email address is already in use.',
      },
    },
    password: {
      type: String,
      required: [true, 'Pasdword is mandatory'],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: 'USER_ROLE',
      enum: rolesTypes,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.method('toJSON', function () {
  const { _id, ...temporaryObject } = this.toObject();

  temporaryObject['uuid'] = _id;
  delete temporaryObject['__v'];
  delete temporaryObject['password'];
  delete temporaryObject['createdAt'];
  delete temporaryObject['updatedAt'];
  return temporaryObject;
});

export default userSchema;
