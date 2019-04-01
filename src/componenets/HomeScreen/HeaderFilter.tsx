import * as React from 'react';
import { View } from 'react-native';
import FilterSelect from './filters/FilterSelect';
import PickerUI from '../../lib/ios/Picker';
import SwitchUI from '../../lib/ios/Switch';

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
    const catFilters = [
      { name: 'city', data: getItems(buckets, 'city') },
      { name: 'realestateId', data: getItems(buckets, 'realestateId') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);
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
      { name: 'kindId', data: getItems(buckets, 'kindId') }
    ];
    const filters = catFilters.filter((fl: any) => fl.data);

    return (
      <RenderFilter isRTL={isRTL} filters={filters}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
          }}
        >
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'brandId',
            getItems(buckets, 'brandId'),
            addFilter,
            removeFilter,
            isRTL
          )}
          {renderSelectRow(
            words,
            rest,
            'subBrandId',
            getItems(buckets, 'subBrandId'),
            addFilter,
            removeFilter,
            isRTL,
            !(brandId || brandId === 0),
            { id: brandId, label: words.subBrand, name: 'subBrandId' }
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 15) {
    const brandId = rest.brandId;
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'brandId',
            getItems(buckets, 'brandId'),
            addFilter,
            removeFilter,
            isRTL
          )}
          {renderSelectRow(
            words,
            rest,
            'subBrandId',
            getItems(buckets, 'subBrandId'),
            addFilter,
            removeFilter,
            isRTL,
            !(brandId || brandId === 0),
            { id: brandId, label: words.subBrand, name: 'subBrandId' }
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 2 || categoryId === 14) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'kindId',
            getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          )}
          {renderSelectRow(
            words,
            rest,
            'eBrandId',
            getItems(buckets, 'eBrandId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 3 || categoryId === 7) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'kindId',
            getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 8) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'kindId',
            getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
            words,
            rest,
            itemKind: 'isforman',
            bucket: getItems(buckets, 'isforman'),
            addFilter,
            removeFilter,
            isRTL,
            originalTitle: 'Man',
            seconTitle: 'Woman'
          })}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 19) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 9) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'serviceId',
            getItems(buckets, 'serviceId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
            words,
            rest,
            itemKind: 'isservicereq',
            bucket: getItems(buckets, 'isservicereq'),
            addFilter,
            removeFilter,
            isRTL,
            originalTitle: 'Request Service',
            seconTitle: 'Offer Service'
          })}
        </View>
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
        <View
          style={{
            // flexDirection: 'row',
            padding: 10
          }}
        >
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
        </View>
      </RenderFilter>
    );
  } else if (
    categoryId === 4 ||
    categoryId === 10 ||
    categoryId === 11 ||
    categoryId === 12 ||
    categoryId === 16
  ) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'kindId',
            getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 5) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
            words,
            rest,
            itemKind: 'isjobreq',
            bucket: getItems(buckets, 'isjobreq'),
            addFilter,
            removeFilter,
            isRTL,
            originalTitle: 'Request',
            seconTitle: 'Offer'
          })}
        </View>
      </RenderFilter>
    );
  } else if (categoryId === 6) {
    return (
      <RenderFilter isRTL={isRTL}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'kindId',
            getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          )}
          {renderSelectRow(
            words,
            rest,
            'eBrandId',
            getItems(buckets, 'eBrandId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
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
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'city',
            getItems(buckets, 'city'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          {renderSelectRow(
            words,
            rest,
            'kindId',
            getItems(buckets, 'kindId'),
            addFilter,
            removeFilter,
            isRTL
          )}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {renderSwitch({
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
        </View>
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
