import * as React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setQuery, delQuery } from '../../store/actions/postActions';
import { StyleSheet, isArabic } from '../../utils';

class SearchBox extends React.Component<any, any> {
  state = {
    query: ''
  };
  render() {
    const { query } = this.props;
    const q = query !== '' ? query : this.state.query;
    const rtl = q ? isArabic(q) : undefined;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#fafafa',
            borderColor: '#aaa'
          }
        ]}
      >
        {this.props.query !== '' && (
          <TouchableOpacity
            onPress={() => {
              this.props.delQuery();
              this.setState({ query: '' });
            }}
          >
            <Ionicons
              style={{ left: -14, top: -2 }}
              name="ios-close-circle"
              size={33}
              color="#8E90F0"
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            query !== '' && styles.queryinput,
            styles.input,
            {
              writingDirection: rtl ? 'rtl' : 'ltr'
            }
          ]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={this.props.onSearchSelect}
          onEndEditing={this.props.onSearchUnSelect}
          value={query === '' ? this.state.query : query}
          onChangeText={e => {
            {
              this.setState({ query: e });
              if (e === '') {
                this.props.delQuery();
                this.setState({ query: '' });
              }
            }
          }}
          onSubmitEditing={() => {
            this.props.setQuery(this.state.query);
          }}
        />
        <TouchableOpacity
          onPress={() => (query !== '' ? null : this.props.hideSearch())}
        >
          <Ionicons
            style={[styles.icon, { color: '#7678ED' }]}
            name="ios-search"
            size={22}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 32,
    borderRadius: 16,
    paddingLeft: 15,
    borderWidth: 1,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
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
