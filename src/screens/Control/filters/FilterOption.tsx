import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { rtlos } from '../../../utils';

export const FilterOption = ({
  itemData,
  toggleModal,
  handleLabel,
  width,
  itemKind,
  addFilter,
  lang
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (
          itemKind === 'isfront' ||
          itemKind === 'islive' ||
          itemKind === 'isoffer' ||
          itemKind === 'ispublish'
        ) {
          const value = Number(itemData.id) === 1 ? true : false;
          addFilter(itemKind, value);
        } else {
          addFilter(itemKind, itemData.id);
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
        borderRadius: 5,
        flexDirection: rtlos() === 2 ? 'row-reverse' : 'row'
      }}
    >
      <Text
        style={{
          fontSize: 16,
          paddingHorizontal: 10
        }}
      >
        {itemData.name}
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: '#7678ED',
          paddingHorizontal: 5,
          top: 3
        }}
      >
        {itemData.qty}
      </Text>
    </TouchableOpacity>
  );
};
