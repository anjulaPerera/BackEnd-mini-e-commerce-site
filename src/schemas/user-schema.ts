import * as mongoose from "mongoose";
import { Schema,Types } from "mongoose";
import * as bcrypt from "bcryptjs";
import { IUser } from "../models/user-model";

const jwt = require("jsonwebtoken");



export const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      required: false,
    },
    email: {
      type: Schema.Types.String,
      required: false,
      unique: true,
    },
    userType: {
      type: Schema.Types.String,
      required: false,
    },

    password: {
      type: Schema.Types.String,
      unique: true,
      required: false,
    },
  },
);




userSchema.pre("save", function (next) {
  const user: any = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.createAccessToken = function (expiresIn: string) {
  return jwt.sign({ user_id: this._id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

userSchema.methods.comparePassword = function (
  password: any
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err: any, isMatch: boolean | PromiseLike<boolean>) {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
