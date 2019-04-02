import { Constants } from 'expo';
import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import SearchBox from './SearchBox';

class SearchHeader extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isSearchVisible !== prevState.isSearchVisible) {
      return { isSearchVisible: nextProps.isSearchVisible };
    } else {
      return { ...prevState };
    }
  }
  searchBox: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isSearchVisible: false
    };
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#f3f3f3',
          paddingTop: Constants.statusBarHeight,
          height: Constants.statusBarHeight + 40,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd'
        }}
      >
        <View style={{ flex: 1, paddingLeft: 5 }}>
          <SearchBox
            ref={box => {
              this.searchBox = box;
            }}
            isSearchVisible={this.state.isSearchVisible}
            navigation={this.props.navigation}
            showSearch={this.props.showSearch}
            hideSearch={this.props.hideSearch}
            removecategory={this.props.removecategory}
            words={this.props.words}
            isRTL={this.props.isRTL}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  words: state.glob.language.words,
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  isAuthenticated: state.user.isAuthenticated,
  query: state.post.query
});

export default connect(mapStateToProps)(SearchHeader);
