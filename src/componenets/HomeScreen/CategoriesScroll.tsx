import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { icons, images } from '../../load';
import { rtlos } from '../../utils';
import CategoryIcon from './CategoryIcon';
import FilterSelect from './filters/FilterSelect';
import HeaderFilter from './HeaderFilter';
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
          navigation={this.props.navigation}
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
    const rtlOS = rtlos();
    const {
      categories,
      addFilter,
      removeFilter,
      removeAllFilters,
      rest,
      words,
      isRTL
    } = this.props;
    const selected = this.props.currentCategory;
    const categoryName = categories.filter(
      (cat: any) => cat.id === rest.categoryId
    )[0];
    const reset = Object.values(rest).length === 1;

    return (
      <View
        style={{
          width: '100%',
          backgroundColor: selected ? '#f6f5f4' : '#fff'
        }}
      >
        <View
          style={{
            flexDirection:
              isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row'
            // paddingHorizontal: 5
          }}
        >
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
              // paddingTop: !selected ? 5 : undefined,
              paddingHorizontal: 5
            }}
            style={{
              height: selected ? 60 : 95
            }}
          >
            <View
              style={{
                flexDirection:
                  isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row'
              }}
            >
              <OfferIcon
                navigation={this.props.navigation}
                title={words.offers}
              />
              {this.renderCategories(categories)}
            </View>
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
