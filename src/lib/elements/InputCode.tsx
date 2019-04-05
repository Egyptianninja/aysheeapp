import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { arabicToNum, rtlos } from '../../utils';
import { ErrorMessage } from './Common';
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
        {error && <ErrorMessage color="#E85255">{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
            borderRadius: 25,
            backgroundColor: '#fff'
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
                textAlign: 'center',
                borderRadius: 25,
                letterSpacing: 1,
                fontSize: 40,
                color: '#636363',
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
