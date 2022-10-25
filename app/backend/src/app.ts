import * as express from 'express';
import 'express-async-errors';
import errorMidleware from './middlewares/errorMiddleware';
import userRoute from './routes/userRoutes';
import teamsRoute from './routes/teamsRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.routes();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(userRoute);
    this.app.use(teamsRoute);

    this.app.use(errorMidleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
