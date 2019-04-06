import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { StyleSheet } from '../common';
import Button from './Button';
const Message = ({
  title,
  body,
  okbtnTitle,
  cancelbtnTitle,
  okAction,
  cancelAction,
  icon,
  isVisible,
  isRTL,
  height,
  iconColor
}: any) => (
  <Modal
    isVisible={isVisible}
    backdropOpacity={0}
    useNativeDriver={true}
    hideModalContentWhileAnimating={true}
    style={{ justifyContent: 'flex-end', margin: 0 }}
  >
    <View
      style={{
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
      }}
    >
      <View
        style={{
          position: 'absolute',
          right: isRTL ? undefined : 20,
          left: isRTL ? 20 : undefined,
          top: 30,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Ionicons
          name={icon}
          size={36}
          color={iconColor ? iconColor : '#7678ED'}
        />
      </View>
      <View
        style={{
          alignSelf: isRTL ? 'flex-end' : 'flex-start',
          paddingHorizontal: 10,
          paddingLeft: 25,
          alignItems: 'flex-start',
          marginBottom: 10
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '400' }}>{title}</Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: isRTL ? 'right' : 'left',
            paddingHorizontal: 20,
            fontSize: 16
          }}
        >
          {body}
        </Text>
      </View>
      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        {okbtnTitle && (
          <Button
            background="#fff"
            style={styles.btnStyle}
            textStyle={[styles.btnTextStyle, { color: '#E85255' }]}
            title={okbtnTitle}
            onPress={okAction}
          />
        )}
        {cancelbtnTitle && (
          <Button
            background="#fff"
            style={styles.btnStyle}
            textStyle={styles.btnTextStyle}
            title={cancelbtnTitle}
            onPress={cancelAction}
          />
        )}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 30,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  btnTextStyle: {
    color: '#7678ED',
    fontSize: 18,
    fontFamily: 'cairo-regular'
  }
});

export default Message;
