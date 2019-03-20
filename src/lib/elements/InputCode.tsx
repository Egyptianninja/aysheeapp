import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ErrorMessage } from './Common';
import { arabicToNum, rtlos } from '../../utils';
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
        {error && <ErrorMessage color="#fff">{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
            marginVertical: 20,
            borderRadius: 5,
            backgroundColor: '#7678ED'
          }}
        >
          <TextInput
            onChangeText={this.handleChange}
            placeholderTextColor="#eee"
            onBlur={this.handleTouch}
            // autoFocus
            style={[
              {
                width: 270,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#7678ED',
                textAlign: 'center',
                borderRadius: 5,
                letterSpacing: 1,
                fontSize: 40,
                color: '#fff',
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
