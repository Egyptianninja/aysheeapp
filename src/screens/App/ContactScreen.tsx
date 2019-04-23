import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Logo } from '../../componenets';
import { Linking } from 'expo';

const ContactScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9'
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 180,
          height: 180
        }}
      >
        <Logo size={120} tintColor="#373737" />
      </View>
      <View style={{ width: 250, marginTop: 100 }}>
        <View>
          <Text style={{ fontSize: 24, color: '#373737' }}>Contact</Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://ishee.co')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Ionicons name="ios-globe" size={26} color="#777" />
          <Text
            style={{
              fontSize: 18,
              color: '#777',
              paddingHorizontal: 10
            }}
          >
            www.ishee.co
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto: info@ishee.co')}
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}
        >
          <Ionicons name="ios-mail" size={26} color="#777" />
          <Text
            style={{
              fontSize: 18,
              color: '#777',
              paddingHorizontal: 10
            }}
          >
            info@ishee.co
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/ishee.co/')
            }
          >
            <Ionicons name="logo-instagram" size={44} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.facebook.com/isheeco-945995045792166/'
              )
            }
          >
            <Ionicons
              style={{ paddingHorizontal: 10 }}
              name="logo-facebook"
              size={44}
              color="#777"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://twitter.com/isheeco')}
          >
            <Ionicons name="logo-twitter" size={40} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ContactScreen;
