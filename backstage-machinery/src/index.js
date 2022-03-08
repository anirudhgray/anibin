import express from 'express';
import './db/mongoose.js';
import pasteRouter from './routers/paste.js';
import pollRouter from './routers/poll.js';
import Paste from './models/paste.js';
import Poll from './models/poll.js';

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

app.get('/counts', async (req, res) => {
  const pasteCount = await Paste.countDocuments();
  const pollCount = await Poll.countDocuments();
  return res.status(200).send({ pasteCount, pollCount });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
