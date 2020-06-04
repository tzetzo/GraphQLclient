import gql from "graphql-tag";

// template string is used to construct the query
// query to fetch a song --> returns the id & title for the song
export default gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;
