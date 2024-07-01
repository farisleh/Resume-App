import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL server.');

    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL
      );
    `;

    client.query(createUserTableQuery)
      .then(() => {
        console.log('Users table created.');

        const createResumeTableQuery = `
          CREATE TABLE IF NOT EXISTS resumes (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            summary TEXT NOT NULL
          );
        `;

        return client.query(createResumeTableQuery);
      })
      .then(() => {
        console.log('Resumes table created.');

        const createSkillsTableQuery = `
          CREATE TABLE IF NOT EXISTS skills (
            id SERIAL PRIMARY KEY,
            resume_id INT REFERENCES resumes(id) ON DELETE CASCADE,
            skill_name VARCHAR(255) NOT NULL
          );
        `;

        return client.query(createSkillsTableQuery);
      })
      .then(() => {
        console.log('Skills table created.');

        const createExperienceTableQuery = `
          CREATE TABLE IF NOT EXISTS experience (
            id SERIAL PRIMARY KEY,
            resume_id INT REFERENCES resumes(id) ON DELETE CASCADE,
            job_title VARCHAR(255) NOT NULL,
            company_name VARCHAR(255) NOT NULL,
            job_description TEXT NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE
          );
        `;

        return client.query(createExperienceTableQuery);
      })
      .then(() => {
        console.log('Experience table created.');

        const createEducationTableQuery = `
          CREATE TABLE IF NOT EXISTS education (
            id SERIAL PRIMARY KEY,
            resume_id INT REFERENCES resumes(id) ON DELETE CASCADE,
            institution_name VARCHAR(255) NOT NULL,
            degree VARCHAR(255) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE
          );
        `;

        return client.query(createEducationTableQuery);
      })
      .then(() => {
        console.log('Education table created.');

        const createInternshipTableQuery = `
        CREATE TABLE IF NOT EXISTS internships (
          id SERIAL PRIMARY KEY,
          resume_id INT REFERENCES resumes(id) ON DELETE CASCADE,
          company_name VARCHAR(255) NOT NULL,
          job_description TEXT NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL
        );
      `;

      return client.query(createInternshipTableQuery);
    })
    .then(() => {
      console.log('Internship table created.');

      const createReferencesTableQuery = `
          CREATE TABLE IF NOT EXISTS refer (
            id SERIAL PRIMARY KEY,
            resume_id INT REFERENCES resumes(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            contact_info VARCHAR(255) NOT NULL,
            relationship VARCHAR(255) NOT NULL
          );
        `;

        return client.query(createReferencesTableQuery);
      })
      .then(() => {
        console.log('Refer table created.');
        client.end();
      })
      .catch(err => {
        console.error('Error executing query:', err);
        client.end();
      });
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });
