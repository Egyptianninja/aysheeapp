import * as React from 'react';
import { View, Dimensions } from 'react-native';
import FilterOption from './FilterOption';
import { rtlos } from '../../utils';

const { width } = Dimensions.get('window');

export default class SortView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      label: null
    };
  }

  componentWillMount() {
    if (!this.state.lable && this.props.data) {
      this.setState({ label: this.props.data.label });
    }
  }
  handleLabel = (label: any) => {
    this.setState({ label });
  };
  renderOptions = (data: any) => {
    return (
      <View
        style={{
          flexDirection: rtlos() === 2 || rtlos() === 3 ? 'row-reverse' : 'row'
        }}
      >
        {data.buckets.map((da: any) => {
          return (
            <FilterOption
              isRTL={this.props.isRTL}
              key={da.id}
              onChange={this.props.onChange}
              width={width}
              itemData={da}
              {...this.props}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const data = this.props.data;
    if (!data || data.buckets.length === 0) {
      return null;
    }

    const { rest, itemKind } = this.props;
    const selected =
      rest[itemKind] || rest[itemKind] === 0 || rest[itemKind] === false;

    return <View>{this.renderOptions(data)}</View>;
  }
}
