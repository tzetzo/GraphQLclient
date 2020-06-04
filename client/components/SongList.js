import React, { Component } from "react";
import { graphql } from "react-apollo"; // the glue b/n React & GraphQL wworld
import { Link } from "react-router";
import gql from "graphql-tag";
import query from "../queries/fetchSongs"; //fetches the songs

class SongList extends Component {
  onSongDelete(id) {
    // invoke the mutation passing parameter
    this.props
      .mutate({
        variables: {
          id
        }
        //refetcQueries: [{ query }] //telling GraphQL to execute the listed query after the mutation
      })
      .then(() => this.props.data.refetch()); //refetches the data associated with query; used when the query is associated with this Component
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title} </Link>
          <i
            className="material-icons right"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
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

//template string is used to construct the mutation
//query variable "$id" used; ID is primitive type like String etc
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

//executes the query and places the songs under this.props.data.songs
//associate mutation & query with the Component
export default graphql(mutation)(graphql(query)(SongList));
