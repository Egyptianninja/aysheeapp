import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';

import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { rtlos } from '../../utils';
import { Constants } from 'expo';

const { height } = Dimensions.get('window');

class FollowModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isFollowModalVisible !== prevState.isFollowModalVisible) {
      return { isFollowModalVisible: nextProps.isFollowModalVisible };
    } else {
      return { ...prevState };
    }
  }
  scrollView: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isFollowModalVisible: false,
      offers: false,
      categoryIds: []
    };
  }

  componentDidMount() {
    const { categoryIds } = this.props;
    this.setState({ categoryIds });
  }

  handleFilter = (id: any) => {
    if (this.state.categoryIds.includes(id)) {
      const newIds = this.state.categoryIds.filter(
        (catid: any) => catid !== id
      );
      this.setState({ categoryIds: newIds });
    } else {
      const newIds = this.state.categoryIds;
      newIds.push(id);
      this.setState({ categoryIds: newIds });
    }
    //
  };

  renderCategories = (categories: any) => {
    categories.sort((a: any, b: any) =>
      a.sort > b.sort ? 1 : b.sort > a.sort ? -1 : 0
    );
    return (
      <View
        style={{ marginTop: Constants.statusBarHeight + 40, paddingBottom: 40 }}
      >
        {categories.map((cat: any) => {
          return (
            <View
              key={cat.id}
              style={{
                flexDirection: 'row-reverse',
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.hideFollowModal();
                  this.props.navigation.navigate('CategoryScreen', {
                    item: cat
                  });
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  flex: 2
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#777'
                  }}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}
              >
                <TouchableOpacity onPress={() => this.handleFilter(cat.id)}>
                  {!this.state.categoryIds.includes(cat.id) && (
                    <Ionicons
                      name="ios-radio-button-off"
                      size={28}
                      color="#aaa"
                    />
                  )}
                  {this.state.categoryIds.includes(cat.id) && (
                    <Ionicons
                      name="ios-checkmark-circle"
                      size={28}
                      color="#7678ED"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    const { categories } = this.props;
    return (
      <Modal
        isVisible={this.state.isFollowModalVisible}
        onBackdropPress={() => {
          this.props.hideFollowModal();
        }}
        onBackButtonPress={() => {
          this.props.hideFollowModal();
        }}
        backdropOpacity={0.5}
        useNativeDriver={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hideModalContentWhileAnimating={true}
        onModalHide={() => {
          this.props.addOfferFilter(this.state.offers);
          this.props.addCategoryId(this.state.categoryIds);
        }}
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#f3f3f3',
            position: 'absolute',
            right: rtlos() === 3 ? undefined : 0,
            left: rtlos() === 3 ? 0 : undefined,
            top: 0,
            bottom: 0,
            margin: 0,
            width: 250,
            height
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderCategories(categories)}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  words: state.glob.language.words,
  sort: state.glob.language.sort,
  buckets: state.post.buckets,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(FollowModal);
