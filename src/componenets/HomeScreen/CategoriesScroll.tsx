import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { icons } from '../../load';
import CategoryIcon from './CategoryIcon';
import HeaderFilter from './HeaderFilter';
import FilterSelect from './filters/FilterSelect';

class CategoriesScroll extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.buckets !== prevState.buckets) {
      return { buckets: nextProps.buckets, showFilter: true };
    } else {
      return { showFilter: false };
    }
  }
  scrollView: any;
  // scrollOffset: any;

  constructor(props: any) {
    super(props);
    this.state = {
      buckets: null,
      showFilter: false
    };
  }

  getSortBucket = (lang: any) => {
    return {
      buckets: [
        { id: 1, name: lang === 'ar' ? 'الأحدث' : 'Recent' },
        { id: 2, name: lang === 'ar' ? 'الأقل سعراً' : 'Less Price' },
        { id: 3, name: lang === 'ar' ? 'الأقرب' : 'Nearest' }
      ],
      label: lang === 'ar' ? 'فرز' : 'Sort',
      name: 'sortType'
    };
  };

  renderCategories = (categories: any, theme: any) => {
    return categories.map((item: any) => {
      const iconFunc = icons.category.filter(ic => ic.id === item.id);
      const icon = iconFunc[0].icon();

      return (
        <CategoryIcon
          icon={icon}
          addFilter={this.props.addFilter}
          removeAllFilters={this.props.removeAllFilters}
          categoryId={this.props.rest.categoryId}
          iconColor={theme.color.catIcon}
          textColor={theme.color.catText}
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

  renderSort = (sortData: any, lang: any) => {
    return (
      <FilterSelect
        lang={lang}
        data={sortData}
        icon="md-funnel"
        itemKind="sortType"
        addFilter={this.props.addFilter}
        removeFilter={this.props.removeFilter}
        rest={this.props.rest}
        words={this.props.words}
      />
    );
  };

  renderAllBotton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.lang === 'ar'
            ? this.scrollView.scrollToEnd({ animated: true })
            : this.scrollView.scrollTo({ animated: true, offset: 0 });
          this.props.removeAllFilters();
        }}
        style={{
          padding: 3,
          paddingHorizontal: 4,
          margin: 5,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#6FA7D5',
          shadowOffset: { width: 2, height: 2 },
          shadowColor: '#666',
          shadowRadius: 3,
          shadowOpacity: 0.2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: '#fff',
            fontFamily: 'cairo-regular',
            transform: [{ rotateZ: '270deg' }]
          }}
        >
          {this.props.words.all}
        </Text>
      </TouchableOpacity>
    );
  };

  scrollListToStart = () => {
    if (this.props.lang === 'ar') {
      this.scrollView.scrollToEnd({ animated: false });
    }
  };

  render() {
    const sortData = this.getSortBucket(this.props.lang);
    const { theme, addFilter, removeFilter, activeItem, rest } = this.props;
    const { buckets } = this.state;
    if (!buckets) {
      return <View />;
    }
    const categories = this.props.categories;

    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: this.props.lang === 'ar' ? 'row-reverse' : 'row',
            paddingHorizontal: 5,
            backgroundColor: '#fff'
          }}
        >
          {this.renderAllBotton()}
          <ScrollView
            ref={(ref: any) => {
              this.scrollView = ref;
            }}
            // onScroll={e => {
            //   this.scrollOffset = e.nativeEvent.contentOffset.x;
            // }}
            onContentSizeChange={this.scrollListToStart}
            scrollEventThrottle={16}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: this.props.lang === 'ar' ? 'row-reverse' : 'row'
            }}
            style={{
              backgroundColor: '#fff'
            }}
          >
            {this.renderCategories(categories, theme)}
          </ScrollView>
        </View>

        {this.state.showFilter && (
          <HeaderFilter
            lang={this.props.lang}
            rest={rest}
            renderSort={this.renderSort}
            sortData={sortData}
            buckets={buckets}
            addFilter={addFilter}
            removeFilter={removeFilter}
            activeItem={activeItem}
            words={this.props.words}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.glob.language.category,
  words: state.glob.language.words,
  buckets: state.post.buckets
});

export default connect(mapStateToProps)(CategoriesScroll);
