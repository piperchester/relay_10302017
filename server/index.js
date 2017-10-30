import http from 'http';
import express from 'express';
import graphqlHttp from 'express-graphql';  // express middleware

import { schema } from './schema';

import './output-schema';

const PORT = 3020;
const app = express();

app.use('/', graphqlHttp({
  schema,
  pretty: true,
  graphiql: true,
  context: {
    baseUrl: 'http://localhost:3010'
  }
}));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`widgets graphql server stated on port ${PORT}`);
});
