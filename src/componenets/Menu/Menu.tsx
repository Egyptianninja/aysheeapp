import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import { filterOptions } from '../../utils';
import MenuOption from './MenuOptions';
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
        <MenuOption
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
    const isfront = post ? post.isfront : false;
    const options = filterOptions(
      word.popmenu,
      isAuthenticated
        ? myItem || owner
          ? live === false
            ? [6, 8, 9]
            : isfront
            ? [5, 7, 8, 9]
            : [5, 7, 8, 9]
          : // ? [5, 7, 8, 9, 11]
          // : [5, 7, 8, 9, 10]
          fav
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
        onModalHide={() => this.props.handleOnMenuModalHide()}
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
