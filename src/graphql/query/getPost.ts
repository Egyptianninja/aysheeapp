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
        start
        end
        photos
        price
        currency
        phone
        isnew
        issale
        iswarranty
        isforman
        isjobreq
        isservicereq
        areaunit
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
        locations {
          name
          location {
            lat
            lon
          }
        }
        userId
        userName
        userUniquename
        userAvatar
        userAbout
        branch
        status
        groupId
        likes
        commentsQty
        updatedAt
      }
      error
    }
  }
`;
