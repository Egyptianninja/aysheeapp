import * as React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, isArabic } from '../../utils';

class SearchBox extends React.Component<any, any> {
  state = {
    input: '',
    close: null
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({ input: this.props.value });
    }
  }

  render() {
    const rtl = isArabic(this.state.input);

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#fafafa',
            borderColor: '#ddd'
          }
        ]}
      >
        {this.state.input !== '' && (
          <TouchableOpacity
            onPress={() => {
              this.setState({ input: '' });
              this.props.navigation.setParams({ query: '' });
            }}
            style={{
              position: 'relative',
              width: 26,
              height: 26,
              borderRadius: 13,
              left: -12,
              top: 2,
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#FF5959',
                fontWeight: 'bold',
                left: 1,
                bottom: 1
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: '#f6f7f7',
              writingDirection: rtl ? 'rtl' : 'ltr'
            }
          ]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={this.props.onSearchSelect}
          onEndEditing={this.props.onSearchUnSelect}
          value={this.state.input}
          onChangeText={e => {
            {
              this.setState({ input: e });
              if (e === '') {
                this.props.navigation.setParams({ query: '' });
              }
            }
          }}
          onSubmitEditing={() => {
            this.props.navigation.setParams({ query: this.state.input });
          }}
        />

        <Ionicons
          style={[styles.icon, { color: '#777' }]}
          name="ios-search"
          size={22}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 32,
    borderRadius: 16,
    paddingLeft: 15,
    borderWidth: 1,
    opacity: 0.8
  },
  input: {
    flex: 1,
    direction: 'rtl',
    fontSize: 16,
    fontWeight: '500',
    height: 30
  },
  icon: {
    marginHorizontal: 10,
    paddingTop: 5
  }
});

export default SearchBox;
