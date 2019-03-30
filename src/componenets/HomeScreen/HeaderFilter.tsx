import * as React from 'react';
import { Dimensions, Platform, ScrollView, View } from 'react-native';
import FilterSelect from './filters/FilterSelect';
import PickerUI from '../../lib/ios/Picker';
import SwitchUI from '../../lib/ios/Switch';

const { width } = Dimensions.get('window');

const HeaderFilter: any = ({
  rest: { categoryId },
  rest,
  buckets,
  addFilter,
  removeFilter,
  isRTL,
  words
}: any) => {
  if (categoryId === 0) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
          }}
        >
          {renderPicker({
            words,
            rest,
            itemKind: 'city',
            bucket: getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          })}
          {renderPicker({
            words,
            rest,
            itemKind: 'realestateId',
            bucket: getItems(buckets, 'realestateId'),
            addFilter,
            removeFilter,
            isRTL
          })}
        </View>
        {renderSwitch({
          words,
          rest,
          itemKind: 'issale',
          bucket: getItems(buckets, 'issale'),
          addFilter,
          removeFilter,
          isRTL,
          originalTitle: 'For Sale',
          seconTitle: 'For Rent'
        })}
        {renderSwitch({
          words,
          rest,
          itemKind: 'isfurnishered',
          bucket: getItems(buckets, 'isfurnishered'),
          addFilter,
          removeFilter,
          isRTL,
          originalTitle: 'Furnished',
          seconTitle: 'Unfurnished'
        })}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
          }}
        >
          {renderPicker({
            words,
            rest,
            itemKind: 'rooms',
            bucket: getItems(buckets, 'rooms'),
            addFilter,
            removeFilter,
            isRTL
          })}
          {renderPicker({
            words,
            rest,
            itemKind: 'bathrooms',
            bucket: getItems(buckets, 'bathrooms'),
            addFilter,
            removeFilter,
            isRTL
          })}
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 1) {
    const brandId = rest.brandId;
    const catFilters = [
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
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
          }}
        >
          {renderPicker({
            words,
            rest,
            itemKind: 'city',
            bucket: getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          })}
          {renderPicker({
            words,
            rest,
            itemKind: 'kindId',
            bucket: getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          })}
        </View> */}
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
        {/* {renderSwitch({
          words,
          rest,
          itemKind: 'isnew',
          bucket: getItems(buckets, 'isnew'),
          addFilter,
          removeFilter,
          isRTL,
          originalTitle: 'New',
          seconTitle: 'Used'
        })}
        {renderSwitch({
          words,
          rest,
          itemKind: 'issale',
          bucket: getItems(buckets, 'issale'),
          addFilter,
          removeFilter,
          isRTL,
          originalTitle: 'For Sale',
          seconTitle: 'For Rent'
        })}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
          }}
        >
          {renderPicker({
            words,
            rest,
            itemKind: 'year',
            bucket: getItems(buckets, 'year'),
            addFilter,
            removeFilter,
            isRTL
          })}
        </View> */}
      </RenderFilter>
    );
  } else if (categoryId === 15) {
    const brandId = rest.brandId;
    const catFilters = [
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'brandId', data: getItems(buckets, 'brandId') },
      { name: 'subBrandId', data: getItems(buckets, 'subBrandId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') },
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
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'kindId', data: getItems(buckets, 'kindId') },
      { name: 'eBrandId', data: getItems(buckets, 'eBrandId') },
      { name: 'isnew', data: getItems(buckets, 'isnew') }
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
    categoryId === 7 ||
    categoryId === 8 ||
    categoryId === 14
  ) {
    const catFilters = [
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
  } else if (categoryId === 19) {
    const catFilters = [
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
  } else if (categoryId === 9) {
    const catFilters = [
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'isservicereq', data: getItems(buckets, 'isservicereq') },
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
  } else if (categoryId === 17 || categoryId === 18) {
    const catFilters = [
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
  } else if (
    categoryId === 4 ||
    categoryId === 10 ||
    categoryId === 11 ||
    categoryId === 12 ||
    categoryId === 16
  ) {
    const catFilters = [
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
  } else if (categoryId === 5) {
    const catFilters = [
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'isjobreq', data: getItems(buckets, 'isjobreq') }
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
  } else if (categoryId === 6) {
    const catFilters = [
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
  } else if (categoryId === 13) {
    const catFilters = [
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
const renderPicker = ({
  words,
  rest,
  itemKind,
  bucket,
  addFilter,
  removeFilter,
  isRTL,
  pid = null
}: any) => {
  return (
    <PickerUI
      isRTL={isRTL}
      data={bucket}
      pid={pid}
      icon
      propsValue={rest[itemKind]}
      value={[itemKind]}
      itemKind={itemKind}
      addFilter={addFilter}
      removeFilter={removeFilter}
      rest={rest}
      words={words}
    />
  );
};

const renderSwitch = ({
  words,
  rest,
  itemKind,
  bucket,
  addFilter,
  removeFilter,
  isRTL,
  originalTitle,
  seconTitle
}: any) => {
  return (
    <SwitchUI
      isRTL={isRTL}
      data={bucket}
      icon
      propsValue={rest[itemKind]}
      value={[itemKind]}
      itemKind={itemKind}
      addFilter={addFilter}
      removeFilter={removeFilter}
      rest={rest}
      words={words}
      originalTitle={originalTitle}
      seconTitle={seconTitle}
    />
  );
};

const getItems = (buckets: any, item: any) => {
  return buckets.filter((bk: any) => bk.name === item)[0];
};

const RenderFilter = (props: any) => {
  return <View>{props.children}</View>;
};
// const RenderFilter = (props: any) => {
//   return (
//     <ScrollView scrollEventThrottle={16} showsHorizontalScrollIndicator={false}>
//       {props.children}
//     </ScrollView>
//   );
// };
