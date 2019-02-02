import * as React from "react";
import { View, ScrollView } from "react-native";
import FilterSelect from "./filters/FilterSelect";

const HeaderFilter: any = ({
  rest: { categoryId },
  rest,
  buckets,
  addFilter,
  renderSort,
  sortData,
  removeFilter,
  lang,
  words
}: any) => {
  if (categoryId === 0) {
    const city = getItems(buckets, "city");
    const realestate = getItems(buckets, "realestateId");
    const isnew = getItems(buckets, "isnew");
    const issale = getItems(buckets, "issale");
    const isfurnishered = getItems(buckets, "isfurnishered");
    const rooms = getItems(buckets, "rooms");
    const bathrooms = getItems(buckets, "bathrooms");

    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {realestate &&
          renderSelectRow(
            words,
            rest,
            "realestateId",
            realestate,
            addFilter,
            removeFilter,
            lang
          )}
        {rooms &&
          renderSelectRow(
            words,
            rest,
            "rooms",
            rooms,
            addFilter,
            removeFilter,
            lang
          )}
        {bathrooms &&
          renderSelectRow(
            words,
            rest,
            "bathrooms",
            bathrooms,
            addFilter,
            removeFilter,
            lang
          )}

        {isnew &&
          renderSelectRow(
            words,
            rest,
            "isnew",
            isnew,
            addFilter,
            removeFilter,
            lang
          )}
        {issale &&
          renderSelectRow(
            words,
            rest,
            "issale",
            issale,
            addFilter,
            removeFilter,
            lang
          )}
        {isfurnishered &&
          renderSelectRow(
            words,
            rest,
            "isfurnishered",
            isfurnishered,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (categoryId === 1) {
    const city = getItems(buckets, "city");
    const kinds = getItems(buckets, "kindId");
    const brands = getItems(buckets, "brandId");
    const subBrands = getItems(buckets, "subBrandId");

    const brandId = rest.brandId;

    const isnew = getItems(buckets, "isnew");
    const issale = getItems(buckets, "issale");
    const year = getItems(buckets, "year");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {kinds &&
          renderSelectRow(
            words,
            rest,
            "kindId",
            kinds,
            addFilter,
            removeFilter,
            lang
          )}
        {brands &&
          renderSelectRow(
            words,
            rest,
            "brandId",
            brands,
            addFilter,
            removeFilter,
            lang
          )}
        {subBrands &&
          renderSelectRow(
            words,
            rest,
            "subBrandId",
            subBrands,
            addFilter,
            removeFilter,
            lang,
            !(brandId || brandId === 0),
            { id: brandId, label: "Sub Brand", name: "subBrandId" }
          )}
        {isnew &&
          renderSelectRow(
            words,
            rest,
            "isnew",
            isnew,
            addFilter,
            removeFilter,
            lang
          )}
        {issale &&
          renderSelectRow(
            words,
            rest,
            "issale",
            issale,
            addFilter,
            removeFilter,
            lang
          )}
        {year &&
          renderSelectRow(
            words,
            rest,
            "year",
            year,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (categoryId === 2) {
    const city = getItems(buckets, "city");
    const kinds = getItems(buckets, "kindId");
    const eBrands = getItems(buckets, "eBrandId");
    const kindId = rest.kindId;
    const isnew = getItems(buckets, "isnew");
    const issale = getItems(buckets, "issale");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {kinds &&
          renderSelectRow(
            words,
            rest,
            "kindId",
            kinds,
            addFilter,
            removeFilter,
            lang
          )}
        {eBrands &&
          renderSelectRow(
            words,
            rest,
            "eBrandId",
            eBrands,
            addFilter,
            removeFilter,
            lang,
            !(kindId || kindId === 0),
            { id: kindId, label: "Brand", name: "eBrandId" }
          )}
        {isnew &&
          renderSelectRow(
            words,
            rest,
            "isnew",
            isnew,
            addFilter,
            removeFilter,
            lang
          )}
        {issale &&
          renderSelectRow(
            words,
            rest,
            "issale",
            issale,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (categoryId === 3 || categoryId === 8 || categoryId === 16) {
    const city = getItems(buckets, "city");
    const kinds = getItems(buckets, "kindId");
    const isnew = getItems(buckets, "isnew");
    const issale = getItems(buckets, "issale");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {kinds &&
          renderSelectRow(
            words,
            rest,
            "kindId",
            kinds,
            addFilter,
            removeFilter,
            lang
          )}
        {isnew &&
          renderSelectRow(
            words,
            rest,
            "isnew",
            isnew,
            addFilter,
            removeFilter,
            lang
          )}
        {issale &&
          renderSelectRow(
            words,
            rest,
            "issale",
            issale,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (
    categoryId === 4 ||
    categoryId === 7 ||
    categoryId === 11 ||
    categoryId === 15 ||
    categoryId === 19
  ) {
    const city = getItems(buckets, "city");
    const isnew = getItems(buckets, "isnew");
    const issale = getItems(buckets, "issale");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {isnew &&
          renderSelectRow(
            words,
            rest,
            "isnew",
            isnew,
            addFilter,
            removeFilter,
            lang
          )}
        {issale &&
          renderSelectRow(
            words,
            rest,
            "issale",
            issale,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (categoryId === 9 || categoryId === 10) {
    const city = getItems(buckets, "city");
    const services = getItems(buckets, "serviceId");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {services &&
          renderSelectRow(
            words,
            rest,
            "serviceId",
            services,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (categoryId === 17) {
    const city = getItems(buckets, "city");
    const kinds = getItems(buckets, "kindId");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {kinds &&
          renderSelectRow(
            words,
            rest,
            "kindId",
            kinds,
            addFilter,
            removeFilter,
            lang
          )}
      </RenderFilter>
    );
  } else if (categoryId === 12 || categoryId === 13 || categoryId === 18) {
    const city = getItems(buckets, "city");
    const kinds = getItems(buckets, "kindId");
    const isnew = getItems(buckets, "isnew");
    return (
      <RenderFilter lang={lang}>
        {renderSort(sortData, lang)}
        {city &&
          renderSelectRow(
            words,
            rest,
            "city",
            city,
            addFilter,
            removeFilter,
            lang
          )}
        {kinds &&
          renderSelectRow(
            words,
            rest,
            "kindId",
            kinds,
            addFilter,
            removeFilter,
            lang
          )}
        {isnew &&
          renderSelectRow(
            words,
            rest,
            "isnew",
            isnew,
            addFilter,
            removeFilter,
            lang
          )}
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
    <View style={{ flexDirection: "row" }}>
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
        props.lang === "ar"
          ? () => scrollView.scrollToEnd({ animated: false })
          : () => null
      }
      contentContainerStyle={{
        justifyContent: "flex-start",
        marginHorizontal: props.lang === "ar" ? -7 : 7
      }}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft: 5,
        backgroundColor: "#fff"
      }}
    >
      <View
        style={{
          flexDirection: props.lang === "ar" ? "row-reverse" : "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {props.children}
      </View>
    </ScrollView>
  );
};
