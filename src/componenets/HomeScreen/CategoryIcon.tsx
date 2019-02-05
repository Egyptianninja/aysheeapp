import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from '../../utils';

const CategoryIcon = ({
  item,
  icon,
  addFilter,
  removeAllFilters,
  categoryId
}: any) => {
  const active = categoryId === item.id;
  return (
    <TouchableOpacity
      onPress={async () => {
        if (categoryId === item.id) {
          removeAllFilters();
        } else {
          await removeAllFilters();
          addFilter('categoryId', item.id);
        }
      }}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.iconView,
            { backgroundColor: active ? '#9C949A' : '#eee' }
          ]}
        >
          <View style={styles.imageView}>
            <Image
              style={[
                {
                  flex: 1,
                  width: '100%',
                  height: '100%'
                },
                { tintColor: active ? '#eee' : '#6A6262' }
              ]}
              source={icon}
            />
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: '#6A6262' }]}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 5,
    marginTop: 5,
    minWidth: 80,
    backgroundColor: '#fff'
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderRadius: 25
  },
  imageView: {
    width: 26,
    height: 26
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  textView: {},
  text: {
    textAlign: 'center',
    fontFamily: 'cairo-regular',
    fontSize: 12
  }
});

export default CategoryIcon;
