import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ErrorMessage } from './Common';
import { arabicToNum, rtlos } from '../../utils';
class InputPhone extends React.PureComponent<any, any> {
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Text style={this.props.labelStyle}>{label}</Text>
        {error && <ErrorMessage color="#fff">{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: '#7678ED'
          }}
        >
          <View
            style={{
              height: 50,
              width: 68,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#6163C2',
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#A7A9F3'
              }}
            >
              +{countryCode}
            </Text>
          </View>

          <TextInput
            onChangeText={this.handleChange}
            // placeholder="1234567890"
            // placeholderTextColor="#8E90F0"
            onBlur={this.handleTouch}
            selectionColor={'#fff'}
            // autoFocus
            style={[
              {
                width: 200,
                paddingHorizontal: 10,
                textAlign: 'left',
                letterSpacing: 1,
                fontSize: 20,
                color: '#fff'
              }
            ]}
            {...rest}
          />
        </View>
      </View>
    );
  }
}

export default InputPhone;
