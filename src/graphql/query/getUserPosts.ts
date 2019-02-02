import gql from "graphql-tag";

export default gql`
  query getUserPosts($userId: String!, $cursor: [Float]) {
    getUserPosts(userId: $userId, cursor: $cursor) {
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
        islive

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
        updatedAt
      }
      error
    }
  }
`;
