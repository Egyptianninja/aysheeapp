import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
      onPress={() => navigation.navigate('CategoryScreen', { item })}
    >
      <View style={{ marginTop: 7, backgroundColor: '#fff', minWidth: 80 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#fff',
            marginHorizontal: 5,
            height: 60,
            width: 60,
            borderRadius: 30,
            borderColor: '#7678ED',
            borderWidth: 2
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              height: 52,
              width: 52,
              borderRadius: 26,
              // borderColor: '#7678ED',
              // borderWidth: 2,
              overflow: 'hidden'
            }}
          >
            <View style={{ width: 56, height: 56 }}>
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
    minWidth: 85,
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
    fontSize: 12,
    marginTop: 5
  }
});

export default CategoryIcon;
