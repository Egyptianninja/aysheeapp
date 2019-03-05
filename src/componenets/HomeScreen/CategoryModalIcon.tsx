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
    >
      <View style={{ width: (width - 20) / 4, height: (height - 175) / 5 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#fff',
            height: 62,
            width: 62,
            borderRadius: 8,
            borderColor: '#7678ED',
            borderWidth: 1,
            shadowOffset: { width: 3, height: 3 },
            shadowColor: '#555',
            shadowOpacity: 0.3
          }}
        >
          <View style={styles.iconView}>
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
        </View>

        <View style={styles.textView}>
          <Text style={[styles.text, { color: '#171717' }]}>{item.name}</Text>
        </View>
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
