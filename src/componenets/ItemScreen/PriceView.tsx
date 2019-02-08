import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceView = ({
  price,
  currency,
  newObject,
  saleObject,
  furntObject,
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
      <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#26A65B' }}>
          {currency} {price.toLocaleString('en')}
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
      </View>
    </View>
  );
};

export default PriceView;
const styles = StyleSheet.create({
  botton: {
    padding: 5,
    marginHorizontal: 3,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 5
  },
  txt: {
    fontSize: 12,
    color: '#ababab',
    fontWeight: 'bold',
    paddingHorizontal: 5
  }
});
