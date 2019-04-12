import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

export const Choise = ({
  item,
  icon,
  isRTL,
  addcategory,
  showSearch,
  iconsize = 48
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        addcategory(item);
        showSearch();
      }}
      style={{
        flexDirection:
          isRTL && Platform.OS !== 'android' ? 'row' : 'row-reverse',
        margin: 7,
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Text
        style={{
          fontSize: iconsize > 60 ? 22 : 16,
          textAlign: 'right',
          paddingHorizontal: 10,
          color: '#000'
        }}
      >
        {item.name}
      </Text>
      <View
        style={{
          width: iconsize,
          height: iconsize,
          borderRadius: iconsize / 2,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: '#fff',
          borderColor: '#7678ED'
        }}
      >
        <View
          style={{
            width: iconsize - 4,
            height: iconsize - 4,
            borderRadius: (iconsize - 4) / 2,
            overflow: 'hidden',
            marginHorizontal: 10
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
              // tintColor: 'rgba(118, 120, 237, 0.1)'
            }}
            source={icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
