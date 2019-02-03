import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ErrorMessage } from './Common';
import { arabicToNum } from '../../utils';
class Comment extends React.PureComponent<any, any> {
  handleChange = (value: any) => {
    if (this.props.num) {
      const toEn = arabicToNum(value);
      this.props.onChange(this.props.name, toEn);
    } else {
      this.props.onChange(this.props.name, value);
    }
  };

  handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { label, error, ...rest } = this.props;
    return (
      <View
        style={[
          this.props.outerStyle,
          { alignItems: this.props.rtl ? 'flex-end' : 'flex-start' }
        ]}
      >
        <TextInput
          onChangeText={this.handleChange}
          style={[
            this.props.innerStyle,
            { textAlign: this.props.rtl ? 'right' : 'left' }
          ]}
          {...rest}
        />
      </View>
    );
  }
}

export default Comment;
