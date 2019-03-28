import * as React from 'react';
import { Switch, View, Text } from 'react-native';

class SwitchUI extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.rest !== prevState.rest) {
      if (nextProps.rest[nextProps.itemKind] === true) {
        return { rest: nextProps.rest, original: true, second: false };
      } else if (nextProps.rest[nextProps.itemKind] === false) {
        return { rest: nextProps.rest, original: false, second: true };
      }
      return { rest: nextProps.rest, original: false, second: false };
    } else {
      return { ...prevState };
    }
  }
  state = {
    rest: null,
    original: false,
    second: false
  };

  componentDidMount() {
    const v = this.props.rest[this.props.itemKind];
    if (v && v === true) {
      this.setState({ original: true });
    } else if (v === false) {
      this.setState({ second: true });
    } else {
      this.setState({ original: false, second: false });
    }
  }

  handleFilter = () => {
    const { original, second } = this.state;
    const { itemKind, addFilter, removeFilter } = this.props;

    if ((original && second) || (!original && !second)) {
      removeFilter(itemKind);
    } else if (original) {
      addFilter(itemKind, true);
    } else if (second) {
      addFilter(itemKind, false);
    }
  };

  render() {
    const { originalTitle, seconTitle } = this.props;
    return (
      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            marginHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 16 }}>
            {originalTitle}
          </Text>
          <Switch
            onValueChange={async value => {
              await this.setState({ original: value });
              this.handleFilter();
            }}
            value={this.state.original}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            marginHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 16 }}>
            {seconTitle}
          </Text>
          <Switch
            onValueChange={async value => {
              await this.setState({ second: value });
              this.handleFilter();
            }}
            value={this.state.second}
          />
        </View>
      </View>
    );
  }
}

export default SwitchUI;
