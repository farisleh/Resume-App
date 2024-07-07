import pool from '../config/db';
import { Resume } from '../models/resumeModel';

export const getUserResume = async (userId: string): Promise<Resume | null> => {
  try {
    const resumeQuery = 'SELECT * FROM resumes WHERE user_id = $1';
    const { rows: [resume] } = await pool.query(resumeQuery, [userId]);

    if (!resume) {
      return null;
    }

    const skillsQuery = 'SELECT * FROM skills WHERE resume_id = $1';
    const experienceQuery = 'SELECT * FROM experience WHERE resume_id = $1';
    const educationQuery = 'SELECT * FROM education WHERE resume_id = $1';
    const internshipQuery = 'SELECT * FROM internships WHERE resume_id = $1';
    const referenceQuery = 'SELECT * FROM refer WHERE resume_id = $1';

    const [skillsResult, experienceResult, educationResult, internshipResult, referenceResult] = await Promise.all([
      pool.query(skillsQuery, [resume.id]),
      pool.query(experienceQuery, [resume.id]),
      pool.query(educationQuery, [resume.id]),
      pool.query(internshipQuery, [resume.id]),
      pool.query(referenceQuery, [resume.id])
    ]);

    resume.skills = skillsResult.rows;
    resume.experience = experienceResult.rows;
    resume.education = educationResult.rows;
    resume.internship = internshipResult.rows;
    resume.refer = referenceResult.rows;

    return resume;
  } catch (error) {
    console.error('Error fetching user resume:', error);
    throw error;
  }
};
