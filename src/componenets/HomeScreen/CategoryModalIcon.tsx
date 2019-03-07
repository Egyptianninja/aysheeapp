import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from '../../utils';

const CategoryModalIcon = ({
  item,
  icon,
  addFilter,
  removeAllFilters,
  hideCategoriesModal,
  categoryId,
  width,
  height
}: any) => {
  const active = categoryId === item.id;
  return (
    <TouchableOpacity
      onPress={async () => {
        await removeAllFilters();
        addFilter('categoryId', item.id);
        hideCategoriesModal();
      }}
      style={{
        padding: 5
      }}
    >
      <View
        style={{
          width: (width - 20) / 3 - 13.45,
          height: (width - 20) / 3 - 13.45,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: '#fff',
          overflow: 'hidden',
          borderRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1
        }}
      >
        <Image
          style={[
            {
              flex: 1,
              width: '100%',
              height: '100%'
            }
          ]}
          source={icon}
        />
      </View>

      <View style={styles.textView}>
        <Text
          style={{
            color: '#171717',
            textAlign: 'center',
            fontFamily: 'cairo-regular',
            fontSize: 12
          }}
        >
          {item.name}
        </Text>
      </View>
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
