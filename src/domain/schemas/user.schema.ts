import mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
// import validator from 'validator';
import { rolesTypes } from '../enums/roles.enum';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: {
      type: String,
    },
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
      validate(value: any) {
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
      unique: true,
      // validate: {
      //   validator: async function (email: string) {
      //     const user = await this.constructor.findOne({ email });
      //     return user ? this._id === user._id : true;
      //   },
      //   message: () => 'The specified email address is already in use.',
      // },
    },
    password: {
      type: String,
      required: [true, 'Password is mandatory'],
    },
    image: {
      type: String,
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Roles',
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

userSchema.plugin(timeZone, { paths: ['timestamps'] });
userSchema.index({ _id: 1, userId: 1 }, { unique: true });

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
