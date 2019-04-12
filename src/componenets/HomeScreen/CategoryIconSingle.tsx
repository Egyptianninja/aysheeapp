import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from '../../utils';

const CategoryIconSingle = ({
  item,
  icon,
  addFilter,
  removeAllFilters,
  categoryId
}: any) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: 10,
        top: 15,
        height: 60,
        width: 60,
        overflow: 'hidden',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: '#7678ED',
        // paddingVertical: 10,
        zIndex: 300
      }}
    >
      <View
        style={{
          height: 52,
          width: 52,
          overflow: 'hidden',
          borderRadius: 26,
          justifyContent: 'center',
          alignItems: 'center',
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
    height: 52,
    width: 52,
    borderRadius: 26
  },
  imageView: {
    width: 52,
    height: 52
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  textView: {},
  text: {
    textAlign: 'center',
    fontSize: 12
  }
});

export default CategoryIconSingle;
