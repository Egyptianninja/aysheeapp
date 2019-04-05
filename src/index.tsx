import { AppLoading } from 'expo';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { client } from './graphql';
import { cacheImages, images, loadFonts } from './load';
import Navigation from './navigation';
import { persistor, store } from './store';

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
