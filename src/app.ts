import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Routes from './routes/index';
import Database from './db';
import { TypeSequelize } from './types/sequelize.types';
import { middlewareError } from './middlewares/error.middleware';
import UserPrueba from './utils/user';
import swagger from './swagger/swagger';

interface IApp {
  listen(port: number): void;
  connectDatabase(): Promise<TypeSequelize>;
}

class App implements IApp {
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
      connect.sync({ force: true }).then(() => {
        swagger(this.app, port);
        UserPrueba.createUser().then(() => {
          console.log(`Server is running on port ${port}`);
        });
      });
    });
  }
}

export default App;
