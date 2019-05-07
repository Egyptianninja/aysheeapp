import { Dimensions } from 'react-native';
import secrets from '../../constants/secrets';
import * as getStore from '../../store/getStore';
import { since } from '../since';
const { width } = Dimensions.get('window');

export const getNextPosts = (
  data: any,
  fetchMore: any,
  query: any,
  rest?: any
) => {
  return fetchMore({
    variables: { cursor: data[query].cursor, ...rest },

    updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
      const prevuseCursor = previousResult[query].posts.slice(-1).sort;
      if (
        !fetchMoreResult ||
        fetchMoreResult[query].posts.length === 0 ||
        fetchMoreResult[query].cursor === prevuseCursor
      ) {
        return previousResult;
      }
      const previousPosts = previousResult[query].posts;
      const newPosts = fetchMoreResult[query].posts;
      const cursor = fetchMoreResult[query].cursor;
      return {
        [query]: {
          ...previousResult[query],
          cursor,
          posts: [...previousPosts, ...newPosts]
        }
      };
    }
  });
};

export const getDBNextPosts = (fetchMore: any, query: any, cursor: any) => {
  return fetchMore({
    variables: { cursor },

    updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult || fetchMoreResult[query].data.length === 0) {
        return previousResult;
      }
      const previousPosts = previousResult[query].data;
      const newPosts = fetchMoreResult[query].data;
      return {
        [query]: {
          ...previousResult[query],
          data: [...previousPosts, ...newPosts]
        }
      };
    }
  });
};

export const getNewPosts = (
  data: any,
  fetchMore: any,
  query: any,
  rest?: any
) => {
  const isposts = data[query].posts.length;
  const cursorString = isposts > 0 ? data[query].posts[0].sort : undefined;
  let cursor;
  if (cursorString) {
    cursor = cursorString.map(Number);
  }
  return fetchMore({
    variables: {
      cursor,
      ...rest
    },
    updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult || fetchMoreResult[query].posts.length === 0) {
        return previousResult;
      }
      const previousPosts = previousResult[query].posts;
      const newPosts = fetchMoreResult[query].posts;
      return {
        [query]: {
          ...previousResult[query],
          posts: [...newPosts, ...previousPosts]
        }
      };
    }
  });
};

export const average = (arr: any) =>
  arr.reduce((p: any, c: any) => p + c, 0) / arr.length;

export const allEqual = (arr: any) => arr.every((v: any) => v === arr[0]);

const getFinalRatio = (photos: any) => {
  if (photos.length > 0) {
    const ratios = photos.map((photo: any) => Number(photo.substring(21, 26)));
    const eq = allEqual(ratios);
    if (eq) {
      if (ratios[0] > 1 && ratios[0] < 2.5) {
        return ratios[0];
      } else if (ratios[0] > 2.5) {
        return 3;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  } else {
    return undefined;
  }
};

const prepareImagesURIs = (photos: any, imageSize: any) => {
  return photos.map((photo: any) => {
    return {
      url: `http://res.cloudinary.com/${
        secrets.upload.CLOUD_NAME
      }/image/upload/w_${imageSize}/${photo.substring(0, 20)}`
    };
  });
};

export const readyPosts = (
  posts: any,
  imageSize: number,
  textHeight: number,
  lang: any
) => {
  return posts.map((post: any) => {
    const ratio =
      post.photos.length > 0 ? Number(post.photos[0].substring(21, 26)) : 0;
    const uri =
      post.photos.length > 0
        ? `http://res.cloudinary.com/${
            secrets.upload.CLOUD_NAME
          }/image/upload/w_${imageSize}/${post.photos[0].substring(0, 20)}`
        : undefined;
    const uris =
      post.photos.length > 0
        ? prepareImagesURIs(post.photos, imageSize)
        : undefined;

    const time = since(post.updatedAt, lang);

    const subTitle = post.title.substring(0, 25);
    const subBody = post.body.substring(0, 80);
    const imageWidth = Math.ceil(width / 2 - 17);
    const imageHeight =
      post.photos.length > 0 ? Math.ceil(imageWidth * ratio) : imageWidth * 0.5;
    const height = Math.ceil(imageHeight) + textHeight;
    const branch = post.branch ? post.branch.substr(27) : null;
    const {
      brand,
      subBrand,
      eBrand,
      kind,
      realestate,
      service
    } = getPostLangValues(post, lang);
    return {
      ...post,
      height,
      ratio: ratio > 3 ? 3 : ratio,
      subTitle,
      subBody,
      time,
      uri,
      uris,
      imageWidth,
      imageHeight,
      brand,
      subBrand,
      eBrand,
      kind,
      realestate,
      service,
      branch
    };
  });
};
export const readyPost = (post: any, languageName: any) => {
  const ratio =
    post.photos.length > 0 ? Number(post.photos[0].substring(21, 26)) : 0;
  const time = since(post.updatedAt, languageName);
  return {
    ...post,
    ratio: ratio > 3 ? 3 : ratio,
    time,
    id: post._id
  };
};

export const readyUserPosts = (
  posts: any,
  imageSize: number,
  textHeight: number,
  lang: any
) => {
  return posts.map((post: any) => {
    const ratio =
      post.photos.length > 0 ? Number(post.photos[0].substring(21, 26)) : 0;
    const finalRatio = getFinalRatio(post.photos);

    const uri =
      post.photos.length > 0
        ? `http://res.cloudinary.com/${
            secrets.upload.CLOUD_NAME
          }/image/upload/w_${imageSize}/${post.photos[0].substring(0, 20)}`
        : undefined;
    const time = since(post.updatedAt, lang);

    const subTitle = post.title.substring(0, 17);
    const imageWidth = Math.ceil(width / 2 - 17);
    const imageHeight = imageWidth * 1.333;
    const height = Math.ceil(imageHeight) + textHeight;
    const {
      brand,
      subBrand,
      eBrand,
      kind,
      realestate,
      service
    } = getPostLangValues(post, lang);
    return {
      ...post,
      height,
      ratio: ratio > 3 ? 3 : ratio,
      subTitle,
      time,
      uri,
      imageWidth,
      imageHeight,
      finalRatio,
      brand,
      subBrand,
      eBrand,
      kind,
      realestate,
      service
    };
  });
};
export const readyOfferPosts = (
  posts: any,
  imageSize: number,
  textHeight: number,
  lang: any
) => {
  return posts.map((post: any) => {
    const ratio =
      post.photos.length > 0 ? Number(post.photos[0].substring(21, 26)) : 0;
    const finalRatio = getFinalRatio(post.photos);

    const uri =
      post.photos.length > 0
        ? `http://res.cloudinary.com/${
            secrets.upload.CLOUD_NAME
          }/image/upload/w_${imageSize}/${post.photos[0].substring(0, 20)}`
        : undefined;
    const time = since(post.updatedAt, lang);

    const subTitle = post.title.substring(0, 17);
    const imageWidth = Math.ceil(width - 10);
    const imageHeight = imageWidth * 1.333;
    const height = Math.ceil(imageHeight) + textHeight;
    const {
      brand,
      subBrand,
      eBrand,
      kind,
      realestate,
      service
    } = getPostLangValues(post, lang);
    return {
      ...post,
      height,
      ratio: ratio > 3 ? 3 : ratio,
      subTitle,
      time,
      uri,
      imageWidth,
      imageHeight,
      finalRatio,
      brand,
      subBrand,
      eBrand,
      kind,
      realestate,
      service
    };
  });
};

const getPostLangValues = (post: any, lang: any) => {
  const brands = getStore.brands();
  const brand = post.brandId
    ? brands.filter((brd: any) => brd.id === post.brandId)[0][lang]
    : null;

  const subBrands = getStore.subBrands();
  const subBrand = post.subBrandId
    ? subBrands.filter((brd: any) => brd.id === post.subBrandId)[0][lang]
    : null;

  const eBrands = getStore.electroBrands();
  const eBrand = post.eBrandId
    ? eBrands.filter((brd: any) => brd.id === post.eBrandId)[0].name
    : null;

  const kinds = getStore.kind();
  const kind = post.kindId
    ? kinds.filter((brd: any) => brd.id === post.kindId)[0].name
    : null;

  const realestates = getStore.realestate();
  const realestate = post.realestateId
    ? realestates.filter((brd: any) => brd.id === post.realestateId)[0].name
    : null;

  const services = getStore.service();
  const service = post.serviceId
    ? services.filter((brd: any) => brd.id === post.serviceId)[0].name
    : null;

  return {
    brand,
    subBrand,
    eBrand,
    kind,
    realestate,
    service
  };
};
