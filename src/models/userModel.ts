// import npm packages.
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// import file modules.
import { IUser } from '../interfaces/userInterface';

// create user schema with scema validation.
const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    email: {
      type: String, required: [true, 'Email is required'],
      validate: {
        validator: (email: string) => {
          return mongoose.models.User.findOne({ email })
            .then((user) => !user);
        },
        message: 'Email already exists'
      }
    },
    password: { type: String, required: [true, 'Password is required'] },
  },
  { timestamps: true }
);


// Execute before each user.save() call
UserSchema.pre('save', function (this: any, callback: (arg?: any) => void) {

  const user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, (err: Error | undefined, salt: any) => {

    if (err) return callback(err);
    bcrypt.hash(user.password, salt, (err: Error | undefined, hash: any) => {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });

  });

});// Execute before each user.save() call

// This is use to verify user password.
UserSchema.methods.verifyPassword = function (password: any, cb: any) {
  bcrypt.compare(password, this.password, function (err: any, isMatch: any) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);