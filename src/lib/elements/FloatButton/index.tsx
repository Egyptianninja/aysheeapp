import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import ImageIcon from './ImageIcon';
const FloatButton = (props: any) => (
  <TouchableOpacity
    onPress={() => {
      props.action();
    }}
    style={{
      position: 'absolute',
      bottom: 40,
      right: 40,
      width: 40,
      height: 40,
      backgroundColor: '#6FA7D5',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      opacity: props.opacity
    }}
  >
    <ImageIcon
      icon={require('../../../../assets/icons/Up.png')}
      size={20}
      tintColor="#fff"
      margin={3}
    />
  </TouchableOpacity>
);

export default FloatButton;
