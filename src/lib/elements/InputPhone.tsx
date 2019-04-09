import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { arabicToNum, rtlos } from '../../utils';
import { ErrorMessage } from './Common';
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
        {error && <ErrorMessage color="#E85255">{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderRadius: 25,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
            // borderBottomLeftRadius: 25,
            backgroundColor: '#fff',
            borderColor: '#9B9CF1',
            borderWidth: 1
          }}
        >
          <View
            style={{
              height: 50,
              width: 68,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7678ED',
              borderTopLeftRadius: rtlos() === 3 ? undefined : 25,
              borderTopRightRadius: rtlos() === 3 ? 25 : undefined,
              borderBottomLeftRadius: rtlos() === 3 ? undefined : 25,
              borderBottomRightRadius: rtlos() === 3 ? 25 : undefined,
              paddingHorizontal: 10,

              paddingVertical: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#fff'
              }}
            >
              +{countryCode}
            </Text>
          </View>

          <TextInput
            onChangeText={this.handleChange}
            placeholder="1234567890"
            placeholderTextColor="#ddd"
            onBlur={this.handleTouch}
            selectionColor={'#fff'}
            // autoFocus
            style={[
              {
                width: 230,
                paddingHorizontal: 10,
                textAlign: 'left',
                letterSpacing: 1,
                fontSize: 20,
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

export default InputPhone;
