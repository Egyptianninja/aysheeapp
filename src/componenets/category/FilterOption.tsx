import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { getUserLocation, rtlos } from '../../utils';
import LoadingTiny from '../Common/LoadingTiny';

export default class FilterOption extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.rest !== prevState.rest) {
      return { rest: nextProps.rest };
    } else {
      return { ...prevState };
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      loadinLocation: false,
      rest: null
    };
  }
  render() {
    const { itemData, itemKind, addFilter, isRTL } = this.props;
    const rst: any = this.state.rest;
    const sortId = rst.sortType ? rst.sortType : 1;
    return (
      <TouchableOpacity
        onPress={async () => {
          if (itemKind === 'sortType') {
            if (itemData.id === 3) {
              this.setState({ active: itemData.id });
              this.setState({ loadinLocation: true });
              const userLocation = await getUserLocation();
              if (userLocation) {
                const trueLocation = {
                  lat: Number(userLocation.coords.latitude),
                  lon: Number(userLocation.coords.longitude)
                };
                addFilter(itemKind, itemData.id);
                addFilter('trueLocation', trueLocation);
              }
              this.setState({ loadinLocation: false });
            } else {
              this.setState({ active: itemData.id });
              addFilter(itemKind, Number(itemData.id));
            }
          }
        }}
        style={{
          paddingVertical: 5
        }}
      >
        <View
          style={{
            flexDirection:
              rtlos() === 3 ? 'row' : isRTL ? 'row-reverse' : 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 10,
            borderBottomWidth: sortId === itemData.id ? 2 : undefined,
            borderBottomColor: sortId === itemData.id ? '#FBBC93' : undefined
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'cairo-regular',
              paddingHorizontal: 10,
              color: '#5658AD',
              fontWeight: sortId === itemData.id ? 'bold' : undefined
            }}
          >
            {itemData.name}
          </Text>
          {this.state.loadinLocation && itemData.id === 3 && <LoadingTiny />}
        </View>
      </TouchableOpacity>
    );
  }
}
