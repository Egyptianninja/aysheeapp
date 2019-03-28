import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from '../../utils';

const CategoryIcon = ({
  item,
  navigation,
  icon,
  addFilter,
  removeAllFilters,
  categoryId
}: any) => {
  const active = categoryId === item.id;
  return (
    <TouchableOpacity
      // onPress={async () => {
      //   if (categoryId === item.id) {
      //     removeAllFilters();
      //   } else {
      //     await removeAllFilters();
      //     addFilter('categoryId', item.id);
      //   }
      // }}
      onPress={() => navigation.navigate('CategoryScreen', { item })}
    >
      <View style={{ marginTop: 7, backgroundColor: '#fff' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#fff',
            marginHorizontal: 5,
            height: 60,
            width: 90,
            borderRadius: 10,
            borderColor: '#7678ED',
            borderWidth: 1
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              height: 56,
              width: 86,
              borderRadius: 10,
              // borderColor: '#7678ED',
              // borderWidth: 2,
              overflow: 'hidden'
            }}
          >
            <View style={{ width: 86, height: 56 }}>
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

        <View>
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
    fontSize: 14,
    marginTop: 3
  }
});

export default CategoryIcon;
