import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDocument from './swagger.json';
import messages from './routes/messages';
import groups from './routes/groups';
import auth from './routes/auth';
import models from './models/models';

const app = express();
dotenv.config();

// console.log(result.parsed);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v2/messages', messages);
app.use('/api/v2/groups', groups);
app.use('/api/v2/auth', auth);

models();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;
