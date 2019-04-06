import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { rtlos } from '../../utils';
const { width } = Dimensions.get('window');

const iconNames = [
  { id: 1, name: 'Add to favorite', icon: 'ios-add-circle-outline' },
  { id: 2, name: 'Remove from favorite', icon: 'ios-remove-circle-outline' },
  { id: 3, name: 'Share', icon: 'md-share' },
  { id: 4, name: 'Report', icon: 'ios-filing' },
  { id: 5, name: 'Refresh', icon: 'ios-refresh' },
  { id: 6, name: 'Publish', icon: 'ios-cloud-upload' },
  { id: 7, name: 'Unpublish', icon: 'ios-cloud-download' },
  { id: 8, name: 'Edit', icon: 'ios-create' },
  { id: 9, name: 'Delete', icon: 'ios-trash' }
];

export default class MenuOption extends React.Component<any, any> {
  timeoutID: any;
  componentWillUnmount() {
    // clearTimeout(this.timeoutID);
  }
  render() {
    const { itemData, hideMenuModal, isRTL, postId, post } = this.props;
    return (
      <TouchableOpacity
        onPress={async () => {
          hideMenuModal({ menuId: itemData.id, postId, post });
        }}
        style={{
          width,
          marginVertical: 5,
          paddingVertical: 5
        }}
      >
        <View
          style={{
            flexDirection:
              rtlos() === 3 ? 'row' : isRTL ? 'row-reverse' : 'row',
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Ionicons
            name={
              iconNames.filter((icon: any) => icon.id === itemData.id)[0].icon
            }
            size={30}
            color="#555"
            style={{ paddingHorizontal: 10 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'cairo-regular',
              textAlign: isRTL ? 'right' : 'left',
              paddingHorizontal: 10
            }}
          >
            {itemData.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
