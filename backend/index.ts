import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
