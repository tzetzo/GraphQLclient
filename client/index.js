import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo"; // the glue b/n React & GraphQL wworld

import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const client = new ApolloClient({
  dataIdFromObject: o => o.id //this means we need to include the id in our queries to make ApolloClient identify the difference in data
}); //assumes GraphQL Server listens on "/graphql"

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="/songs/new" component={SongCreate} />
          <Route path="/songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
