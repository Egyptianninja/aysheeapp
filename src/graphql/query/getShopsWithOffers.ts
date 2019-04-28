import gql from 'graphql-tag';

export default gql`
  query getShopsWithOffers {
    getShopsWithOffers {
      _id
      name
      uniquename
      showcontact
      phone
      email
      avatar
      about
      color
      addressCountry
      addressCity
      website
      isstore
      offersqty
      onlineqty
      company
      tel
      fax
      mob
      branches {
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
      offers {
        _id
        title
        phone
        body
        photos
        start
        end
        isrtl
        isoffer
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
        updatedAt
      }
    }
  }
`;
