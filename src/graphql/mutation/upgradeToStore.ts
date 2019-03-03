import gql from 'graphql-tag';

export default gql`
  mutation upgradeToStore {
    upgradeToStore {
      ok
      message
      data {
        _id
        uniquename
        phone
        email
        name
        about
        isstore
        offersLimit
        onlineLimit
        offlineLimit
        avatar
        headerPhoto
        color
        lang
        country
        city
        website
        verified
      }
      error
    }
  }
`;
