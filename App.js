import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from './store';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './containers/login';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
    }
  }

    componentDidMount() {
        persistStore(store);
    }

  render() {

      if (!this.state.isReady) {
          return (
              <AppLoading
                  startAsync={ this.cacheResourcesAsync }
                  onFinish={() => this.setState({ isReady: true })}
                  onError={console.warn}
              />
          );
      }

    return (
        <Provider store={store}>
            <LoginScreen/>
        </Provider>
    );
  }

    async cacheResourcesAsync() {
        const images = [
            // All images cached here
            // require('./assets/...'),
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
