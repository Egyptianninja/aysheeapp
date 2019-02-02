import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { arabicToNum } from '../../utils';
class Input extends React.PureComponent<any, any> {
  handleChange = async (value: any) => {
    if (this.props.num) {
      const toEn = arabicToNum(value);
      this.props.onChange(this.props.name, toEn);
    } else {
      if (this.props.handleUniqueName) {
        this.props.setLoading();
        this.props.onChange(this.props.name, value);
        this.props.handleUniqueName(value);
      } else {
        this.props.onChange(this.props.name, value);
      }
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
        <Text style={this.props.labelStyle}>{label}</Text>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <TextInput
          onChangeText={this.handleChange}
          placeholder={label}
          onBlur={this.handleTouch}
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

export default Input;
