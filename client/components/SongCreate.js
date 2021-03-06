import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
  }

  onSubmit(e) {
    e.preventDefault();

    // invoke the mutation passing parameter
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query }] //telling GraphQL to execute the listed query after the mutation; used when query is not associated with this Component
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

//template string is used to construct the mutation
//query variable "$title" used
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
