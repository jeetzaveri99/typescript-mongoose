import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import envConfig from '../config';

import { getUserByEmail, createUser } from '../models/user';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email ID and password are required. Please ensure you added both." });
    }

    const user = await getUserByEmail(email).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid emailID or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid emailID or password' });

    const token = await jwt.sign({ email: user.email, id: user._id, role: user.role }, envConfig.JWT_SECRET_KEY);

    return res.status(200).json({ status: 200, message: 'User logged in successfully.', token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, message: 'Something went wrong..!' });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ status: 400, message: 'Something went wrong..!' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ status: 400, message: 'Something went wrong..!' });
    }

    const user = await createUser({
      email,
      username,
      password: bcrypt.hashSync(password, +(envConfig.SALT_ROUNDS))
    });

    const token = await jwt.sign({ email: user.email, id: user._id, role: user.role }, envConfig.JWT_SECRET_KEY);

    return res.status(201).json({ status: 201, message: 'User created successfully.', token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, message: 'Something went wrong..!' });;
  }
}