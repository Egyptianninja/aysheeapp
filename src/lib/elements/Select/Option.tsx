import { Platform } from 'expo-core';
import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../load';

export const Option = ({
  itemData,
  toggleModal,
  onChange,
  name,
  width,
  isRTL,
  onSelectBrand,
  onSelecteOption,
  brandIcon
}: any) => {
  const src = brandIcon ? images[`b${itemData.id}`] : undefined;

  return (
    <TouchableOpacity
      onPress={() => {
        const langName = isRTL ? itemData.ar : itemData.en;

        if (name === 'kind') {
          onChange('brand', '');
          onChange('subBrand', '');
          onChange('eBrand', '');
          onSelecteOption ? onSelecteOption(itemData.id) : undefined;
        }
        if (name === 'brand') {
          onSelectBrand(itemData.id);
          onChange('subBrand', '');
        }
        if (name === 'brand' || name === 'subBrand') {
          onChange(name, {
            id: itemData.id,
            name: langName,
            nameGlob: `${itemData.ar} ${itemData.en}`
          });
        } else {
          onChange(name, {
            id: itemData.id,
            name: itemData.name,
            nameGlob: itemData.nameGlob
          });
        }
        toggleModal();
      }}
      style={{
        width,
        marginVertical: 5,
        paddingVertical: 5,
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderRadius: 5,
        flexDirection:
          isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row'
      }}
    >
      {brandIcon && (
        <View
          style={{
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
          fontSize: 18,
          fontFamily: 'cairo-regular',
          textAlign: isRTL ? 'right' : 'left',
          paddingHorizontal: 10
        }}
      >
        {itemData.name && !itemData.en
          ? itemData.name
          : isRTL
          ? itemData.ar
          : itemData.en}
      </Text>
    </TouchableOpacity>
  );
};
