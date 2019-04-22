import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import secrets from '../constants/secrets';
import { store } from '../store';
import {
  logout,
  phoneRemoved,
  emailRemoved
} from '../store/actions/userAtions';

// const host = 'http://192.168.100.22:4000/';
// const uri = 'http://192.168.100.22:4000/';

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
        AsyncStorage.removeItem('phone');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('passcode');
        store.dispatch(phoneRemoved());
        store.dispatch(emailRemoved());
        NavigationActions.navigate({ routeName: 'Loading' });
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
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id || null
  })
});
