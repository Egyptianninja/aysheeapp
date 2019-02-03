import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ErrorMessage } from './Common';
import { arabicToNum } from '../../utils';
class InputCode extends React.PureComponent<any, any> {
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
    const { label, countryCode, placeholder, error, ...rest } = this.props;
    return (
      <View style={[this.props.outerStyle, { alignItems: 'center' }]}>
        <Text style={this.props.labelStyle}>{label}</Text>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#aaa',
            marginVertical: 20
          }}
        >
          <TextInput
            onChangeText={this.handleChange}
            placeholderTextColor="#eee"
            onBlur={this.handleTouch}
            autoFocus
            style={[
              {
                width: 175,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#fff',
                textAlign: 'center',
                letterSpacing: 1,
                fontSize: 40,
                color: '#777',
                fontWeight: '300'
              }
            ]}
            {...rest}
          />
        </View>
      </View>
    );
  }
}

export default InputCode;
