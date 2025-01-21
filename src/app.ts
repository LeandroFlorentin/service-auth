import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }
  private initializeMiddlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }
  private initializeRoutes() {}
  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default App;
