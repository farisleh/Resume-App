import pool from '../config/db';
import { User } from '../models/userModel';

export const getUsers = async (): Promise<User[]> => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};
