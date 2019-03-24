import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
// import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
// import swaggerDocument from './swagger.json';
import messages from './routes/messages';
import groups from './routes/groups';
import auth from './routes/auth';
import index from './routes/index';
import models from './models/models';


const app = express();
dotenv.config();

console.log(process.env.NODE_ENV);
console.log(`app: ${app.get('env')}`);

app.use(json());
app.use(urlencoded({ extended: true }));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v2/messages', messages);
app.use('/api/v2/groups', groups);
app.use('/api/v2/auth', auth);
app.use('/', index);

models();

const port = 5000 || process.env.PORT;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;
