import gql from 'graphql-tag';

export default gql`
  query getUserPosts(
    $userId: String!
    $isoffer: Boolean
    $isfront: Boolean
    $islive: Boolean
    $cursor: [Float]
  ) {
    getUserPosts(
      userId: $userId
      isoffer: $isoffer
      isfront: $isfront
      islive: $islive
      cursor: $cursor
    ) {
      ok
      took
      total
      cursor
      aggs {
        name
        buckets {
          key
          doc_count
        }
      }
      posts {
        id
        title
        body
        photos
        price
        currency
        isrtl
        start
        end
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
        islive
        isoffer
        isfront

        categoryId
        category
        categoryGlob
        realestateId
        realestate
        realestateGlob
        brandId
        brand
        brandGlob
        subBrandId
        subBrand
        subBrandGlob
        serviceId
        service
        serviceGlob
        kindId
        kind
        kindGlob
        eBrandId
        eBrand
        eBrandGlob

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
        year
        km
        color
        sort
        updates
        userName
        userAvatar
        userAbout
        branch
        status
        groupId
        updatedAt
      }
      error
    }
  }
`;
