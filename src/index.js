import express from 'express';
import rc from 'rc';

const config = rc('the_voices', {
  host: '0.0.0.0',
  port: 8080,
});

const app = express();

app.listen(config.port, config.host);
