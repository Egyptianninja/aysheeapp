import * as React from 'react';
import ChoiseCategory from '../../componenets/Search/ChoiseCategory';

class CategoryView extends React.Component<any, any> {
  render() {
    return (
      <ChoiseCategory
        addcategory={this.props.addcategory}
        showSearch={this.props.showSearch}
        iconsize={44}
        navigation={this.props.navigation}
      />
    );
  }
}

export default CategoryView;
