import gql from 'graphql-tag';

export default gql`
  query getTimeLine(
    $query: String
    $cursor: [Float]
    $trueLocation: LocationInput
    $distance: Int
    $maxPrice: Int
    $categoryId: Int
    $categoryIds: [Int]
    $kindId: Int
    $isoffer: Boolean
    $price: Int
    $isnew: Boolean
    $issale: Boolean
    $iswarranty: Boolean
    $isforman: Boolean
    $isjobreq: Boolean
    $isservicereq: Boolean
    $areaunit: String
    $realestateId: Int
    $space: Int
    $rooms: Int
    $isfurnishered: Boolean
    $brandId: Int
    $subBrandId: Int
    $year: Int
    $km: Int
    $color: String
    $serviceId: Int
    $country: String
    $city: String
    $sortType: Int
    $eBrandId: Int
    $bathrooms: Int
  ) {
    getTimeLine(
      query: $query
      cursor: $cursor
      trueLocation: $trueLocation
      distance: $distance
      maxPrice: $maxPrice
      categoryId: $categoryId
      categoryIds: $categoryIds
      kindId: $kindId
      isoffer: $isoffer
      price: $price
      isnew: $isnew
      issale: $issale
      iswarranty: $iswarranty
      isforman: $isforman
      isjobreq: $isjobreq
      isservicereq: $isservicereq
      areaunit: $areaunit
      realestateId: $realestateId
      space: $space
      rooms: $rooms
      isfurnishered: $isfurnishered
      brandId: $brandId
      subBrandId: $subBrandId
      year: $year
      km: $km
      color: $color
      serviceId: $serviceId
      country: $country
      city: $city
      sortType: $sortType
      eBrandId: $eBrandId
      bathrooms: $bathrooms
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
        locations {
          name
          location {
            lat
            lon
          }
        }
        location {
          lat
          lon
        }
        islive
        isfront
        isoffer
        start
        end
        status
        updates
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
        innerPosts
      }
      error
    }
  }
`;
