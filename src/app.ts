import express, { Application } from 'express';
import cors from 'express';
import batchRoutes from './routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});
app.use('/api/batch', batchRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;