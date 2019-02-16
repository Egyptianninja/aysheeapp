import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

const ItemHeader = ({ title, navigation }: any) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: Constants.statusBarHeight + 6,
          left: 10,
          zIndex: 860,
          width: 32,
          height: 32,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <Ionicons name="ios-arrow-back" size={30} color="#9C949A" />
      </TouchableOpacity>
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            paddingTop: Constants.statusBarHeight,
            height: Constants.statusBarHeight + 45,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            zIndex: 850,
            shadowOffset: { width: 3, height: 3 },
            shadowColor: '#555',
            shadowOpacity: 0.2,
            backgroundColor: '#fff'
          }
        ]}
      >
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontFamily: 'cairo-regular',
              fontSize: 20,
              color: '#373737'
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};

export default ItemHeader;
