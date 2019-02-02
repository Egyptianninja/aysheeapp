import * as React from "react";
import { AsyncStorage } from "react-native";
import { theme, words } from "../../store/getStore";
import ChoiseCategory from "../../componenets/ChoiseScreen/ChoiseCategory";

class ChoiseScreen extends React.Component<any, any> {
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoading");
  };

  render() {
    const { createAd } = words();
    const { color } = theme();

    return (
      <ChoiseCategory
        navigation={this.props.navigation}
        color={color.modal}
        title={createAd}
        lang={this.props.language}
      />
    );
  }
}

export default ChoiseScreen;
