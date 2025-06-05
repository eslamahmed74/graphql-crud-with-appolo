import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($name: String!, $company: String!) {
    login(name: $name, company: $company) {
      token
      user {
        id
        firstName
        company {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($firstName: String!, $age: Int!, $companyId: ID!) {
    addUser(firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
      company {
        name
      }
    }
  }
`;
