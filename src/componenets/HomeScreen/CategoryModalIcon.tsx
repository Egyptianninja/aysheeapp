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
        paddingVertical: 5
      }}
    >
      <View
        style={{
          width: (width - 20) / 4 - 20,
          height: (width - 20) / 4 - 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: '#fff',
          borderRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1
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
          fontSize: 12
        }}
      >
        {item.name.substring(0, 10)}
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
    fontSize: 12
  }
});

export default CategoryModalIcon;
