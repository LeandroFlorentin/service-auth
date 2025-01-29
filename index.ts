import 'dotenv/config';
import App from './src/app';

const { PORT } = process.env;

new App().listen(Number(PORT));
