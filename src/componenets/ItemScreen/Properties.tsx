import * as React from 'react';
import { Text, View } from 'react-native';

const Properties = ({ data, words, lang, android }: any) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: lang === 'ar' && !android ? 'row-reverse' : 'row',
      flexWrap: 'wrap'
    }}
  >
    {data.map((dt: any) => {
      if (dt.value && dt.value !== true) {
        return (
          <View
            style={{
              padding: 10,
              width: '33%',
              alignItems: lang === 'ar' && !android ? 'flex-end' : 'flex-start',
              justifyContent: 'center'
            }}
            key={dt.name}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#ababab',
                paddingHorizontal: 10
              }}
            >
              {getName(dt.name, words)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                paddingHorizontal: 10
              }}
            >
              {dt.value}
            </Text>
          </View>
        );
      }
    })}
  </View>
);

export default Properties;
const getName = (name: any, words: any) => {
  return words[name];
};
