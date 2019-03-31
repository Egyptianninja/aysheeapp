import * as React from 'react';
import ChoiseCategory from '../../componenets/ChoiseScreen/ChoiseCategory';

class ChoiseScreen extends React.Component<any, any> {
  render() {
    return <ChoiseCategory navigation={this.props.navigation} />;
  }
}

export default ChoiseScreen;
