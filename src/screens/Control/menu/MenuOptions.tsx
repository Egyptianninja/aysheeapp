import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { rtlos } from '../../../utils';
const { width } = Dimensions.get('window');

const iconNames = [
  { id: 1, name: 'Unpublish', icon: 'ios-cloud-download' },
  { id: 2, name: 'Publish', icon: 'ios-cloud-upload' },
  { id: 3, name: 'Block User', icon: 'ios-remove-circle-outline' },
  { id: 4, name: 'unBlock User', icon: 'ios-add-circle-outline' }
];

export default class MenuOption extends React.Component<any, any> {
  render() {
    const {
      itemData,
      isRTL,
      postId,
      post,
      hideMenuModal,
      unpublishControlPost,
      publishControlPost,
      blockControlUser,
      unblockControlUser
    } = this.props;
    return (
      <TouchableOpacity
        onPress={async () => {
          if (itemData.id === 1) {
            unpublishControlPost({ variables: { postId } });
            hideMenuModal();
          } else if (itemData.id === 2) {
            publishControlPost({ variables: { postId } });
            hideMenuModal();
          } else if (itemData.id === 3) {
            blockControlUser({ variables: { userId: post.userId } });
            hideMenuModal();
          } else if (itemData.id === 4) {
            unblockControlUser({ variables: { userId: post.userId } });
            hideMenuModal();
          }
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
