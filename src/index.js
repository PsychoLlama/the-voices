import parser from 'body-parser';
import express from 'express';
import rc from 'rc';

import routes from './routes';

const config = rc('the_voices', {
  host: '0.0.0.0',
  port: 8080,
});

const app = express();

app.use(parser.json());
app.use('/player', routes);

app.listen(config.port, config.host);
