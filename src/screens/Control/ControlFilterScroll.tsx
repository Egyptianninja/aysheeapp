import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import HeaderFilter from './HeaderFilter';

class ControlFilterScroll extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.controlbuckets !== prevState.controlbuckets) {
      return { controlbuckets: nextProps.controlbuckets, showFilter: true };
    } else {
      return { showFilter: false };
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      controlbuckets: null,
      showFilter: false
    };
  }

  render() {
    const { addFilter, removeFilter, activeItem, rest } = this.props;
    const { controlbuckets } = this.state;

    if (!controlbuckets) {
      return <View />;
    }

    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: this.props.lang === 'ar' ? 'row-reverse' : 'row',
            paddingHorizontal: 5,
            backgroundColor: '#fff'
          }}
        />
        <HeaderFilter
          lang={this.props.lang}
          rest={rest}
          buckets={controlbuckets}
          addFilter={addFilter}
          removeFilter={removeFilter}
          activeItem={activeItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.glob.language.category,
  words: state.glob.language.words,
  controlbuckets: state.post.controlbuckets
});

export default connect(mapStateToProps)(ControlFilterScroll);
