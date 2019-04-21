import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import { filterOptions } from '../../../utils';
import MenuOption from './MenuOptions';
const { width } = Dimensions.get('window');

const controlmenu = [
  { id: 1, sort: 1, name: 'Unpublish' },
  { id: 2, sort: 2, name: 'Publish' },
  { id: 3, sort: 3, name: 'Block User' },
  { id: 4, sort: 4, name: 'unBlock User' }
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
        <MenuOption
          key={da.id}
          showMenuModal={this.props.showMenuModal}
          hideMenuModal={this.props.hideMenuModal}
          isAuthenticated={this.props.isAuthenticated}
          unpublishControlPost={this.props.unpublishControlPost}
          publishControlPost={this.props.publishControlPost}
          blockControlUser={this.props.blockControlUser}
          unblockControlUser={this.props.unblockControlUser}
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

  render() {
    const { user, isAuthenticated } = this.props;

    const options = filterOptions(
      controlmenu,
      isAuthenticated && user.isadmin ? [1, 2, 3, 4] : []
    );
    return (
      <Modal
        isVisible={this.state.isMenuModalVisible}
        onBackdropPress={() => this.props.hideMenuModal()}
        onBackButtonPress={() => this.props.hideMenuModal()}
        backdropOpacity={0.5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
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
