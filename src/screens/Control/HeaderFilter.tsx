import * as React from 'react';
import { View, ScrollView } from 'react-native';
import FilterSelect from './filters/FilterSelect';

const HeaderFilter: any = ({
  rest,
  buckets,
  addFilter,
  removeFilter,
  lang
}: any) => {
  if (!buckets) {
    return <View />;
  }
  const categoryId = getItems(buckets, 'categoryId');
  const country = getItems(buckets, 'country');
  const city = getItems(buckets, 'city');
  const ispublish = getItems(buckets, 'ispublish');
  const islive = getItems(buckets, 'islive');
  const isoffer = getItems(buckets, 'isoffer');
  const isfront = getItems(buckets, 'isfront');

  return (
    <RenderFilter lang={lang}>
      {country &&
        renderSelectRow(
          rest,
          'country',
          country,
          addFilter,
          removeFilter,
          lang
        )}
      {categoryId &&
        renderSelectRow(
          rest,
          'categoryId',
          categoryId,
          addFilter,
          removeFilter,
          lang
        )}
      {city &&
        renderSelectRow(rest, 'city', city, addFilter, removeFilter, lang)}
      {ispublish &&
        renderSelectRow(
          rest,
          'ispublish',
          ispublish,
          addFilter,
          removeFilter,
          lang
        )}
      {islive &&
        renderSelectRow(rest, 'islive', islive, addFilter, removeFilter, lang)}
      {isoffer &&
        renderSelectRow(
          rest,
          'isoffer',
          isoffer,
          addFilter,
          removeFilter,
          lang
        )}
      {isfront &&
        renderSelectRow(
          rest,
          'isfront',
          isfront,
          addFilter,
          removeFilter,
          lang
        )}
    </RenderFilter>
  );
};

export default HeaderFilter;

const renderSelectRow = (
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
    <View style={{ flexDirection: 'row' }}>
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
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row'
      }}
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
