import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { Application } from '../interfaces/express.types';
import Paths from './paths/index';
const { URL_GENERAL } = process.env;

const _filename = __filename;
const _dirname = path.dirname(_filename);
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Auth service', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: { ...Paths },
  },
  apis: [`${path.join(_dirname, '../controllers/*.ts')}`],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app: Application, port: number) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Funcionando en ${URL_GENERAL}${port}/swagger`);
};

export default swaggerDocs;
