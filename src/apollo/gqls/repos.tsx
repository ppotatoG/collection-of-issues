import { gql } from "@apollo/client";

const GET_REPOS = gql`
  query {
    documentation_url
  }
`;

export { GET_REPOS };