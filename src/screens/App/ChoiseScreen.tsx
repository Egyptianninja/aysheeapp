import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { words } from '../../store/getStore';
import ChoiseCategory from '../../componenets/ChoiseScreen/ChoiseCategory';

class ChoiseScreen extends React.Component<any, any> {
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
    const { createAd } = words();

    return (
      <ChoiseCategory
        navigation={this.props.navigation}
        title={createAd}
        lang={this.props.language}
      />
    );
  }
}

export default ChoiseScreen;
