import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo"; // the glue b/n React & GraphQL wworld

import SongList from './components/SongList';

const client = new ApolloClient({}); //assumes GraphQL Server listens on "/graphql"

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
