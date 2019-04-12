import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { StyleSheet } from '../../utils';
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
  lang,
  width
}: any) => (
  <Modal
    isVisible={isVisible}
    backdropOpacity={0.2}
    useNativeDriver={true}
    hideModalContentWhileAnimating={true}
    style={{ flex: 1 }}
  >
    <View
      style={{
        borderRadius: 10,
        height: 200,
        padding: 10,
        width: width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}
    >
      <View
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Ionicons name={icon} size={36} color="#26A65B" />
      </View>
      <View
        style={{
          alignSelf: lang === 'ar' ? 'flex-end' : 'flex-start',
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
            textAlign: lang === 'ar' ? 'right' : 'left',
            paddingHorizontal: 20,
            fontSize: 14,
            fontWeight: '300',
            color: '#777'
          }}
        >
          {body}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {okbtnTitle && (
          <Button
            background="#373737"
            style={styles.btnStyle}
            textStyle={styles.btnTextStyle}
            title={okbtnTitle}
            onPress={okAction}
          />
        )}
        {cancelbtnTitle && (
          <Button
            background="#373737"
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
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 30,
    borderRadius: 5
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: 16
  }
});

export default Message;
