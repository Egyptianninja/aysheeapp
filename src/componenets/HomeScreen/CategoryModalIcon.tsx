import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from '../../utils';

const CategoryModalIcon = ({
  item,
  icon,
  navigation,
  categoryId,
  width,
  hideCategoriesModal
}: any) => {
  const active = categoryId === item.id;
  return (
    <TouchableOpacity
      onPress={() => {
        hideCategoriesModal();
        navigation.navigate('CategoryScreen', { item });
      }}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10
      }}
    >
      <View
        style={{
          width: (width - 20) / 4 - 25,
          height: (width - 20) / 4 - 25,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: '#fff',
          borderRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1
          // shadowColor: '#555',
          // shadowOffset: {
          //   width: 0,
          //   height: 5
          // },
          // shadowOpacity: 0.4,
          // shadowRadius: 5,
          // elevation: 5
        }}
      >
        <Image
          style={[
            {
              flex: 1,
              borderRadius: 8,
              width: '100%',
              height: '100%'
            }
          ]}
          source={icon}
        />
      </View>
      <Text
        style={{
          color: '#171717',
          paddingTop: 5,
          textAlign: 'center',
          // fontFamily: 'cairo-regular',
          fontSize: 10
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    width: 60,
    borderRadius: 8,
    // borderColor: '#7678ED',
    // borderWidth: 2,
    overflow: 'hidden'
  },
  imageView: {
    width: 60,
    height: 60
  },
  text: {
    textAlign: 'center',
    fontFamily: 'cairo-regular',
    fontSize: 12
  }
});

export default CategoryModalIcon;
