import * as React from 'react';
import { Picker, View, Switch, Slider, PickerIOS } from 'react-native';

export default class PickerExample extends React.Component<any, any> {
  state = {
    selected: null,
    language: 'java',
    switchValue: true,
    zoom: 1
  };
  _handleToggleSwitch = () =>
    this.setState((state: any) => ({
      switchValue: !state.switchValue
    }));
  change = (zoom: any) => {
    this.setState({ zoom });
  };
  render() {
    console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        <PickerIOS
          selectedValue={this.state.language}
          style={{ height: 40, width: 60 }}
          onValueChange={(itemValue: any, itemIndex: any) => {
            this.setState({ language: itemValue });
            console.log(itemValue);
          }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Google" value="go" />
        </PickerIOS>
        <Switch
          onValueChange={this._handleToggleSwitch}
          value={this.state.switchValue}
        />
        <Slider
          step={1}
          maximumValue={10}
          onValueChange={this.change}
          value={this.state.zoom}
        />
      </View>
    );
  }
}
