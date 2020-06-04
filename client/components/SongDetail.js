import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{this.props.data.song.title}</h3>
      </div>
    );
  }
}

//fetches a song by its "id"
export default graphql(fetchSong, {
  options: props => {
    //props are passed by react-router to graphql
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
