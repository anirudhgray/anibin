import express from 'express';
import './db/mongoose.js';
import pasteRouter from './routers/paste.js';
import pollRouter from './routers/poll.js';

const app = express();
const port = process.env.port;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Expose-Headers', 'Authorization');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  );
  next();
});
app.use(express.json());
app.use(pasteRouter);
app.use(pollRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
