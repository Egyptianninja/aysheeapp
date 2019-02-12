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
        left: 12,
        top: 16,
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
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
    width: 50,
    height: 50
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
