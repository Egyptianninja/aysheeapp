import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../load';
import { StyleSheet } from '../../utils';
const BottonNew = ({ showCategoriesModal, title }: any) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 7,
      marginLeft: 5
    }}
  >
    <TouchableOpacity
      onPress={() => showCategoriesModal()}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
        height: 58,
        width: 58,
        borderRadius: 29,
        borderColor: '#7678ED',
        borderWidth: 2,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#555',
        shadowOpacity: 0.3
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: 50,
          width: 50,
          borderRadius: 25,
          overflow: 'hidden'
        }}
      >
        <Image
          style={[
            {
              width: 32,
              height: 32
            }
          ]}
          source={images.pointsmenu}
        />
      </View>
    </TouchableOpacity>
    <View style={styles.textView}>
      <Text style={[styles.text, { color: '#171717' }]}>{title}</Text>
    </View>
  </View>
);

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
    borderRadius: 13,
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
    fontSize: 12
  }
});

export default BottonNew;
