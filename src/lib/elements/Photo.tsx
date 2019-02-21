import * as React from 'react';
import { View, Image } from 'react-native';
import LoadingView from './Common/LoadingView';
export default class Photo extends React.PureComponent<any, any> {
  state = {
    loading: true
  };
  render() {
    const { uri, width, height, overflow, resizeMode } = this.props;
    return (
      <View
        style={{
          width,
          height,
          overflow: overflow ? overflow : 'hidden'
        }}
      >
        <Image
          onLoadEnd={() => this.setState({ loading: false })}
          resizeMode={resizeMode ? resizeMode : 'contain'}
          style={{
            width,
            height
          }}
          source={{ uri }}
        />
        {this.state.loading && <LoadingView width={width} height={height} />}
      </View>
    );
  }
}
