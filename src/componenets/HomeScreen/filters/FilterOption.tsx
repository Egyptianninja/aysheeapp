import * as React from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { getUserLocation } from '../../../utils';
export const FilterOption = ({
  itemData,
  toggleModal,
  handleLabel,
  width,
  itemKind,
  addFilter,
  removeFilter,
  isRTL
}: any) => {
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
            const userLocation = await getUserLocation();
            if (userLocation) {
              const trueLocation = {
                lat: Number(userLocation.coords.latitude),
                lon: Number(userLocation.coords.longitude)
              };
              addFilter(itemKind, itemData.id);
              addFilter('trueLocation', trueLocation);
            }
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
        flex: 1,
        width: width - 80,
        padding: 3,
        margin: 7,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5
      }}
    >
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
    </TouchableOpacity>
  );
};
