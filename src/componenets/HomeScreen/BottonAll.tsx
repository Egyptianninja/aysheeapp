import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BottonAll = ({
  lang,
  scrollView,
  removeAllFilters,
  title,
  allbtnactive
}: any) => (
  <TouchableOpacity
    onPress={() => {
      lang === 'ar'
        ? scrollView.scrollToEnd({ animated: true })
        : scrollView.scrollTo({ animated: true, offset: 0 });
      removeAllFilters();
    }}
    style={{
      padding: 3,
      height: 74,
      paddingHorizontal: 3,
      margin: 5,
      borderWidth: 1,
      borderColor: '#DEDBDD',
      backgroundColor: allbtnactive ? '#9C949A' : '#eee',
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#666',
      shadowRadius: 3,
      shadowOpacity: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20
    }}
  >
    <Text
      style={{
        fontSize: 14,
        color: allbtnactive ? '#eee' : '#9C949A',
        fontFamily: 'cairo-regular',
        transform: [{ rotateZ: '270deg' }]
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default BottonAll;
