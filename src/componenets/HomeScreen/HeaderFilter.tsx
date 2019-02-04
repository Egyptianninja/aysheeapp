import * as React from 'react';
import { View, ScrollView } from 'react-native';
import FilterSelect from './filters/FilterSelect';

const HeaderFilter: any = ({
  rest: { categoryId },
  rest,
  buckets,
  addFilter,
  sortData,
  removeFilter,
  lang,
  words
}: any) => {
  if (categoryId === 0) {
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'realestate', data: getItems(buckets, 'realestateId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') },
      { name: 'isfurnishered', data: getItems(buckets, 'isfurnishered') },
      { name: 'rooms', data: getItems(buckets, 'rooms') },
      { name: 'bathrooms', data: getItems(buckets, 'bathrooms') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            lang
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 1) {
    const brandId = rest.brandId;
    const catFilters = [
      { name: 'sort', data: sortData },
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
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          if (filter.name === 'subBrandId') {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              lang,
              !(brandId || brandId === 0),
              { id: brandId, label: 'Sub Brand', name: 'subBrandId' }
            );
          } else {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              lang
            );
          }
        })}
      </RenderFilter>
    );
  } else if (categoryId === 2) {
    const kindId = rest.kindId;
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'eBrandId', data: getItems(buckets, 'eBrandId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);

    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          if (filter.name === 'eBrandId') {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              lang,
              !(kindId || kindId === 0),
              { id: kindId, label: 'Brand', name: 'eBrandId' }
            );
          } else {
            return renderSelectRow(
              words,
              rest,
              filter.name,
              filter.data,
              addFilter,
              removeFilter,
              lang
            );
          }
        })}
      </RenderFilter>
    );
  } else if (categoryId === 3 || categoryId === 8 || categoryId === 16) {
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            lang
          );
        })}
      </RenderFilter>
    );
  } else if (
    categoryId === 4 ||
    categoryId === 7 ||
    categoryId === 11 ||
    categoryId === 15 ||
    categoryId === 19
  ) {
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
      { name: 'issale', data: getItems(buckets, 'issale') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            lang
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 9 || categoryId === 10) {
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'serviceId', data: getItems(buckets, 'serviceId') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            lang
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 17) {
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            lang
          );
        })}
      </RenderFilter>
    );
  } else if (categoryId === 12 || categoryId === 13 || categoryId === 18) {
    const catFilters = [
      { name: 'sort', data: sortData },
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
    return (
      <RenderFilter lang={lang} filters={filters}>
        {filters.map((filter: any) => {
          return renderSelectRow(
            words,
            rest,
            filter.name,
            filter.data,
            addFilter,
            removeFilter,
            lang
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
  lang: any,
  disable: boolean = false,
  pid: any = null
) => {
  return (
    <View key={itemKind} style={{ flexDirection: 'row' }}>
      <FilterSelect
        lang={lang}
        data={bucket}
        disable={disable}
        pid={pid}
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
  let scrollView: any;
  return (
    <ScrollView
      scrollEventThrottle={16}
      horizontal
      ref={(ref: any) => {
        scrollView = ref;
      }}
      onContentSizeChange={
        props.lang === 'ar'
          ? () => scrollView.scrollToEnd({ animated: false })
          : () => null
      }
      contentContainerStyle={{
        justifyContent: 'flex-start',
        marginHorizontal: props.lang === 'ar' ? -7 : 7
      }}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft: 5,
        backgroundColor: '#fff'
      }}
    >
      <View
        style={{
          flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.children}
      </View>
    </ScrollView>
  );
};
