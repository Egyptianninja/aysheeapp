import * as React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Navigation from './navigation';
import { store, persistor } from './store';
import { client } from './graphql';
import { images, loadFonts, cacheImages } from './load';
import { getCountryCityFromToken } from './utils';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  cacheAssets = async () => {
    const imagesAssets = cacheImages(Object.values(images));
    await Promise.all([...imagesAssets]);
    await loadFonts();
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheAssets}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
