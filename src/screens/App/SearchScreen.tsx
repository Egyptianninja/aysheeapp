import { Constants } from 'expo';
import * as React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import SearchHeader from '../../componenets/HomeScreen/SearchHeader';
import { CategoryView, ResultView } from '../../componenets/Search';
const { height } = Dimensions.get('window');

const finalTop = Constants.statusBarHeight + 40;

class ChoiseScreen extends React.Component<any, any> {
  state = {
    isSearchVisible: false,
    category: null,
    animation: new Animated.Value(0)
  };

  showSearch = () => {
    this.setState({ isSearchVisible: true });
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 200
    }).start();
  };
  hideSearch = () => {
    this.setState({ isSearchVisible: false });
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200
    }).start();
  };
  addcategory = (category: any) => {
    this.setState({ category });
  };
  removecategory = () => {
    this.setState({ category: null });
  };

  render() {
    const animatedTop = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [height + finalTop, finalTop]
    });
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <SearchHeader
          navigation={this.props.navigation}
          isSearchVisible={this.state.isSearchVisible}
          showSearch={this.showSearch}
          hideSearch={this.hideSearch}
          removecategory={this.removecategory}
        />
        <CategoryView
          isSearchVisible={this.state.isSearchVisible}
          showSearch={this.showSearch}
          hideSearch={this.hideSearch}
          addcategory={this.addcategory}
        />

        <Animated.View
          style={{
            position: 'absolute',
            top: animatedTop,
            left: 0,
            right: 0,
            height: height - (finalTop + 45),
            zIndex: 150,
            backgroundColor: '#fff'
          }}
        >
          <ResultView
            category={this.state.category}
            hideSearch={this.hideSearch}
            removecategory={this.removecategory}
            navigation={this.props.navigation}
          />
        </Animated.View>
      </View>
    );
  }
}

export default ChoiseScreen;
