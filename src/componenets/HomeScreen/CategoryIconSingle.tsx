import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
        height: 64,
        width: 64,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderBottomRightRadius: lang === 'ar' ? 32 : undefined,
        borderTopRightRadius: lang === 'ar' ? 32 : undefined,
        borderTopLeftRadius: lang === 'ar' ? undefined : 32,
        borderBottomLeftRadius: lang === 'ar' ? undefined : 32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default CategoryIconSingle;
