import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { filterOptions, getLocation } from '../../utils';

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
          showCheckMessageModal={this.props.showCheckMessageModal}
          hideMenuModal={this.props.hideMenuModal}
          showEditModal={this.props.showEditModal}
          deletePost={this.props.deletePost}
          editClassifieds={this.props.editClassifieds}
          post={this.props.post}
          word={this.props.word}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  render() {
    const { word, live } = this.props;
    const options = filterOptions(
      word.popmenu,
      live ? [5, 7, 8, 9] : [5, 6, 8, 9]
    );
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
  lang,
  word,
  showMessageModal,
  showCheckMessageModal,
  post,
  deletePost,
  editClassifieds,
  showEditModal
}: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        // refresh
        if (itemData.id === 5) {
          if (post.updates) {
            editClassifieds({
              variables: {
                postId: post.id,
                updates: post.updates + 1
              }
            });
          } else {
            editClassifieds({
              variables: {
                postId: post.id,
                updates: 1
              }
            });
          }

          hideMenuModal();
          setTimeout(() => {
            showMessageModal({ seconds: 1, message: word.adrefreshed });
          }, 1000);
          // Publish
        } else if (itemData.id === 6) {
          editClassifieds({
            variables: {
              postId: post.id,
              islive: !post.islive
            }
          });
          hideMenuModal();
          setTimeout(() => {
            showMessageModal({ seconds: 1, message: word.adpublished });
          }, 1000);
          // Unpublish
        } else if (itemData.id === 7) {
          editClassifieds({
            variables: {
              postId: post.id,
              islive: !post.islive
            }
          });
          hideMenuModal();
          setTimeout(() => {
            showMessageModal({ seconds: 1, message: word.adunpupished });
          }, 1000);
          // Edit
        } else if (itemData.id === 8) {
          hideMenuModal();
          setTimeout(() => {
            showEditModal();
          }, 2000);
          // Delete
        } else if (itemData.id === 9) {
          hideMenuModal();
          setTimeout(() => {
            showCheckMessageModal();
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
