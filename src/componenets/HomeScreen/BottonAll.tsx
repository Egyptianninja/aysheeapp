import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BottonAll = ({
  lang,
  scrollView,
  removeAllFilters,
  navigation,
  title,
  allbtnactive,
  isAuthenticated
}: any) => (
  <TouchableOpacity
    onPress={() => {
      // lang === 'ar'
      //   ? scrollView.scrollToEnd({ animated: true })
      //   : scrollView.scrollTo({ animated: true, offset: 0 });
      // removeAllFilters();
      isAuthenticated
        ? navigation.navigate('ChoiseScreen')
        : navigation.navigate('Auth');
    }}
    style={{
      height: 70,
      marginVertical: 10,
      marginLeft: 5,
      borderWidth: 1,
      borderColor: '#DEDBDD',
      backgroundColor: '#7678ED',
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#666',
      shadowRadius: 3,
      shadowOpacity: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      flexDirection: 'row'
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
      {title.toUpperCase()}
    </Text>
  </TouchableOpacity>
);

export default BottonAll;
