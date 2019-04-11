import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { arabicToNum, rtlos } from '../../utils';
import { ErrorMessage } from './Common';
class InputEmail extends React.PureComponent<any, any> {
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
    const { label, placeholder, error, ...rest } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Text style={this.props.labelStyle}>{label}</Text>
        {error && <ErrorMessage color="#E85255">{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderRadius: 26,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
            backgroundColor: '#fff',
            borderColor: '#ddd',
            borderWidth: 1
          }}
        >
          <TextInput
            onChangeText={this.handleChange}
            placeholder="emailaddress@gmail.com"
            placeholderTextColor="#ddd"
            onBlur={this.handleTouch}
            selectionColor={'#aaa'}
            // autoFocus
            style={[
              {
                width: 298,
                paddingHorizontal: 15,
                textAlign: 'left',
                letterSpacing: 1,
                fontSize: 18,
                color: '#636363'
              }
            ]}
            {...rest}
          />
        </View>
      </View>
    );
  }
}

export default InputEmail;
