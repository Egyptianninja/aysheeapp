import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { onShare, filterOptions } from '../../../utils';

const { width } = Dimensions.get('window');

export default class Menu extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isMenuModalVisible !== prevState.isMenuModalVisible) {
      return { isMenuModalVisible: nextProps.isMenuModalVisible };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isMenuModalVisible: false
    };
  }

  renderOptions = (data: any) => {
    return data.map((da: any) => {
      return (
        <Option
          key={da.id}
          showMenuModal={this.props.showMenuModal}
          showMessageModal={this.props.showMessageModal}
          hideMenuModal={this.props.hideMenuModal}
          showReportModal={this.props.showReportModal}
          hideReportModal={this.props.hideReportModal}
          favoritePost={this.props.favoritePost}
          post={this.props.post}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  render() {
    const { word } = this.props;
    const options = filterOptions(word.popmenu, [1, 3, 4]);
    return (
      <Modal
        isVisible={this.state.isMenuModalVisible}
        onBackdropPress={() => this.props.hideMenuModal()}
        backdropOpacity={0.2}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            bottom: 0,
            margin: 0,
            height: 350,
            paddingTop: 10,
            width: width - 40,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <ScrollView>{this.renderOptions(options)}</ScrollView>
        </View>
      </Modal>
    );
  }
}

const Option = ({
  itemData,
  hideMenuModal,
  showReportModal,
  lang,
  favoritePost,
  showMessageModal,
  post
}: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (itemData.id === 1) {
          await favoritePost({
            variables: { postId: post.id }
          });
          await hideMenuModal();
          setTimeout(() => {
            showMessageModal({ seconds: 1 });
          }, 1000);
        } else if (itemData.id === 3) {
          const message = `
          ${post.title}

          ${post.body}

          ${post.price}`;
          onShare(message, hideMenuModal);
        } else if (itemData.id === 4) {
          await hideMenuModal();
          setTimeout(() => {
            showReportModal();
          }, 1000);
        }
      }}
      style={{
        flex: 1,
        width: width - 80,
        padding: 3,
        margin: 7,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'cairo-regular',
          textAlign: lang === 'ar' ? 'right' : 'left',
          paddingHorizontal: 10
        }}
      >
        {itemData.name}
      </Text>
    </TouchableOpacity>
  );
};
