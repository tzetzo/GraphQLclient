import React, { Component } from "react";
import gql from "graphql-tag";

class SongList extends Component {
  render() {
    return <div>SongList</div>;
  }
}

//template string is used for the queries:
const query = gql`
  {
    songs {
      title
    }
  }
`;

export default SongList;
