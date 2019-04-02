import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setQuery, delQuery } from '../../store/actions/postActions';
import { StyleSheet, isArabic } from '../../utils';
const { width } = Dimensions.get('window');

class SearchBox extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isSearchVisible !== prevState.isSearchVisible) {
      return {
        isSearchVisible: nextProps.isSearchVisible,
        query: nextProps.isSearchVisible === false ? '' : prevState.query
      };
    } else {
      return { ...prevState };
    }
  }
  searchInput: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isSearchVisible: false,
      query: '',
      animation: new Animated.Value(1)
    };
  }
  componentDidUpdate() {
    if (!this.state.isSearchVisible) {
      this.searchInput.blur();
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 200
      }).start();
    }
    if (this.state.isSearchVisible) {
      this.searchInput.focus();
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 200
      }).start();
    }
  }

  render() {
    const { query, words, isRTL } = this.props;
    const q = query !== '' ? query : this.state.query;
    const rtl = q ? isArabic(q) : undefined;
    const animatedBox = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [width - 90, width - 20]
    });
    const animatedOpacity = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    return (
      <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
        <Animated.View
          style={{
            backgroundColor: '#fff',
            borderColor: '#ddd',
            flexDirection: 'row',
            width: animatedBox,
            height: 32,
            borderRadius: 16,
            paddingLeft: 15,
            borderWidth: 1,
            opacity: 0.8,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextInput
            style={[
              styles.input,
              {
                writingDirection: rtl ? 'rtl' : 'ltr'
              }
            ]}
            ref={input => {
              this.searchInput = input;
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.query}
            onChangeText={e => {
              {
                this.setState({ query: e });
              }
            }}
            onSubmitEditing={() => {
              this.props.setQuery(this.state.query);
            }}
            onFocus={() => this.props.showSearch()}
          />
          <TouchableOpacity
            onPress={() => {
              this.searchInput.focus();
            }}
          >
            <Ionicons
              style={[styles.icon, { color: '#7678ED' }]}
              name="ios-search"
              size={22}
            />
          </TouchableOpacity>
        </Animated.View>
        {this.state.isSearchVisible && (
          <Animated.View
            style={{
              flex: 1,
              opacity: animatedOpacity
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.delQuery();
                this.props.hideSearch();
                this.props.removecategory();
              }}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              <Text
                style={{
                  fontSize: isRTL ? 18 : undefined,
                  color: '#7678ED',
                  bottom: isRTL ? 5 : 2,
                  right: 5
                }}
              >
                {words.cancel}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    direction: 'rtl',
    fontSize: 16,
    fontWeight: '500',
    height: 26
  },
  queryinput: {
    backgroundColor: '#aaa',
    color: '#fff',
    borderRadius: 13,
    paddingHorizontal: 10
  },
  icon: {
    marginHorizontal: 10,
    paddingTop: 5
  }
});

const mapStateToProps = (state: any) => ({
  query: state.post.query
});

export default connect(
  mapStateToProps,
  { setQuery, delQuery }
)(SearchBox);
