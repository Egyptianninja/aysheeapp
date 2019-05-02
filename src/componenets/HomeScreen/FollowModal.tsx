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
import { categoryIds as categids } from '../../constants';
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
      <View style={{ paddingBottom: 40 }}>
        {categories.map((cat: any) => {
          return (
            <View
              key={cat.id}
              style={{
                flexDirection: 'row-reverse',
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 7.5
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
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10
                  }}
                  onPress={() => this.handleFilter(cat.id)}
                >
                  {!this.state.categoryIds.includes(cat.id) && (
                    <Ionicons
                      name="ios-radio-button-off"
                      size={26}
                      color="#aaa"
                    />
                  )}
                  {this.state.categoryIds.includes(cat.id) && (
                    <Ionicons
                      name="ios-checkmark-circle"
                      size={26}
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
    const { categories, word } = this.props;
    const full = this.state.categoryIds.sort() === categids.sort();

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
          <View
            style={{
              marginTop: Constants.statusBarHeight + 40,
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingRight: 15,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingBottom: 10,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1
            }}
          >
            {!full && (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  padding: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#f9f9f9',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  this.setState({ categoryIds: categids });
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: '#373737'
                  }}
                >
                  {word.selectall}
                </Text>
              </TouchableOpacity>
            )}
            {full && (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  padding: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#f9f9f9',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  this.setState({ categoryIds: [] });
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: '#373737'
                  }}
                >
                  {word.deselectall}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                padding: 4,
                minWidth: 80,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#373737',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => this.props.hideFollowModal()}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: '#f9f9f9'
                }}
              >
                {word.apply}
              </Text>
            </TouchableOpacity>
          </View>
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
