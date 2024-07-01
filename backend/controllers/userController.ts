import { Request, Response } from 'express';
import { getUsers, addUser, getUser, getUserResume, User } from '../models/userModel';

const getAllUsers = (req: Request, res: Response) => {
  getUsers((err: any, users: User[]) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(users);
  });
};

const createUser = (req: Request, res: Response) => {
  const newUser: User = req.body;
  addUser(newUser, (err: any, result: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json(result);
  });
};

const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id;
  getUser(userId, (err: any, user: User) => {
    if (err) {
      return res.status(500).send(err);
    }
    getUserResume(userId, (resumeErr: any, resume: any) => {
      if (resumeErr) {
        return res.status(500).send(resumeErr);
      }
      res.json({ user, resume });
    });
  });
};

export { getAllUsers, createUser, getUserById };
