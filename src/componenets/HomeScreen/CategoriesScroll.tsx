import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { icons } from '../../load';
import BottonNew from './BottonNew';
import CategoryIcon from './CategoryIcon';
import CategoryIconSingle from './CategoryIconSingle';
import HeaderFilter from './HeaderFilter';
import OfferIcon from './OffersIcon';
import FilterSelect from './filters/FilterSelect';

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
    const categoryName = categories.filter(
      (cat: any) => cat.id === rest.categoryId
    )[0];
    const back = Object.values(rest).length === 1;
    return (
      <View style={{ width: '100%' }}>
        {selected && (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            {back && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: -2,
                  top: -2,
                  zIndex: 10,
                  paddingVertical: 3,
                  paddingLeft: 7,
                  paddingHorizontal: 13
                }}
                onPress={() => this.props.removeAllFilters()}
              >
                <Ionicons
                  style={{ paddingHorizontal: 10, paddingTop: 3 }}
                  name="ios-arrow-back"
                  size={33}
                  color="#8E90F0"
                />
              </TouchableOpacity>
            )}
            {!back && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: -5,
                  top: -4,
                  zIndex: 10,
                  padding: 5,
                  flexDirection: 'row'
                }}
                onPress={() => this.props.removeAllCategoryFilters()}
              >
                <Ionicons
                  style={{ paddingHorizontal: 10, paddingTop: 3 }}
                  name="ios-close-circle"
                  size={33}
                  color="#8E90F0"
                />
                <Text
                  style={{
                    top: 10,
                    left: -5,
                    color: '#7678ED',
                    fontSize: 15
                  }}
                >
                  {words.reset}
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'cairo-regular',
                  color: '#333',
                  paddingHorizontal: 15
                }}
              >
                {categoryName.name}
              </Text>
            </View>

            <View
              style={{
                position: 'absolute',
                right: -5,
                top: -2,
                zIndex: 10,
                paddingVertical: 5,
                justifyContent: 'flex-end',
                flexDirection: 'row'
              }}
            >
              <FilterSelect
                isRTL={isRTL}
                data={sortData}
                sort={true}
                itemKind="sortType"
                addFilter={addFilter}
                removeFilter={removeFilter}
                rest={rest}
                words={words}
              />
              <TouchableOpacity
                onPress={() => this.props.showCategoriesModal()}
                style={{
                  // justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  height: 30,
                  width: 50,
                  paddingRight: 12,
                  paddingLeft: 6,
                  marginRight: 2,
                  top: -4
                  // backgroundColor: 'red'
                }}
              >
                <Ionicons
                  name="ios-keypad"
                  size={34}
                  color="#7678ED"
                  style={{ top: 1 }}
                />
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    position: 'absolute',
                    left: 8,
                    top: 5,
                    backgroundColor: '#fbbc93'
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
              addFilter={addFilter}
              showCategoriesModal={this.props.showCategoriesModal}
              scrollView={this.scrollView}
              removeAllFilters={removeAllFilters}
              isAuthenticated={this.props.isAuthenticated}
              navigation={this.props.navigation}
              title={words.allcategories}
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
              paddingTop: !selected ? 5 : undefined
            }}
            style={{
              backgroundColor: '#fff',
              height: selected ? 50 : 95
            }}
          >
            {!selected && (
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
