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
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#fff',
            height: 60,
            width: 60,
            borderRadius: 30,
            borderColor: '#7678ED',
            borderWidth: 2
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
  container: {
    marginTop: 5,
    minWidth: 80,
    backgroundColor: '#fff'
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 52,
    width: 52,
    borderRadius: 26,
    // borderColor: '#7678ED',
    // borderWidth: 2,
    overflow: 'hidden'
  },
  imageView: {
    width: 52,
    height: 52
  },
  text: {
    textAlign: 'center',
    fontFamily: 'cairo-regular',
    fontSize: 12
  }
});

export default CategoryIcon;
