import 'dotenv/config';
import 'reflect-metadata';
import { IApp } from './src/interfaces/app.interface';
import { container, types } from './src/inverfisy/inversify.config';

const { PORT } = process.env;

const app = container.get<IApp>(types.App);
app.listen(Number(PORT));
