import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { rtlos } from '../../utils';

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
        flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
        justifyContent: 'flex-end',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
      }}
    >
      <View style={{ flexDirection: rtlos() === 3 ? 'row-reverse' : 'row' }}>
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
