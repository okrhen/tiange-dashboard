import {
  ApolloClient, from, HttpLink, InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  let httpHeaders = {
    ...headers,
  };

  if (token) {
    httpHeaders = {
      ...httpHeaders,
      authorization: token ? `Bearer ${token}` : '',
    };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: httpHeaders,
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
    ));
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const clientLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: from([errorLink, clientLink]),
  cache: new InMemoryCache(),
});

export default client;
