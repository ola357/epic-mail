import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import messages from './routes/messages';
import auth from './routes/auth';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/messages', messages);
app.use('/api/v1/auth', auth);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;

/* import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
 */
