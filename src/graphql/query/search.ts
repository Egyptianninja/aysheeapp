import gql from 'graphql-tag';

export default gql`
  query search(
    $query: String!
    $cursor: [Float]
    $categoryId: Int
    $trueLocation: LocationInput
    $distance: Int
    $sortType: Int
  ) {
    search(
      query: $query
      cursor: $cursor
      trueLocation: $trueLocation
      distance: $distance
      categoryId: $categoryId
      sortType: $sortType
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
        year
        km
        color
        sort
        trueLocation {
          lat
          lon
        }
        islive
        isfront
        updates
        userId
        updatedAt
      }
      error
    }
  }
`;
