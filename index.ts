import 'dotenv/config';
import App from './src/app';

const { PORT } = process.env;

console.log(PORT);

new App().listen(Number(PORT));
