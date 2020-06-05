import React, { Component } from "react";
import { graphql } from "react-apollo"; // the glue b/n React & GraphQL wworld
import gql from "graphql-tag";

class LyricList extends Component {
  onLike(id, likes) {
    // invoke the mutation passing parameter
    this.props.mutate({
      variables: { id },
      optimisticResponse: {   // update data before response comes back so user doesnt see a delay
        __typename: "Mutation",
        likeLyric: { // the response we expect to receive from the back-end; dev tools - Network - see response Preview under data for the GraphQL request
          id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
      //refetcQueries: [{ query }] //telling GraphQL to execute the listed query after the mutation
    });
    // .then(() => this.props.data.refetch());
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box right">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
