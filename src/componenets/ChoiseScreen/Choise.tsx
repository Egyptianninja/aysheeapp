import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

export const Choise = ({ item, icon, navigation, lang }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 0) {
          navigation.navigate('AddRealEstateScreen', { item });
        } else if (item.id === 1) {
          navigation.navigate('AddCarScreen', { item });
        } else if (item.id === 5) {
          navigation.navigate('AddJobRequestScreen', { item });
        } else if (item.id === 6) {
          navigation.navigate('AddJobScreen', { item });
        } else if (item.id === 9) {
          navigation.navigate('AddServiceScreen', { item });
        } else if (item.id === 10) {
          navigation.navigate('AddRequestServiceScreen', { item });
        } else if (item.id === 15) {
          navigation.navigate('AddPartsScreen', { item });
        } else {
          navigation.navigate('AddClassifiedScreen', { item });
        }
      }}
      style={{
        flexDirection: lang === 'ar' ? 'row' : 'row-reverse',
        margin: 10,
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
          width: 25,
          height: 26,
          marginHorizontal: 10
        }}
      >
        <Image
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            tintColor: '#777'
          }}
          source={icon}
        />
      </View>
    </TouchableOpacity>
  );
};
