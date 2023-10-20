import { Schema, model } from "mongoose";
import { ROLES } from '../utils/enum';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: ROLES.USER, enum: [...Object.values(ROLES)] },
  password: { type: String, required: true, select: false },
});

export const userModel = model('user', UserSchema, 'users');

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserById = (_id: string) => userModel.findOne({ _id });
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUser = (_id: string) => userModel.findOneAndDelete({ _id });
export const updateUser = (_id: string, values: Record<string, any>) => userModel.findOneAndUpdate({ _id }, { $set: values });