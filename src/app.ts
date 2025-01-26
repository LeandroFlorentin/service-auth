import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Routes from './routes';
import Database from './db';
import { TypeSequelize } from './types/sequelize.types';
import { middlewareError } from './middlewares/error.middleware';

class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorMiddleware();
  }
  private initializeRoutes() {
    const routes = new Routes().getRoutes();
    this.app.use('/', routes);
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeErrorMiddleware(): void {
    this.app.use(middlewareError);
  }

  public async connectDatabase(): Promise<TypeSequelize> {
    return await Database.connect();
  }

  public listen(port: number): void {
    this.app.listen(port, async () => {
      const connect = await this.connectDatabase();
      connect.sync({ force: true });
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default App;
