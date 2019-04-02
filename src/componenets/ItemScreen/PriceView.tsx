import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceView = ({
  price,
  currency,
  newObject,
  saleObject,
  furntObject,
  warrantyObject,
  words,
  ardroid
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
        flexDirection: ardroid ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
      }}
    >
      <View style={{ flexDirection: ardroid ? 'row-reverse' : 'row' }}>
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
      <View style={{ flexDirection: ardroid ? 'row-reverse' : 'row' }}>
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
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderColor: '#ddd'
  },
  txt: {
    fontSize: 13,
    color: '#7678ED',
    paddingHorizontal: 7
  }
});
