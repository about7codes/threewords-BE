import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config";

export interface IUser {
  email: string;
  password: string;
  generateAuthToken(): string;
  // findByCredentials(email: string, password: string): Promise<IUser>;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true, versionKey: false }
);

// Before saving the user, hash the password
userSchema.pre("save", async function (next) {
  const user = this as IUserModel;

  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
  }

  next();
});

userSchema.methods.generateAuthToken = function () {
  const user = this as IUserModel;

  const authToken = jwt.sign(
    { id: user._id.toString() },
    config.server.jwtSecret
  );

  return authToken;
};

userSchema.methods.findByCredentials = async function (
  email: string,
  password: string
) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User does not exist");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid login credentials");

  return user;
};

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
