import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import HeaderFilter from '../HomeScreen/HeaderFilter';
import { Constants } from 'expo';
const { width, height } = Dimensions.get('window');

class FilterModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isFilterModalVisible !== prevState.isFilterModalVisible) {
      return { isFilterModalVisible: nextProps.isFilterModalVisible };
    } else {
      return { ...prevState };
    }
  }
  scrollView: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isFilterModalVisible: false,
      rest: null
    };
  }

  componentDidMount() {
    const category = this.props.navigation.getParam('item');
    this.setState({ rest: { categoryId: category.id } });
  }
  getSortBucket = () => {
    return {
      name: 'sortType',
      buckets: this.props.sort,
      label: this.props.words.sort
    };
  };

  addFilter = (itemKind: any, value: any) => {
    this.setState({ rest: { ...this.state.rest, [itemKind]: value } });
    if (itemKind === 'sortType' && value === 3) {
      this.setState({ loadinLocation: true });
    }
  };
  removeFilter = (itemKind: any) => {
    const filters = this.state.rest;
    delete filters[itemKind];
    this.setState({
      rest: filters
    });
  };

  removeAllCategoryFilters = () => {
    const newrest = { categoryId: this.state.rest.categoryId };
    this.setState({
      rest: newrest
    });
  };

  initRest = () => {
    this.setState({ rest: this.props.rest });
  };
  render() {
    const sortData = this.getSortBucket();
    const { applyFilters, words, isRTL, buckets, category } = this.props;
    const { rest } = this.state;
    return (
      <Modal
        isVisible={this.state.isFilterModalVisible}
        onBackdropPress={() => {
          this.initRest();
          this.props.hideFilterModal();
        }}
        onBackButtonPress={() => {
          this.initRest();
          this.props.hideFilterModal();
        }}
        backdropOpacity={0.5}
        // useNativeDriver={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hideModalContentWhileAnimating={true}
        onSwipe={() => {
          this.initRest();
          this.props.hideFilterModal();
        }}
        swipeDirection="right"
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            position: 'absolute',
            right: 0,
            top: Constants.statusBarHeight + 40,
            bottom: 45,
            margin: 0,
            width: width - 100,
            height: height - (Constants.statusBarHeight + 40),
            borderTopLeftRadius: 15
            // borderBottomLeftRadius: 15
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                top: -4,
                padding: 8,
                alignItems: 'center',
                alignSelf: 'flex-start',
                width: 100,
                flexDirection: 'row'
              }}
              onPress={() => this.removeAllCategoryFilters()}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={26}
                color="#aaa"
              />
              <Text
                style={{
                  color: '#aaa',
                  fontSize: 14,
                  paddingHorizontal: 5
                }}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>

          {buckets && (
            <HeaderFilter
              isRTL={isRTL}
              rest={rest}
              sortData={sortData}
              buckets={buckets}
              addFilter={this.addFilter}
              removeFilter={this.removeFilter}
              words={words}
            />
          )}
          <TouchableOpacity
            style={{
              padding: 10,
              paddingHorizontal: 20,
              width: 100,
              borderRadius: 10,
              backgroundColor: '#7678ED',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
              shadowOffset: { width: 2, height: 2 },
              shadowColor: '#666',
              shadowOpacity: 0.25
            }}
            onPress={() => {
              applyFilters(this.state.rest);
              this.props.hideFilterModal();
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Apply</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps)(FilterModal);
