import * as React from 'react';
import { TouchableOpacity, Text, View, Image, Platform } from 'react-native';

export const Choise = ({ item, icon, navigation, isRTL }: any) => {
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
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }}
    >
      <Text
        style={{
          fontSize: 18,
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
          width: 48,
          height: 48,
          borderRadius: 24,
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
            width: 40,
            height: 40,
            borderRadius: 20,
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
