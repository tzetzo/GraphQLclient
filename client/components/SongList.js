import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"; // the glue b/n React & GraphQL wworld

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return <li key={song.id} className="collection-item">{song.title}</li>;
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return <ul className='collection'>{this.renderSongs()}</ul>;
  }
}

//template string is used to construct the query:
const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

//executes the query and places the songs under this.props.data.songs
export default graphql(query)(SongList);
