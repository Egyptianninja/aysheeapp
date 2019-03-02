import * as React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { icons } from '../../load';
import CategoryIcon from './CategoryIcon';
import HeaderFilter from './HeaderFilter';
import BottonNew from './BottonNew';
import CategoryIconSingle from './CategoryIconSingle';
import OfferIcon from './OffersIcon';

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

  componentDidMount() {
    this.props.setHome(this.handleHome);
  }

  getSortBucket = () => {
    return {
      name: 'sortType',
      buckets: this.props.sort,
      label: this.props.words.sort
    };
  };

  renderCategories = (categories: any) => {
    categories.sort((a: any, b: any) =>
      a.sort > b.sort ? 1 : b.sort > a.sort ? -1 : 0
    );
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
  renderSelectedCategory = (categoryId: any) => {
    const category = this.props.categories.filter(
      (a: any) => a.id === categoryId
    )[0];
    const iconFunc = icons.category.filter(ic => ic.id === category.id);
    const icon = iconFunc[0].icon();

    return (
      <CategoryIconSingle
        icon={icon}
        noTitle={true}
        addFilter={this.props.addFilter}
        removeAllFilters={this.props.removeAllFilters}
        categoryId={this.props.rest.categoryId}
        iconColor="#777"
        textColor="#777"
        item={category}
        key={category.id}
      />
    );
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
    if (this.props.isRTL) {
      this.scrollView.scrollToEnd({ animated: false });
    }
  };

  handleHome = () => {
    this.props.isRTL
      ? this.scrollView.scrollToEnd({ animated: true })
      : this.scrollView.scrollTo({ animated: true, offset: 0 });
    this.props.removeAllFilters();
  };

  render() {
    const sortData = this.getSortBucket();
    const {
      categories,
      addFilter,
      removeFilter,
      removeAllFilters,
      rest,
      words,
      isRTL
    } = this.props;
    const allbtnactive = !(rest.categoryId || rest.categoryId === 0);
    const selected =
      this.props.currentCategory || this.props.currentCategory === 0;
    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            flexDirection:
              isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row',
            paddingHorizontal: 5
          }}
        >
          {!selected && (
            <BottonNew
              allbtnactive={allbtnactive}
              scrollView={this.scrollView}
              removeAllFilters={removeAllFilters}
              isAuthenticated={this.props.isAuthenticated}
              navigation={this.props.navigation}
              title={words.listfree}
            />
          )}
          {selected && this.renderSelectedCategory(this.props.currentCategory)}
          {selected && (
            <View
              style={{
                position: 'absolute',
                left: 5,
                top: 10,
                height: 70,
                width: 35,
                backgroundColor: '#f1f1f1',
                borderBottomRightRadius: isRTL ? 35 : undefined,
                borderTopRightRadius: isRTL ? 35 : undefined,
                borderTopLeftRadius: isRTL ? undefined : 35,
                borderBottomLeftRadius: isRTL ? undefined : 35,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                zIndex: 240
              }}
            />
          )}
          <ScrollView
            ref={(ref: any) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={this.scrollListToStart}
            scrollEventThrottle={16}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection:
                isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row',
              paddingLeft: selected ? 75 : 0,
              paddingTop: 5
            }}
            style={{
              backgroundColor: selected ? '#f1f1f1' : '#fff',
              height: selected ? 70 : 95,
              marginVertical: selected ? 10 : undefined,
              borderBottomRightRadius: selected && isRTL ? 40 : undefined,
              borderTopRightRadius: selected && isRTL ? 40 : undefined,
              borderTopLeftRadius: !selected
                ? undefined
                : selected && isRTL
                ? undefined
                : 40,
              borderBottomLeftRadius: !selected
                ? undefined
                : selected && isRTL
                ? undefined
                : 40
            }}
          >
            {!selected && (
              <View style={{ flexDirection: 'row-reverse' }}>
                <OfferIcon
                  navigation={this.props.navigation}
                  title="Best Offers"
                />
                {this.renderCategories(categories)}
              </View>
            )}
            {this.props.buckets && (
              <HeaderFilter
                isRTL={this.props.isRTL}
                rest={rest}
                sortData={sortData}
                buckets={this.state.buckets}
                addFilter={addFilter}
                removeFilter={removeFilter}
                words={this.props.words}
              />
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.glob.language.category,
  words: state.glob.language.words,
  sort: state.glob.language.sort,
  buckets: state.post.buckets,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(CategoriesScroll);
