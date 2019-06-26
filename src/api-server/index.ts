import express from 'express';
import startApolloServer from './graphql';

var compression = require('compression')

import { PORT } from '../utils/config';

const startServer = async (): Promise<void> => {
  const app = express();
  app.use(compression())
  const apolloServer = startApolloServer();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: true,
    },
  });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 API server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
};

startServer();
