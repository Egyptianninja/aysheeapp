import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
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
      isFilterModalVisible: false
    };
  }
  getSortBucket = () => {
    return {
      name: 'sortType',
      buckets: this.props.sort,
      label: this.props.words.sort
    };
  };

  render() {
    const sortData = this.getSortBucket();
    const {
      addFilter,
      removeFilter,
      removeAllCategoryFilters,
      rest,
      words,
      isRTL,
      buckets,
      category
    } = this.props;
    return (
      <Modal
        isVisible={this.state.isFilterModalVisible}
        onBackdropPress={() => this.props.hideFilterModal()}
        onBackButtonPress={() => this.props.hideFilterModal()}
        backdropOpacity={0.7}
        useNativeDriver={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hideModalContentWhileAnimating={true}
        // onSwipe={() => this.props.hideFilterModal()}
        // swipeDirection="right"
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 45,
            margin: 0,
            paddingTop: 10,
            width: width - 100,
            height
          }}
        >
          <View
            style={{
              shadowColor: '#777',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.5,
              shadowRadius: 5.84,

              elevation: 5
            }}
          >
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#777'
                }}
              >
                {category.name}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                width: 100
              }}
              onPress={() => removeAllCategoryFilters()}
            >
              <Text style={{ color: '#777' }}>Clear all</Text>
            </TouchableOpacity>
          </View>

          {buckets && (
            <HeaderFilter
              isRTL={isRTL}
              rest={rest}
              sortData={sortData}
              buckets={buckets}
              addFilter={addFilter}
              removeFilter={removeFilter}
              words={words}
            />
          )}
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
