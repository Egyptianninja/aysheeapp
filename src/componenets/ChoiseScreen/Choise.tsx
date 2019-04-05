import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

export const Choise = ({
  item,
  icon,
  navigation,
  isRTL,
  iconsize = 48
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 0) {
          navigation.navigate('AddRealEstateScreen', { item });
        } else if (item.id === 1) {
          navigation.navigate('AddCarScreen', { item });
        } else if (item.id === 5) {
          navigation.navigate('AddJobScreen', { item });
        } else if (item.id === 9) {
          navigation.navigate('AddServiceScreen', { item });
        } else if (item.id === 15) {
          navigation.navigate('AddPartsScreen', { item });
        } else {
          navigation.navigate('AddClassifiedScreen', { item });
        }
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
