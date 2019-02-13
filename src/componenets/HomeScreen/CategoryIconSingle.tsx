import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from '../../utils';

const CategoryIconSingle = ({
  item,
  icon,
  addFilter,
  removeAllFilters,
  categoryId,
  lang
}: any) => {
  const active = categoryId === item.id;
  return (
    <View
      style={{
        position: 'absolute',
        left: 7,
        top: 11,
        height: 62,
        width: 62,
        overflow: 'hidden',
        borderRadius: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7678ED',
        // paddingVertical: 10,
        zIndex: 300
      }}
    >
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
        <View style={[styles.iconView, { backgroundColor: '#eee' }]}>
          <View style={styles.imageView}>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 80,
    backgroundColor: '#fff'
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 35
  },
  imageView: {
    width: 80,
    height: 80
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

export default CategoryIconSingle;
