import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { NavigationActions } from 'react-navigation';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { logout, phoneRemoved } from '../store/actions/userAtions';
import secrets from '../constants/secrets';
import { store } from '../store';

const host = __DEV__ ? 'http://192.168.100.22:4000/' : secrets.host;
const uri = __DEV__ ? 'http://192.168.100.22:4000/' : secrets.uri;

// const host = secrets.host;
// const uri = secrets.uri;

const httpLink = createHttpLink({
  uri: host
});

const wsLink = new WebSocketLink({
  uri,
  options: {
    reconnect: true
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('aysheetoken');
  return {
    headers: {
      ...headers,
      authshee: token ? `ayshee ${token}` : ''
    }
  };
});

const logoutLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      // if (message === "auth token error" || message === "auth code error") {
      if (message === 'auth code error') {
        store.dispatch(logout());
        AsyncStorage.removeItem('aysheetoken');
        store.dispatch(phoneRemoved());
        NavigationActions.navigate({ routeName: 'HomeScreen' });
      }
    });
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  logoutLink.concat(authLink.concat(httpLink))
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
