export const getTimeLineBuckets = (categoryId: any, store: any, data: any) => {
  if (categoryId || categoryId === 0) {
    return getOtherBuckets(store, data, 'getTimeLine').filter((x: any) => x);
  } else {
    return getCategoryBuckets(store, data, 'getTimeLine').filter((x: any) => x);
  }
};

export const getCategoryBuckets = (store: any, data: any, query: any) => {
  const aggs = data[query].aggs.filter((agg: any) => agg.buckets.length > 0);
  const lang = store.languageName();
  const readyAggs = aggs.map((agg: any) => {
    if (agg.name === 'categoryId') {
      return getNamedAggs(store, 'category', agg, 'categoryId', lang);
    }
  });
  return readyAggs;
};
export const getOtherBuckets = (store: any, data: any, query: any) => {
  const words = store.words();
  const aggs = data[query].aggs.filter((agg: any) => agg.buckets.length > 0);
  const lang = store.languageName();
  const readyAggs = aggs.map((agg: any) => {
    if (agg.name === 'categoryId') {
      return getNamedAggs(
        store,
        'category',
        agg,
        'categoryId',
        lang,
        'Category'
      );
    }
    if (agg.name === 'city') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.city
      };
    }
    if (agg.name === 'kindId') {
      return getNamedAggs(store, 'kind', agg, 'kindId', lang, words.type);
    }
    if (agg.name === 'eBrandId') {
      return getNamedAggs(
        store,
        'electroBrands',
        agg,
        'eBrandId',
        lang,
        words.brand
      );
    }
    if (agg.name === 'realestateId') {
      return getNamedAggs(
        store,
        'realestate',
        agg,
        'realestateId',
        lang,
        words.type
      );
    }
    if (agg.name === 'brandId') {
      return getNamedAggs(store, 'brands', agg, 'brandId', lang, words.brand);
    }
    if (agg.name === 'subBrandId') {
      return getNamedAggs(
        store,
        'subBrands',
        agg,
        'subBrandId',
        lang,
        words.subBrand
      );
    }
    if (agg.name === 'serviceId') {
      return getNamedAggs(
        store,
        'service',
        agg,
        'serviceId',
        lang,
        words.service
      );
    } else if (agg.name === 'isnew') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key === '0' ? words.old : words.new,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: `${words.new} / ${words.old}`
      };
    } else if (agg.name === 'issale') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key === '0' ? words.rent : words.sale,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: `${words.sale} / ${words.rent}`
      };
    } else if (agg.name === 'isfurnishered') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key === '0' ? words.unfurnishered : words.furnishered,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.furnisher
      };
    } else if (agg.name === 'isforman') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key === '0' ? words.isforwomen : words.isforman,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.manwomen
      };
    } else if (agg.name === 'isjobreq') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key === '0' ? words.isjoboffer : words.isjobreq,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.type
      };
    } else if (agg.name === 'isservicereq') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key === '0' ? words.isserviceoffer : words.isservicereq,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.type
      };
    } else if (agg.name === 'rooms') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.rooms
      };
    } else if (agg.name === 'bathrooms') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.bathrooms
      };
    } else if (agg.name === 'year') {
      const namedBucket = agg.buckets.map((bk: any) => {
        return {
          id: bk.key,
          name: bk.key,
          qty: bk.doc_count
        };
      });
      return {
        name: agg.name,
        buckets: namedBucket,
        label: words.year
      };
    }
  });
  return readyAggs;
};

export const getNamedAggs = (
  store: any,
  storeFunction: any,
  agg: any,
  aggName: any,
  lang?: any,
  label?: any
) => {
  const storeNames = store[storeFunction]();
  const namedBucket = agg.buckets.map((bk: any) => {
    const cbucket = storeNames.filter((cn: any) => Number(bk.key) === cn.id)[0];
    const name = lang === 'ar' ? cbucket.ar : cbucket.en;
    if (agg.name === 'brandId') {
      return {
        id: Number(bk.key),
        name,
        qty: bk.doc_count
      };
    } else if (agg.name === 'subBrandId') {
      return {
        id: Number(bk.key),
        name,
        qty: bk.doc_count,
        pid: cbucket.pid
      };
    } else if (agg.name === 'eBrandId') {
      return {
        id: Number(bk.key),
        name: cbucket.name,
        qty: bk.doc_count,
        pid: cbucket.pid
      };
    } else {
      return {
        id: Number(bk.key),
        name: cbucket.name,
        qty: bk.doc_count
      };
    }
  });
  return {
    name: aggName,
    buckets: namedBucket,
    label
  };
};
