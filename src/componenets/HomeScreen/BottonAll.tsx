import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BottonAll = ({ lang, scrollView, removeAllFilters, title }: any) => (
  <TouchableOpacity
    onPress={() => {
      lang === 'ar'
        ? scrollView.scrollToEnd({ animated: true })
        : scrollView.scrollTo({ animated: true, offset: 0 });
      removeAllFilters();
    }}
    style={{
      padding: 3,
      paddingHorizontal: 4,
      margin: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#6FA7D5',
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#666',
      shadowRadius: 3,
      shadowOpacity: 0.2,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text
      style={{
        fontSize: 14,
        color: '#fff',
        fontFamily: 'cairo-regular',
        transform: [{ rotateZ: '270deg' }]
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default BottonAll;
