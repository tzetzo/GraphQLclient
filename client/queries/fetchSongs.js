import gql from "graphql-tag";

//template string is used to construct the query
// query to fetch all songs --> returns the id & title for each fetched song
export default gql`
  {
    songs {
      id
      title
    }
  }
`;
