import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { rtlos } from '../../utils';
import HeaderFilter from '../HomeScreen/HeaderFilter';

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
        useNativeDriver={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#f3f3f3',
            position: 'absolute',
            right: rtlos() === 3 ? undefined : 0,
            left: rtlos() === 3 ? 0 : undefined,
            top:
              Platform.OS === 'android' ? 40 : Constants.statusBarHeight + 40,
            bottom: 45,
            margin: 0,
            width: 300,
            height: height - (Constants.statusBarHeight + 40 + 49),
            borderTopLeftRadius: rtlos() === 3 ? undefined : 15,
            borderBottomLeftRadius: rtlos() === 3 ? undefined : 15,
            borderTopRightRadius: rtlos() === 3 ? 15 : undefined,
            borderBottomRightRadius: rtlos() === 3 ? 15 : undefined
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: rtlos() === 3 ? 'flex-start' : 'flex-end',
                width: 100,
                flexDirection: rtlos() === 3 ? 'row' : 'row-reverse',
                paddingTop: 10
              }}
              onPress={() => this.removeAllCategoryFilters()}
            >
              <Ionicons
                name="ios-remove-circle-outline"
                size={26}
                color="#8E90F0"
              />
              <Text
                style={{
                  color: '#8E90F0',
                  fontSize: 16,
                  paddingHorizontal: 5
                }}
              >
                {words.clear}
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                width: 125,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                marginHorizontal: 10,
                borderRadius: 25,
                shadowColor: '#999',
                shadowOffset: {
                  width: 0,
                  height: 5
                },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5
              }}
              onPress={() => {
                this.initRest();
                this.props.hideFilterModal();
              }}
            >
              <Text style={{ color: '#636363', fontSize: 16 }}>
                {words.cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 125,
                backgroundColor: '#7678ED',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                marginHorizontal: 10,
                borderRadius: 25,
                shadowColor: '#999',
                shadowOffset: {
                  width: 0,
                  height: 5
                },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5
              }}
              onPress={() => {
                applyFilters(this.state.rest);
                this.props.hideFilterModal();
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>{words.apply}</Text>
            </TouchableOpacity>
          </View>
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
