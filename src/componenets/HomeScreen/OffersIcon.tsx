import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from '../../utils';
import { images } from '../../load';
const OfferIcon = ({ navigation, title }: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
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
    width: 65,
    height: 61
  },
  imageView: {
    width: 65,
    height: 65
  },
  text: {
    textAlign: 'center',
    fontFamily: 'cairo-regular',
    fontSize: 12
  }
});

export default OfferIcon;
