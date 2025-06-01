import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { middlewareError } from './middlewares/error.middleware';
import swagger from './swagger/swagger';
import { TypeSequelize } from './interfaces/sequelize.types';
import { IApp } from './interfaces/app.interface';
import { inject, injectable } from './utils/inversify';
import { IRoutes } from './interfaces/src/routes';
import { IDatabase } from './interfaces/db.interface';
import { IUserPrueba } from './utils/user';
import TYPES from './inverfisy/types';

@injectable()
class App implements IApp {
  private app: Application;
  constructor(
    @inject(TYPES.Routes) private routes: IRoutes,
    @inject(TYPES.Database) private database: IDatabase,
    @inject(TYPES.UserPrueba) private userPrueba: IUserPrueba
  ) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorMiddleware();
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    const routes = this.routes.getRoutes();
    this.app.use('/', routes);
  }

  private initializeErrorMiddleware(): void {
    this.app.use(middlewareError);
  }

  public async connectDatabase(): Promise<TypeSequelize> {
    return await this.database.connect();
  }

  public listen(port: number): void {
    this.app.listen(port, async () => {
      const connect = await this.connectDatabase();
      await connect.sync({ force: true })
      swagger(this.app, port);
      await this.userPrueba.createUser()
      console.log(`Server is running on port ${port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

export default App;
