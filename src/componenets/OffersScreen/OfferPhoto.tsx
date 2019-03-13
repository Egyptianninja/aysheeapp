import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { LoadingView } from '../../lib';
import { getDate } from '../../utils';
export default class OfferPhoto extends React.PureComponent<any, any> {
  state = {
    loading: true
  };
  render() {
    const { offer, width, height, overflow, resizeMode, radius } = this.props;
    const { uri, title, body, start, end } = offer;
    return (
      <View>
        <View
          style={{
            width,
            height,
            overflow: overflow ? overflow : 'hidden',
            borderRadius: radius
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
        <View
          style={{
            position: 'absolute',
            width,
            bottom: 0,
            height: 90,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center',
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius
          }}
        >
          <Text
            style={{
              textAlign: offer.isrtl ? 'right' : 'left',
              color: '#fff',
              fontSize: 18,
              top: -10,
              paddingHorizontal: 10,
              fontWeight: 'bold'
            }}
          >
            {title}
          </Text>
          <Text
            style={[
              {
                fontSize: 15,
                textAlign: offer.isrtl ? 'right' : 'left',
                color: '#ddd',
                top: -10,
                paddingHorizontal: 10
              }
            ]}
            numberOfLines={2}
          >
            {body}
          </Text>
          <Text
            style={{
              position: 'absolute',
              left: 10,
              top: 45,
              textAlign: 'left',
              color: '#fff',
              fontSize: 14,
              marginTop: 6,
              fontWeight: 'bold'
            }}
            numberOfLines={2}
          >
            {getDate(start)} - {getDate(end)}
          </Text>
        </View>
      </View>
    );
  }
}
