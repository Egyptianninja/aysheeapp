import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { store } from '../../store';
import { updateQty } from '../../store/actions/userAtions';
import { filterOptions, onShare, rtlos } from '../../utils';
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
          unFavoritePost={this.props.unFavoritePost}
          editClassifieds={this.props.editClassifieds}
          showEditModal={this.props.showEditModal}
          showCheckMessageModal={this.props.showCheckMessageModal}
          isAuthenticated={this.props.isAuthenticated}
          postId={this.props.postId}
          post={this.props.post}
          word={this.props.word}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };
  isOwner = ({ user, isAuthenticated, post }: any) => {
    if (post) {
      if (isAuthenticated) {
        if (post.userId === user._id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  render() {
    const { word, myItem, fav, user, isAuthenticated, post } = this.props;
    const owner = this.isOwner({ user, isAuthenticated, post });
    const live = post ? post.islive : false;
    const options = filterOptions(
      word.popmenu,
      isAuthenticated
        ? myItem || owner
          ? live === false
            ? [6, 8, 9]
            : [5, 7, 8, 9]
          : fav
          ? [2, 3, 4]
          : [1, 3, 4]
        : [1, 3, 4]
      // : [3]
    );
    return (
      <Modal
        isVisible={this.state.isMenuModalVisible}
        onBackdropPress={() => this.props.hideMenuModal()}
        onBackButtonPress={() => this.props.hideMenuModal()}
        backdropOpacity={0.5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        // animationIn="slideInUp"
        // animationOut="slideOutDown"
        // onSwipe={() => this.props.hideMenuModal()}
        // swipeDirection="down"
        style={{ margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: 'absolute',
            bottom: 0,
            margin: 0,
            height: options.length * 55 + 70,
            paddingTop: 20,
            width
          }}
        >
          {this.renderOptions(options)}
        </View>
      </Modal>
    );
  }
}

const Option = ({
  itemData,
  hideMenuModal,
  showReportModal,
  isRTL,
  favoritePost,
  unFavoritePost,
  showMessageModal,
  editClassifieds,
  showEditModal,
  showCheckMessageModal,
  postId,
  word,
  post,
  isAuthenticated
}: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (itemData.id === 1) {
          if (!isAuthenticated) {
            hideMenuModal();
            setTimeout(() => {
              showMessageModal({ seconds: 2, message: 'you have to login!' });
            }, 1000);
          } else {
            await favoritePost({
              variables: { postId }
            });
            hideMenuModal();
            setTimeout(() => {
              showMessageModal({ seconds: 1, message: word.successadded });
            }, 1000);
          }
        } else if (itemData.id === 2) {
          await unFavoritePost({
            variables: { postId }
          });
          await hideMenuModal();
          setTimeout(() => {
            showMessageModal({
              seconds: 1,
              message: word.removeedtovafavorites
            });
          }, 1000);
        } else if (itemData.id === 3) {
          const message = `
          ${post.title}

          ${post.body}

          ${post.price}`;
          onShare(message, hideMenuModal);
        } else if (itemData.id === 4) {
          if (!isAuthenticated) {
            hideMenuModal();
            setTimeout(() => {
              showMessageModal({ seconds: 2, message: 'you have to login!' });
            }, 1000);
          } else {
            await hideMenuModal();
            setTimeout(() => {
              showReportModal();
            }, 1000);
          }
        } else if (itemData.id === 5) {
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
                postId,
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
              postId,
              islive: true
            }
          });
          if (post.isoffer) {
            await store.dispatch(updateQty('offers', 1));
          } else {
            await store.dispatch(updateQty('online', 1));
          }
          await store.dispatch(updateQty('offline', -1));
          hideMenuModal();
          setTimeout(() => {
            showMessageModal({ seconds: 1, message: word.adpublished });
          }, 1000);
          // Unpublish
        } else if (itemData.id === 7) {
          editClassifieds({
            variables: {
              postId,
              islive: false
            }
          });
          if (post.isoffer) {
            await store.dispatch(updateQty('offers', -1));
          } else {
            await store.dispatch(updateQty('online', -1));
          }
          await store.dispatch(updateQty('offline', 1));
          hideMenuModal();
          setTimeout(() => {
            showMessageModal({ seconds: 1, message: word.adunpupished });
          }, 1000);
          // Edit
        } else if (itemData.id === 8) {
          hideMenuModal();
          setTimeout(() => {
            showEditModal();
          }, 1000);
          // Delete
        } else if (itemData.id === 9) {
          hideMenuModal();
          setTimeout(() => {
            showCheckMessageModal();
          }, 1000);
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
          flexDirection: rtlos() === 3 ? 'row' : isRTL ? 'row-reverse' : 'row',
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
};
