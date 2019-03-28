import * as React from 'react';
import { TouchableOpacity, Text, View, Image, Platform } from 'react-native';

export const Choise = ({
  item,
  icon,
  isRTL,
  addcategory,
  showSearch,
  navigation,
  iconsize = 48
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CategoryScreen', { item });
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
          fontFamily: 'cairo-regular',
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
          borderWidth: 2,
          backgroundColor: '#fff',
          borderColor: '#7678ED'
        }}
      >
        <View
          style={{
            width: iconsize - 8,
            height: iconsize - 8,
            borderRadius: (iconsize - 8) / 2,
            overflow: 'hidden',
            marginHorizontal: 10
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
            }}
            source={icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
