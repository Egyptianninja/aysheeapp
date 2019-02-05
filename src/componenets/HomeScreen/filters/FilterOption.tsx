import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const FilterOption = ({
  itemData,
  toggleModal,
  handleLabel,
  width,
  itemKind,
  addFilter,
  removeFilter,
  lang,
  rest,
  words
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
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
          itemKind === 'isfurnishered'
        ) {
          const value = Number(itemData.id) === 1 ? true : false;
          addFilter(itemKind, value);
        } else if (itemKind === 'city') {
          addFilter(itemKind, itemData.id);
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
          alignSelf: lang === 'ar' ? 'flex-end' : 'flex-start'
        }}
      >
        {itemData.name}
      </Text>
    </TouchableOpacity>
  );
};
