import * as React from 'react';
import { Platform, Text, TouchableOpacity, View, Image } from 'react-native';
import { getUserLocation, rtlos } from '../../../utils';
import LoadingTiny from '../../Common/LoadingTiny';
import { images } from '../../../load';

export default class FilterOption extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadinLocation: false
    };
  }
  render() {
    const {
      itemData,
      toggleModal,
      handleLabel,
      width,
      itemKind,
      addFilter,
      removeFilter,
      isRTL,
      bransIcon
    } = this.props;

    const src = bransIcon ? images[`b${itemData.id}`] : undefined;

    return (
      <TouchableOpacity
        onPress={async () => {
          if (itemKind === 'brandId') {
            removeFilter('subBrandId');
          }
          if (itemKind === 'kindId') {
            removeFilter('eBrandId');
            removeFilter('brandId');
            removeFilter('subBrandId');
          }
          if (
            itemKind === 'isnew' ||
            itemKind === 'issale' ||
            itemKind === 'isfurnishered' ||
            itemKind === 'isforman' ||
            itemKind === 'isjobreq' ||
            itemKind === 'isservicereq'
          ) {
            const value = Number(itemData.id) === 1 ? true : false;
            addFilter(itemKind, value);
          } else if (itemKind === 'city') {
            addFilter(itemKind, itemData.id);
          } else if (itemKind === 'sortType') {
            if (itemData.id === 3) {
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
              addFilter(itemKind, Number(itemData.id));
            }
          } else {
            addFilter(itemKind, Number(itemData.id));
          }
          handleLabel(itemData.name);
          toggleModal();
        }}
        style={{
          width,
          marginVertical: 5,
          paddingVertical: 5
        }}
      >
        <View
          style={{
            flexDirection:
              rtlos() === 3 ? 'row' : isRTL ? 'row-reverse' : 'row',
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          {this.state.loadinLocation &&
            itemKind === 'sortType' &&
            itemData.id === 3 && (
              <View
                style={{
                  position: 'absolute',
                  left: (width - 120) / 2,
                  top: 8
                }}
              >
                <LoadingTiny />
              </View>
            )}
          {bransIcon && (
            <View
              style={{
                top: 5,
                width: 40,
                height: 40
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%'
                }}
                source={src}
              />
            </View>
          )}
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'cairo-regular',
              paddingHorizontal: 10,
              alignSelf:
                isRTL && Platform.OS !== 'android' ? 'flex-end' : 'flex-start'
            }}
          >
            {itemData.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
