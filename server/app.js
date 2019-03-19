import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDocument from './swagger.json';
import messages from './routes/messages';
import auth from './routes/auth';

const app = express();
/* if (!config.get('jwtPrivateKey')) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
} */
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v2/messages', messages);
app.use('/api/v2/auth', auth);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;

/* import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
 */
