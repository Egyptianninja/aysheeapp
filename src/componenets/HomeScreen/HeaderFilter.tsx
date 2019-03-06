import * as React from 'react';
import { View, ScrollView, Dimensions, Platform } from 'react-native';
import FilterSelect from './filters/FilterSelect';

const { width } = Dimensions.get('window');

const HeaderFilter: any = ({
  rest: { categoryId },
  rest,
  buckets,
  addFilter,
  sortData,
  removeFilter,
  isRTL,
  words
}: any) => {
  if (categoryId === 0) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'realestateId', data: getItems(buckets, 'realestateId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') },
      { name: 'isfurnishered', data: getItems(buckets, 'isfurnishered') },
      { name: 'rooms', data: getItems(buckets, 'rooms') },
      { name: 'bathrooms', data: getItems(buckets, 'bathrooms') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 1) {
    const brandId = rest.brandId;
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'brandId', data: getItems(buckets, 'brandId') },
      { name: 'subBrandId', data: getItems(buckets, 'subBrandId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') },
      { name: 'year', data: getItems(buckets, 'year') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);

    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          if (filter.name === 'subBrandId') {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              isRTL,
              !(brandId || brandId === 0),
              { id: brandId, label: words.subBrand, name: 'subBrandId' }
            );
          } else {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              isRTL
            );
          }
        })}
      </RenderFilter>
    );
  } else if (categoryId === 15) {
    const brandId = rest.brandId;
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'brandId', data: getItems(buckets, 'brandId') },
      { name: 'subBrandId', data: getItems(buckets, 'subBrandId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') },
      { name: 'year', data: getItems(buckets, 'year') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);

    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          if (filter.name === 'subBrandId') {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              isRTL,
              !(brandId || brandId === 0),
              { id: brandId, label: words.subBrand, name: 'subBrandId' }
            );
          } else {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              isRTL
            );
          }
        })}
      </RenderFilter>
    );
  } else if (categoryId === 2) {
    const kindId = rest.kindId;
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'eBrandId', data: getItems(buckets, 'eBrandId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);

    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          if (filter.name === 'eBrandId') {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              isRTL,
              !(kindId || kindId === 0),
              { id: kindId, label: words.brand, name: 'eBrandId' }
            );
          } else {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              isRTL
            );
          }
        })}
      </RenderFilter>
    );
  } else if (
    categoryId === 3 ||
    categoryId === 8 ||
    categoryId === 14 ||
    categoryId === 16
  ) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else if (
    categoryId === 4 ||
    categoryId === 7 ||
    categoryId === 11 ||
    categoryId === 19
  ) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 9 || categoryId === 10) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'serviceId', data: getItems(buckets, 'serviceId') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 17) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 12 || categoryId === 13 || categoryId === 18) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 5 || categoryId === 6) {
    const catFilters = [
      { name: 'sortType', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            isRTL
          );
        })}
      </RenderFilter>
    );
  } else {
    return <View />;
  }
};

export default HeaderFilter;

const renderSelectRow = (
  words: any,
  rest: any,
  itemKind: any,
  bucket: any,
  addFilter: any,
  removeFilter: any,
  isRTL: any,
  disable: boolean = false,
  pid: any = null
) => {
  return (
    <View key={itemKind} style={{ flexDirection: 'row' }}>
      <View
        style={{
          marginVertical: 10,
          borderLeftWidth: 1,
          borderLeftColor: '#ddd'
        }}
      />
      <FilterSelect
        isRTL={isRTL}
        data={bucket}
        disable={disable}
        pid={pid}
        icon
        value={[itemKind]}
        itemKind={itemKind}
        addFilter={addFilter}
        removeFilter={removeFilter}
        rest={rest}
        words={words}
      />
    </View>
  );
};

const getItems = (buckets: any, item: any) => {
  return buckets.filter((bk: any) => bk.name === item)[0];
};

const RenderFilter = (props: any) => {
  return (
    <ScrollView
      scrollEventThrottle={16}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent:
          props.isRTL && Platform.OS !== 'android' ? 'flex-end' : 'flex-start'
      }}
      style={{
        minWidth: width - 85
      }}
    >
      <View
        style={{
          flexDirection:
            props.isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.children}
      </View>
    </ScrollView>
  );
};
