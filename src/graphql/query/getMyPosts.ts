import gql from 'graphql-tag';

export default gql`
  query getMyPosts(
    $islive: Boolean!
    $isoffer: Boolean
    $isfront: Boolean
    $cursor: [Float]
  ) {
    getMyPosts(
      islive: $islive
      isoffer: $isoffer
      isfront: $isfront
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
