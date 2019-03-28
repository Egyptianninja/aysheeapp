import * as React from 'react';
import { View, StatusBar } from 'react-native';
import ChoiseCategory from '../../componenets/HomeSingle/ChoiseCategory';
import PickerExample from '../../utils/wheelPicker/PickerExample';
import Picker from '../../lib/ios/Picker';

const data = [
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'js' },
  { label: 'Google', value: 'go' }
];
class CategoryView extends React.Component<any, any> {
  state = {
    pikerValue: null
  };

  componentDidMount() {
    this.setState({ pikerValue: data[0].value });
  }

  onChange = (value: any) => {
    this.setState({ pikerValue: value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} barStyle={'light-content'} />

        <ChoiseCategory
          addcategory={this.props.addcategory}
          showSearch={this.props.showSearch}
          iconsize={44}
          navigation={this.props.navigation}
        />
        {/* <Picker
          name="lang"
          data={data}
          onChange={this.onChange}
          propsValue={this.state.pikerValue}
        /> */}
      </View>
    );
  }
}

export default CategoryView;
