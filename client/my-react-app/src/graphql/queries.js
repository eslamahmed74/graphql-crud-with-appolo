import { gql } from "@apollo/client";

export const GET_USERS_WITH_COMPANY = gql`
  query GetUsers {
    users {
      id
      firstName
      age
      company {
        id
        name
        slogan
      }
    }
  }
`;
