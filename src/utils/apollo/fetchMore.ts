import { Dimensions } from 'react-native';
import { since } from '../since';
import secrets from '../../constants/secrets';
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

export const readyPosts = (
  posts: any,
  imageSize: number,
  textHeight: number,
  languageName: any
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
    const time = since(post.updatedAt, languageName);

    const subTitle = post.title.substring(0, 17);
    const imageWidth = Math.ceil(width / 2 - 17);
    const imageHeight =
      post.photos.length > 0 ? Math.ceil(imageWidth * ratio) : imageWidth * 0.5;
    const height = Math.ceil(imageHeight) + textHeight;
    return {
      ...post,
      height,
      ratio: ratio > 3 ? 3 : ratio,
      subTitle,
      time,
      uri,
      imageWidth,
      imageHeight
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
    time
  };
};

export const readyUserPosts = (
  posts: any,
  imageSize: number,
  textHeight: number,
  languageName: any
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
    const time = since(post.updatedAt, languageName);

    const subTitle = post.title.substring(0, 17);
    const imageWidth = Math.ceil(width / 2 - 17);
    const imageHeight = imageWidth * 1.3;
    const height = Math.ceil(imageHeight) + textHeight;
    return {
      ...post,
      height,
      ratio: ratio > 3 ? 3 : ratio,
      subTitle,
      time,
      uri,
      imageWidth,
      imageHeight,
      finalRatio
    };
  });
};
