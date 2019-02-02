import gql from "graphql-tag";

export default gql`
  query search(
    $query: String
    $categoryId: Int
    $cursor: [Float]
    $trueLocation: LocationInput
    $distance: Int
    $kindId: Int
    $isoffer: Boolean
    $price: Int
    $isnew: Boolean
    $issale: Boolean
    $isrent: Boolean
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
    $priceSort: String
  ) {
    search(
      query: $query
      categoryId: $categoryId
      cursor: $cursor
      trueLocation: $trueLocation
      distance: $distance
      kindId: $kindId
      isoffer: $isoffer
      price: $price
      isnew: $isnew
      issale: $issale
      isrent: $isrent
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
      priceSort: $priceSort
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
        isrtl
        phone
        isnew
        issale
        isrent
        iswarranty
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
        year
        km
        sort
        updatedAt
      }
      error
    }
  }
`;
