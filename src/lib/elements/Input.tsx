import * as React from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import { arabicToNum } from '../../utils';
import { ErrorMessage } from './Common';
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
    const { label, error, color, ...rest } = this.props;
    return (
      <View
        style={[
          this.props.outerStyle,
          {
            alignItems:
              this.props.rtl && Platform.OS !== 'android'
                ? 'flex-end'
                : 'flex-start'
          }
        ]}
      >
        <Text style={this.props.labelStyle}>{label}</Text>
        {error && <ErrorMessage>*</ErrorMessage>}
        <TextInput
          onChangeText={this.handleChange}
          onBlur={this.handleTouch}
          style={[
            this.props.innerStyle,
            {
              textAlign: this.props.rtl ? 'right' : 'left',
              backgroundColor: color ? color : '#fff',
              color: color ? '#fff' : '#636363'
            }
          ]}
          {...rest}
        />
      </View>
    );
  }
}

export default Input;
