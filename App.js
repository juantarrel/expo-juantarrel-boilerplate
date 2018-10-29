import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
    }
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
      <View style={styles.container}>
        <Text>Boilerplate tarrel</Text>
      </View>
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
