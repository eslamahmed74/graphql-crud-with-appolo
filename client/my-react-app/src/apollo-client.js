import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// GraphQL API endpoint configuration
const GRAPHQL_ENDPOINT = "http://localhost:8000/graphql";

// Create HTTP link for GraphQL operations
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include" // Include credentials in requests
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Authentication link to add token to requests
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json"
    }
  };
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          // Merge function to handle pagination if implemented in the future
          merge(existing = [], incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

// Create Apollo Client instance
export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    },
    mutate: {
      errorPolicy: "all"
    }
  },
  connectToDevTools: process.env.NODE_ENV === "development"
});

export default client;
