import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { arabicToNum } from '../../utils';
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#aaa',
              height: 50,
              paddingTop: 13,
              paddingHorizontal: 10,
              backgroundColor: '#f7f7f7'
            }}
          >
            +{countryCode}
          </Text>

          <TextInput
            onChangeText={this.handleChange}
            placeholder="1234567890"
            placeholderTextColor="#eee"
            onBlur={this.handleTouch}
            // autoFocus
            style={[
              {
                width: 200,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                writingDirection: 'auto',
                letterSpacing: 1,
                fontSize: 20,
                color: '#777',
                fontWeight: 'bold'
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
