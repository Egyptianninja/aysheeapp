import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FullTimeView = ({ fulltimeObject, words }: any) => {
  const fulltimetype =
    fulltimeObject.value === true
      ? words.fullTime
      : fulltimeObject.value === false
      ? words.parttime
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
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderColor: '#eee',
    borderWidth: 1,
    marginVertical: 5
  },
  txt: {
    fontSize: 12,
    color: '#96BFE0',
    fontWeight: 'bold',
    paddingHorizontal: 5
  }
});
