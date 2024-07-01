import pool from '../config/db';

interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Resume {
  id?: number;
  user_id: number;
  summary: string;
}

interface Skill {
  id?: number;
  resume_id: number;
  skill_name: string;
}

interface Experience {
  id?: number;
  resume_id: number;
  job_title: string;
  company_name: string;
  job_description: string;
  start_date: Date;
  end_date?: Date;
}

interface Education {
  id?: number;
  resume_id: number;
  institution_name: string;
  degree: string;
  start_date: Date;
  end_date?: Date;
}

interface Internships {
  id?: number;
  resume_id: number;
  job_title: string;
  company_name: string;
  job_description: string;
  start_date: Date;
  end_date?: Date;
}

interface Refer {
  id?: number;
  resume_id: number;
  name: string;
  contact_info: string;
  relationship: string;
}

const getUsers = (callback: Function) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result.rows);
  });
};

const addUser = (user: User, callback: Function) => {
  const query = 'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *';
  const values = [user.name, user.email, user.phone];
  pool.query(query, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result.rows[0]);
  });
};

const getUser = (id: string, callback: Function) => {
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result.rows[0]);
  });
};

const getUserResume = async (userId: string, callback: Function) => {
  try {
    const resumeQuery = 'SELECT * FROM resumes WHERE user_id = $1';
    const { rows: [resume] } = await pool.query(resumeQuery, [userId]);

    if (!resume) {
      return callback(null, null);
    }

    const skillsQuery = 'SELECT * FROM skills WHERE resume_id = $1';
    const experienceQuery = 'SELECT * FROM experience WHERE resume_id = $1';
    const educationQuery = 'SELECT * FROM education WHERE resume_id = $1';
    const internshipQuery = 'SELECT * FROM internships WHERE resume_id = $1';
    const referQuery = 'SELECT * FROM refer WHERE resume_id = $1';

    const [skillsResult, experienceResult, educationResult, internshipResult, referResult] = await Promise.all([
      pool.query(skillsQuery, [resume.id]),
      pool.query(experienceQuery, [resume.id]),
      pool.query(educationQuery, [resume.id]),
      pool.query(internshipQuery, [resume.id]),
      pool.query(referQuery, [resume.id])
    ]);

    resume.skills = skillsResult.rows;
    resume.experience = experienceResult.rows;
    resume.education = educationResult.rows;
    resume.internship = internshipResult.rows;
    resume.refer = referResult.rows;

    callback(null, resume);
  } catch (error) {
    console.error('Error fetching user resume:', error);
    callback(error);
  }
};

export { getUsers, addUser, getUser, getUserResume, User, Resume, Skill, Experience, Education, Internships, Refer };
