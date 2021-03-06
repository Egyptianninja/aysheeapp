import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../load';
import { StyleSheet } from '../../utils';
const OfferIcon = ({ navigation, title }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OffersScreen');
      }}
    >
      <View style={styles.container}>
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
              source={images.offers}
            />
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: '#171717' }]}>{title}</Text>
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
    width: 70,
    height: 66
  },
  imageView: {
    width: 70,
    height: 70
  },
  text: {
    textAlign: 'center',
    fontSize: 12
  }
});

export default OfferIcon;
