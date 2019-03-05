import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from '../../utils';
const BottonNew = ({
  isRTL,
  scrollView,
  removeAllFilters,
  navigation,
  title,
  allbtnactive,
  isAuthenticated,
  showCategoriesModal
}: any) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 7,
      marginLeft: 5
    }}
  >
    <TouchableOpacity
      onPress={() => showCategoriesModal()}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: '#7678ED',
        borderWidth: 2,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#555',
        shadowOpacity: 0.3
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: 52,
          width: 52,
          borderRadius: 26,
          overflow: 'hidden',
          backgroundColor: '#7678ED'
        }}
      >
        <Ionicons
          name="ios-keypad"
          size={38}
          color="#fff"
          style={{ top: 2, left: 1 }}
        />
      </View>
    </TouchableOpacity>
    <View style={styles.textView}>
      <Text style={[styles.text, { color: '#171717' }]}>جميع الاقسام</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    minWidth: 80,
    backgroundColor: '#fff'
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 52,
    width: 52,
    borderRadius: 13,
    // borderColor: '#7678ED',
    // borderWidth: 2,
    overflow: 'hidden'
  },
  imageView: {
    width: 52,
    height: 52
  },
  text: {
    textAlign: 'center',
    fontFamily: 'cairo-regular',
    fontSize: 12
  }
});

export default BottonNew;
