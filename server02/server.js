import express from 'express';
import { graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import { graphql } from 'graphql'
const GRAPHQL_PORT = 3001;

const graphQLServer = express();


graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// parse POST body as text
graphQLServer.use(bodyParser.text({ type: 'application/graphql' }));

graphQLServer.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    });
});


graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));
