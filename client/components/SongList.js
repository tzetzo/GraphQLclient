import React, { Component } from "react";
import { graphql } from "react-apollo"; // the glue b/n React & GraphQL wworld
import { Link } from "react-router";
import query from "../queries/fetchSongs";


class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}


//executes the query and places the songs under this.props.data.songs
export default graphql(query)(SongList);
