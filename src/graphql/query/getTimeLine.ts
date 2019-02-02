import gql from "graphql-tag";

export default gql`
  query getTimeLine(
    $query: String
    $cursor: [Float]
    $trueLocation: LocationInput
    $distance: Int
    $categoryId: Int
    $kindId: Int
    $isoffer: Boolean
    $price: Int
    $isnew: Boolean
    $issale: Boolean
    $iswarranty: Boolean
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
      categoryId: $categoryId
      kindId: $kindId
      isoffer: $isoffer
      price: $price
      isnew: $isnew
      issale: $issale
      iswarranty: $iswarranty
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
        userId
        updatedAt
      }
      error
    }
  }
`;
