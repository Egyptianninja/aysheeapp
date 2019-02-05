import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { icons } from '../../load';
import CategoryIcon from './CategoryIcon';
import HeaderFilter from './HeaderFilter';
import BottonAll from './BottonAll';

class CategoriesScroll extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.currentCategory !== prevState.currentCategory) {
      if (nextProps.buckets !== prevState.buckets) {
        return {
          buckets: nextProps.buckets,
          showFilter: false
        };
      } else {
        return { showFilter: true };
      }
    } else {
      if (nextProps.buckets !== prevState.buckets) {
        return { buckets: nextProps.buckets, showFilter: false };
      } else {
        return { showFilter: false };
      }
    }
  }
  scrollView: any;

  constructor(props: any) {
    super(props);
    this.state = {
      buckets: null,
      showFilter: false
    };
  }

  getSortBucket = () => {
    return {
      name: 'sortType',
      buckets: this.props.sort,
      label: this.props.words.sort
    };
  };

  renderCategories = (categories: any) => {
    return categories.map((item: any) => {
      const iconFunc = icons.category.filter(ic => ic.id === item.id);
      const icon = iconFunc[0].icon();

      return (
        <CategoryIcon
          icon={icon}
          addFilter={this.props.addFilter}
          removeAllFilters={this.props.removeAllFilters}
          categoryId={this.props.rest.categoryId}
          iconColor="#777"
          textColor="#777"
          item={item}
          key={item.id}
        />
      );
    });
  };

  getCategories = (itemKind: string) => {
    return this.props.buckets
      .filter((buck: any) => buck.name === itemKind)[0]
      .buckets.sort((a: any, b: any) => a.id - b.id);
  };

  handlePress = (itemId: any, itemKind: any, addFilter: any) => {
    addFilter(itemKind, itemId);
  };

  scrollListToStart = () => {
    if (this.props.lang === 'ar') {
      this.scrollView.scrollToEnd({ animated: false });
    }
  };

  render() {
    const sortData = this.getSortBucket();
    const {
      categories,
      addFilter,
      removeFilter,
      removeAllFilters,
      activeItem,
      rest,
      words,
      lang
    } = this.props;
    const allbtnactive = !(rest.categoryId || rest.categoryId === 0);
    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
            paddingHorizontal: 5
          }}
        >
          <BottonAll
            lang={lang}
            allbtnactive={allbtnactive}
            scrollView={this.scrollView}
            removeAllFilters={removeAllFilters}
            title={words.all}
          />
          <ScrollView
            ref={(ref: any) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={this.scrollListToStart}
            scrollEventThrottle={16}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
            }}
            style={{
              backgroundColor: '#fff'
            }}
          >
            {this.renderCategories(categories)}
          </ScrollView>
        </View>
        {/* {this.state.showFilter && (
          <View
            style={{
              height: 50,
              width: '100%',
              backgroundColor: '#fff',
              position: 'absolute',
              left: 0,
              top: 84,
              zIndex: 601
            }}
          />
        )} */}

        <HeaderFilter
          lang={this.props.lang}
          rest={rest}
          sortData={sortData}
          buckets={this.state.buckets}
          addFilter={addFilter}
          removeFilter={removeFilter}
          activeItem={activeItem}
          words={this.props.words}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.glob.language.category,
  words: state.glob.language.words,
  sort: state.glob.language.sort,
  buckets: state.post.buckets
});

export default connect(mapStateToProps)(CategoriesScroll);
