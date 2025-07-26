import 'dotenv/config';
import mongoose from 'mongoose';
import { Application } from 'express';
import app from './app';


const MONGO_URI = process.env.MONGO_URI as string;

class Server {
  private port = process.env.PORT || 8000;
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async start() {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
      this.app.listen(this.port, () => {
        console.log(`Listening on url http://localhost:${this.port}/api`);
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    }
  }
}

const server = new Server(app);
server.start();