import * as React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showModal } from '../../store/actions/globActions';
import { Platform } from 'expo-core';
class CategoryButton extends React.Component<any, any> {
  render() {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: width / 2 - 24,
          zIndex: 100,
          backgroundColor: 'rgba(118, 120, 237, 0.8)',
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => this.props.showModal()}
      >
        <Ionicons
          style={{ top: Platform.OS === 'android' ? undefined : 1, left: 0 }}
          name="ios-keypad"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  { showModal }
)(CategoryButton);
