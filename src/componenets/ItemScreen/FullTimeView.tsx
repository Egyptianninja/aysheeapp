import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FullTimeView = ({ fulltimeObject, words }: any) => {
  const fulltimetype = fulltimeObject
    ? fulltimeObject.value === true
      ? words.fullTime
      : undefined
    : undefined;

  return (
    <View
      style={{
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {fulltimetype && (
          <View style={styles.botton}>
            <Text style={styles.txt}>{fulltimetype}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FullTimeView;
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
