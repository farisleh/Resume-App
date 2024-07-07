import { Request, Response } from 'express';
import { getUsers, getUser } from '../services/userService';
import { getUserResume } from '../services/resumeService';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const resume = await getUserResume(userId);
    res.json({ user, resume });
  } catch (err) {
    res.status(500).send(err);
  }
};
