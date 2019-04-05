import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FullTimeView = ({ fulltimeObject, words, ardroid }: any) => {
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
        flexDirection: ardroid ? 'row-reverse' : 'row',
        justifyContent: 'flex-end',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
      }}
    >
      <View style={{ flexDirection: ardroid ? 'row-reverse' : 'row' }}>
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
