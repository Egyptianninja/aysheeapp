import * as React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showModal } from '../../store/actions/globActions';
import { Platform } from 'expo-core';
import { isIphoneX } from '../../utils';
class CategoryButton extends React.Component<any, any> {
  render() {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: isIphoneX() ? 32 : 0,
          left: width / 2 - 24,
          zIndex: 100,
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => this.props.showModal()}
      >
        <Ionicons
          style={{ top: Platform.OS === 'android' ? undefined : 2, left: 1 }}
          name="ios-add"
          size={40}
          color="#777"
        />
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  { showModal }
)(CategoryButton);
