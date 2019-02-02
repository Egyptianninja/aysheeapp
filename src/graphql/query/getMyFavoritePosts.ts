import gql from "graphql-tag";

export default gql`
  query getMyFavoritePosts($cursor: Int!) {
    getMyFavoritePosts(cursor: $cursor) {
      ok
      data {
        _id
        title
        body
        isrtl
        photos
        price
        currency
        phone
        isnew
        issale
        iswarranty
        space
        rooms
        bathrooms
        isfurnishered
        year
        km
        color
        jobTitle
        jobIndustry
        isfullTime
        education
        experience
        salary
        trueLocation {
          lat
          lon
        }
        updatedAt
      }
      error
    }
  }
`;
