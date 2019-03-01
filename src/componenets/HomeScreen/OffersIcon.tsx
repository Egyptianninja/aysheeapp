import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from '../../utils';
import { images } from '../../load';
const OfferIcon = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        navigation.navigate('OfferScreen');
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
    height: 75,
    borderRadius: 13,
    // borderColor: '#7678ED',
    // borderWidth: 2,
    overflow: 'hidden',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#555',
    shadowOpacity: 0.5
  },
  imageView: {
    width: 70,
    height: 75,
    opacity: 0.6
  },
  text: {
    textAlign: 'center',
    fontFamily: 'cairo-regular',
    fontSize: 12
  }
});

export default OfferIcon;
