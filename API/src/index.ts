import express from 'express';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
