import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceView = ({
  price,
  currency,
  newObject,
  saleObject,
  furntObject,
  warrantyObject,
  words
}: any) => {
  const newtype =
    newObject.value === true
      ? words.new
      : newObject.value === false
      ? words.old
      : undefined;
  const saletype =
    saleObject.value === true
      ? words.forsale
      : saleObject.value === false
      ? words.forrent
      : undefined;
  const furntype =
    furntObject.value === true
      ? words.furnishered
      : furntObject.value === false
      ? words.unfurnishered
      : undefined;
  const warrantyType =
    warrantyObject && warrantyObject.value === true
      ? words.warranty
      : undefined;
  return (
    <View
      style={{
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: '#26A65B',
            fontWeight: 'bold',
            opacity: 0.9,
            fontSize: 22
          }}
        >
          {price.toLocaleString('en')}
        </Text>
        <Text
          style={{
            color: '#777',
            paddingTop: 10,
            fontSize: 14,
            fontWeight: '200'
          }}
        >
          {' '}
          {currency}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {newtype && (
          <View style={styles.botton}>
            <Text style={styles.txt}>{newtype}</Text>
          </View>
        )}
        {saletype && (
          <View style={styles.botton}>
            <Text style={styles.txt}>{saletype}</Text>
          </View>
        )}
        {furntype && (
          <View style={styles.botton}>
            <Text style={styles.txt}>{furntype}</Text>
          </View>
        )}
        {warrantyType && (
          <View style={styles.botton}>
            <Text style={styles.txt}>{warrantyType}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PriceView;
const styles = StyleSheet.create({
  botton: {
    padding: 5,
    marginHorizontal: 3,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 5
  },
  txt: {
    fontSize: 12,
    color: '#7678ED',
    paddingHorizontal: 5
  }
});
