import * as React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import ChoiseCategory from '../../componenets/HomeSingle/ChoiseCategory';
import PickerExample from '../../utils/wheelPicker/PickerExample';
import Picker from '../../lib/ios/Picker';
import {
  MainBox,
  Box5,
  Box4,
  BoxLeftRight
} from '../../componenets/HomeScreen/boxs';
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
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <StatusBar translucent={true} barStyle={'light-content'} />
        <ChoiseCategory
          addcategory={this.props.addcategory}
          showSearch={this.props.showSearch}
          iconsize={44}
          navigation={this.props.navigation}
        />
        {/* <ScrollView style={{ marginBottom: 10 }}>
          <MainBox
            title="OFFERS & SHOPS"
            body="Offers Shops Offers Shops Offers Shops"
          />
          <Box5
            title="REALESTATE"
            body="Offers Shops Offers Shops Offers Shops"
          />
          <BoxLeftRight
            title="CARS"
            body="Offers Shops Offers Shops Offers Shops"
          />
          <Box4
            title="ELECTRONICS"
            body="Offers Shops Offers Shops Offers Shops"
          />
          <Box5
            title="FAMILY NEEDS"
            body="Offers Shops Offers Shops Offers Shops"
          />
          <BoxLeftRight
            title="VACANCY & SERVICES"
            body="Offers Shops Offers Shops Offers Shops"
          />
          <Box4 title="OTHERS" body="Offers Shops Offers Shops Offers Shops" />
        </ScrollView> */}

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
