import express, { json } from 'express';
// import messages from './routes/messages';

const app = express();

app.use(json());
// app.use('/api/v1/messages', messages);

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;