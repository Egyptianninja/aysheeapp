import gql from 'graphql-tag';

export default gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
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
        userId
        updatedAt
      }
      error
    }
  }
`;
